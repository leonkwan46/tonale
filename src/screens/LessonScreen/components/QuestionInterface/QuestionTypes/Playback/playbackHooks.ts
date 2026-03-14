import { addSafePlaybackListener, setupAutoCleanup } from '@/utils/audioPlayerUtils'
import { useMetronome } from '@/hooks'
import { createAudioPlayer, type AudioPlayer } from 'expo-audio'
import { useCallback, useEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// Constants (used only within Playback)
// ---------------------------------------------------------------------------

export const DEFAULT_TEMPO = 120
const AUDIO_VOLUME_PLAYBACK = 0.8
const AUDIO_VOLUME_METRONOME = 0.4
const RHYTHM_FINAL_TIMEOUT_BUFFER = 0.5 // seconds
const CLAP_SOUND = require('../../../../../../../assets/sounds/clap.mp3')

// ---------------------------------------------------------------------------
// Utils
// ---------------------------------------------------------------------------

export const convertDurationsToTimestamps = (durations: number[]): number[] => {
  const timestamps: number[] = [0]
  let cumulativeTime = 0
  for (let i = 0; i < durations.length - 1; i++) {
    cumulativeTime += durations[i]
    timestamps.push(cumulativeTime)
  }
  return timestamps
}

// ---------------------------------------------------------------------------
// useAudioFilePlayback
// ---------------------------------------------------------------------------

interface UseAudioFilePlaybackReturn {
  isPlaying: boolean
  play: (audioFile: string | number, onStart?: () => void, onFinish?: () => void) => Promise<void>
  stop: () => void
}

export const useAudioFilePlayback = (): UseAudioFilePlaybackReturn => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioFilePlayerRef = useRef<ReturnType<typeof createAudioPlayer> | null>(null)

  const stop = useCallback(() => {
    if (audioFilePlayerRef.current) {
      audioFilePlayerRef.current.pause()
      audioFilePlayerRef.current = null
    }
    setIsPlaying(false)
  }, [])

  const play = useCallback(async (
    audioFile: string | number,
    onStart?: () => void,
    onFinish?: () => void
  ) => {
    try {
      stop()
      const player = createAudioPlayer(audioFile)
      audioFilePlayerRef.current = player
      player.volume = AUDIO_VOLUME_PLAYBACK
      await player.play()
      setIsPlaying(true)
      onStart?.()
      addSafePlaybackListener(player, (status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false)
          audioFilePlayerRef.current = null
          onFinish?.()
        }
      })
      setupAutoCleanup(player)
    } catch (error) {
      console.warn('Could not play audio file:', error)
      setIsPlaying(false)
      audioFilePlayerRef.current = null
    }
  }, [stop])

  useEffect(() => {
    return () => {
      if (audioFilePlayerRef.current) {
        audioFilePlayerRef.current.pause()
        audioFilePlayerRef.current = null
      }
      setIsPlaying(false)
    }
  }, [])

  return { isPlaying, play, stop }
}

// ---------------------------------------------------------------------------
// useRhythmClaps
// ---------------------------------------------------------------------------

const SCHEDULE_INTERVAL_MS = 5
const SCHEDULE_AHEAD_MS = 50

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

export const useRhythmClaps = ({
  tempo = DEFAULT_TEMPO,
  enableMetronome = false,
  onClapPlayingChange,
  onPlaybackStart,
  onPlaybackFinish
}: UseRhythmClapsOptions = {}): UseRhythmClapsReturn => {
  const [isPlaying, setIsPlaying] = useState(false)
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

  const preloadClapPlayers = useCallback(async (count: number): Promise<AudioPlayer[]> => {
    const players: AudioPlayer[] = []
    for (let i = 0; i < count; i++) {
      try {
        const player = createAudioPlayer(CLAP_SOUND)
        player.volume = AUDIO_VOLUME_PLAYBACK
        let attempts = 0
        const maxAttempts = 100
        while (!player.isLoaded && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 10))
          attempts++
        }
        if (player.isLoaded) players.push(player)
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
        await player.play()
      } else {
        setTimeout(async () => {
          if (isPlayingRef.current && player.isLoaded) await player.play()
        }, delay)
      }
      setupAutoCleanup(player)
    } catch (error) {
      console.warn('Could not play clap sound:', error)
    }
  }, [])

  const scheduler = useCallback(() => {
    if (!startTimeRef.current || !isPlayingRef.current) return
    const now = Date.now()
    const elapsed = (now - startTimeRef.current) / 1000
    const scheduleUntil = elapsed + (SCHEDULE_AHEAD_MS / 1000)
    const timestamps = clapTimestampsRef.current
    const players = clapPlayersRef.current
    timestamps.forEach((timestamp, index) => {
      if (timestamp <= scheduleUntil && !scheduledClapsRef.current.has(index)) {
        const scheduledTimeMs = startTimeRef.current! + timestamp * 1000
        scheduledClapsRef.current.add(index)
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
    clapPlayersRef.current.forEach(player => {
      try {
        if (player.playing) player.pause()
      } catch {
        // ignore
      }
    })
    clapPlayersRef.current = []
    scheduledClapsRef.current.clear()
    startTimeRef.current = null
    clapTimestampsRef.current = []
    if (enableMetronome) stopMetronome()
  }, [onClapPlayingChange, stopMetronome, enableMetronome])

  const playRhythmClaps = useCallback(async (timestamps: number[], notifyStart = false) => {
    stop()
    if (timestamps.length === 0) return
    setIsPlaying(true)
    isPlayingRef.current = true
    onClapPlayingChange?.(true)
    if (notifyStart) onPlaybackStart?.()
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
    const sharedStartTime = Date.now()
    startTimeRef.current = sharedStartTime
    if (enableMetronome) startMetronome(sharedStartTime)
    schedulerRef.current = setInterval(scheduler, SCHEDULE_INTERVAL_MS)
    scheduler()
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

  useEffect(() => () => { stop() }, [stop])

  return { isPlaying, playRhythmClaps, stop }
}

// ---------------------------------------------------------------------------
// usePlaybackRipples
// ---------------------------------------------------------------------------

interface UsePlaybackRipplesOptions {
  isPlaying: boolean
  rhythm?: number[]
}

interface UsePlaybackRipplesReturn {
  ripples: number[]
  removeRipple: (id: number) => void
}

export const usePlaybackRipples = ({
  isPlaying,
  rhythm
}: UsePlaybackRipplesOptions): UsePlaybackRipplesReturn => {
  const [ripples, setRipples] = useState<number[]>([])
  const rippleIdRef = useRef(0)
  const timeoutRefsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  const removeRipple = useCallback((id: number) => {
    setRipples(prev => prev.filter(rippleId => rippleId !== id))
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      setRipples([])
      timeoutRefsRef.current.forEach(t => clearTimeout(t))
      timeoutRefsRef.current.clear()
      return
    }
    if (rhythm && rhythm.length > 0) {
      const timestamps = convertDurationsToTimestamps(rhythm)
      timestamps.forEach(timestamp => {
        const timeout = setTimeout(() => {
          setRipples(prev => [...prev, rippleIdRef.current++])
          timeoutRefsRef.current.delete(timeout)
        }, timestamp * 1000)
        timeoutRefsRef.current.add(timeout)
      })
      const timeouts = timeoutRefsRef.current
      return () => {
        timeouts.forEach(t => clearTimeout(t))
        timeouts.clear()
      }
    }
    // No rhythm (e.g. audio file): show ripples on a fixed interval so user sees "playing" feedback
    const intervalMs = 800
    const intervalId = setInterval(() => {
      setRipples(prev => [...prev, rippleIdRef.current++])
    }, intervalMs)
    return () => {
      clearInterval(intervalId)
    }
  }, [isPlaying, rhythm])

  return { ripples, removeRipple }
}
