import { useMetronome } from '@/hooks'
import { setupAutoCleanup } from '@/utils/audioPlayerUtils'
import { createAudioPlayer, type AudioPlayer } from 'expo-audio'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AUDIO_VOLUME_METRONOME, AUDIO_VOLUME_PLAYBACK, CLAP_SOUND, DEFAULT_TEMPO, RHYTHM_FINAL_TIMEOUT_BUFFER } from '../constants'

interface UseRhythmClapsOptions {
  tempo?: number
  enableMetronome?: boolean
  onClapPlayingChange?: (isPlaying: boolean) => void
  onPlaybackStart?: () => void
  onPlaybackFinish?: () => void
}

interface UseRhythmClapsReturn {
  isPlaying: boolean
  playRhythmClaps: (timestamps: number[], notifyStart?: boolean) => void
  stop: () => void
}

// Scheduler constants for precise timing
const SCHEDULE_INTERVAL_MS = 5 // Check every 5ms for precision
const SCHEDULE_AHEAD_MS = 50 // Schedule 50ms ahead to account for timer jitter

export const useRhythmClaps = ({
  tempo = DEFAULT_TEMPO,
  enableMetronome = false,
  onClapPlayingChange,
  onPlaybackStart,
  onPlaybackFinish
}: UseRhythmClapsOptions = {}): UseRhythmClapsReturn => {
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Scheduler state
  const schedulerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const scheduledClapsRef = useRef<Set<number>>(new Set())
  const clapPlayersRef = useRef<AudioPlayer[]>([])
  const clapTimestampsRef = useRef<number[]>([])
  const isPlayingRef = useRef<boolean>(false)
  const finalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { start: startMetronome, stop: stopMetronome } = useMetronome({
    enabled: false,
    volume: AUDIO_VOLUME_METRONOME,
    bpm: tempo
  })

  // Preload clap sound - create multiple players for concurrent playback
  const preloadClapPlayers = useCallback(async (count: number): Promise<AudioPlayer[]> => {
    const players: AudioPlayer[] = []
    
    for (let i = 0; i < count; i++) {
      try {
        const player = createAudioPlayer(CLAP_SOUND)
        player.volume = AUDIO_VOLUME_PLAYBACK
        
        // Wait for player to be ready
        let attempts = 0
        const maxAttempts = 100 // 1 second max wait
        while (!player.isLoaded && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 10))
          attempts++
        }
        
        if (player.isLoaded) {
          players.push(player)
        }
      } catch (error) {
        console.warn('Could not preload clap sound:', error)
      }
    }
    
    return players
  }, [])

  const playClapAtTime = useCallback(async (playerIndex: number, scheduledTimeMs: number) => {
    const players = clapPlayersRef.current
    if (playerIndex >= players.length || !players[playerIndex]) return
    
    const player = players[playerIndex]
    if (!player.isLoaded) return
    
    const now = Date.now()
    const delay = Math.max(0, scheduledTimeMs - now)
    
    try {
      if (delay === 0) {
        // Play immediately if time has passed
        await player.play()
      } else {
        // Schedule for the future
        setTimeout(async () => {
          if (isPlayingRef.current && player.isLoaded) {
            await player.play()
          }
        }, delay)
      }
      
      // Clean up after playback
      setupAutoCleanup(player)
    } catch (error) {
      console.warn('Could not play clap sound:', error)
    }
  }, [])

  const scheduler = useCallback(() => {
    if (!startTimeRef.current || !isPlayingRef.current) return
    
    const now = Date.now()
    const elapsed = (now - startTimeRef.current) / 1000 // Time in seconds since start
    const scheduleUntil = elapsed + (SCHEDULE_AHEAD_MS / 1000)
    
    const timestamps = clapTimestampsRef.current
    const players = clapPlayersRef.current
    
    // Schedule all claps that need to happen between now and look-ahead time
    timestamps.forEach((timestamp, index) => {
      if (timestamp <= scheduleUntil && !scheduledClapsRef.current.has(index)) {
        const scheduledTimeMs = startTimeRef.current! + timestamp * 1000
        scheduledClapsRef.current.add(index)
        
        // Reuse players in round-robin fashion if we have more claps than players
        const playerIndex = index % players.length
        void playClapAtTime(playerIndex, scheduledTimeMs)
      }
    })
  }, [playClapAtTime])

  const stop = useCallback(() => {
    if (schedulerRef.current) {
      clearInterval(schedulerRef.current)
      schedulerRef.current = null
    }
    
    if (finalTimeoutRef.current) {
      clearTimeout(finalTimeoutRef.current)
      finalTimeoutRef.current = null
    }
    
    isPlayingRef.current = false
    setIsPlaying(false)
    onClapPlayingChange?.(false)
    
    // Clean up players
    clapPlayersRef.current.forEach(player => {
      try {
        if (player.playing) {
          player.pause()
        }
      } catch {
        // Ignore cleanup errors
      }
    })
    clapPlayersRef.current = []
    
    scheduledClapsRef.current.clear()
    startTimeRef.current = null
    clapTimestampsRef.current = []
    
    if (enableMetronome) {
      stopMetronome()
    }
  }, [onClapPlayingChange, stopMetronome, enableMetronome])

  const playRhythmClaps = useCallback(async (timestamps: number[], notifyStart = false) => {
    // Stop any existing playback
    stop()
    
    if (timestamps.length === 0) return
    
    setIsPlaying(true)
    isPlayingRef.current = true
    onClapPlayingChange?.(true)
    
    if (notifyStart) {
      onPlaybackStart?.()
    }

    // Preload clap players (preload at least as many as we have claps, minimum 5 for reuse)
    const playerCount = Math.max(timestamps.length, 5)
    const players = await preloadClapPlayers(playerCount)
    
    if (players.length === 0) {
      console.warn('Could not preload any clap sounds')
      stop()
      return
    }
    
    clapPlayersRef.current = players
    clapTimestampsRef.current = timestamps
    scheduledClapsRef.current.clear()
    
    // Set shared start time for synchronization with metronome
    const sharedStartTime = Date.now()
    startTimeRef.current = sharedStartTime
    
    if (enableMetronome) {
      startMetronome(sharedStartTime)
    }
    
    // Start scheduler
    schedulerRef.current = setInterval(scheduler, SCHEDULE_INTERVAL_MS)
    
    // Run scheduler immediately to start scheduling
    scheduler()
    
    // Set final timeout as backup
    const lastTimestamp = timestamps[timestamps.length - 1] || 0
    finalTimeoutRef.current = setTimeout(() => {
      if (isPlayingRef.current) {
        stop()
        onPlaybackFinish?.()
      }
    }, (lastTimestamp + RHYTHM_FINAL_TIMEOUT_BUFFER) * 1000)
  }, [
    stop,
    preloadClapPlayers,
    enableMetronome,
    startMetronome,
    scheduler,
    onClapPlayingChange,
    onPlaybackStart,
    onPlaybackFinish
  ])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  return {
    isPlaying,
    playRhythmClaps,
    stop
  }
}
