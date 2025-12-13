import { setupAutoCleanup } from '@/utils/audioPlayerUtils'
import { createAudioPlayer } from 'expo-audio'
import { useCallback, useEffect, useRef } from 'react'

// Metronome constants
const SCHEDULE_INTERVAL_MS = 25 // Check every 25ms for precision
const SCHEDULE_AHEAD_SEC = 0.1 // Schedule 100ms ahead to account for timer jitter

interface UseMetronomeOptions {
  enabled?: boolean
  volume?: number
  bpm?: number
}

interface UseMetronomeReturn {
  start: () => void
  stop: () => void
  isRunning: boolean
}

export const useMetronome = (options: UseMetronomeOptions = {}): UseMetronomeReturn => {
  const { enabled = true, volume = 0.4, bpm = 120 } = options
  
  // Metronome scheduling state
  const metronomeSchedulerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const metronomeStartTimeRef = useRef<number | null>(null)
  const nextBeatTimeRef = useRef<number>(0)
  const beatNumberRef = useRef<number>(0)
  const scheduledBeatsRef = useRef<Set<number>>(new Set())
  const metronomeBufferRef = useRef<ReturnType<typeof require> | null>(null)
  const isRunningRef = useRef<boolean>(false)
  
  // Pre-load metronome sound at module level for bundler resolution
  const METRONOME_SOUND = require('../../assets/sounds/metronome_beat.mp3')
  
  // Calculate beat interval based on BPM
  const beatIntervalSec = 60 / bpm

  // Initialize metronome sound buffer
  useEffect(() => {
    try {
      metronomeBufferRef.current = METRONOME_SOUND
    } catch (error) {
      console.warn('Could not load metronome sound:', error)
    }
  }, [METRONOME_SOUND])

  const playMetronomeBeatAtTime = useCallback(async (scheduledTime: number) => {
    if (!metronomeBufferRef.current) return
    
    try {
      const player = createAudioPlayer(metronomeBufferRef.current)
      player.volume = volume
      
      // Calculate delay from now to scheduled time
      const now = Date.now()
      const delay = Math.max(0, scheduledTime - now)
      
      if (delay === 0) {
        // Play immediately if time has passed
        await player.play()
      } else {
        // Schedule for the future
        setTimeout(async () => {
          await player.play()
        }, delay)
      }
      
      // Clean up the player after it finishes playing
      setupAutoCleanup(player)
    } catch (error) {
      console.warn('Could not play metronome beat:', error)
    }
  }, [volume])

  const metronomeScheduler = useCallback(() => {
    if (!metronomeStartTimeRef.current || !isRunningRef.current) return
    
    const now = Date.now()
    const currentTime = (now - metronomeStartTimeRef.current) / 1000 // Time in seconds since start
    const scheduleUntil = currentTime + SCHEDULE_AHEAD_SEC
    
    // Schedule all beats that need to happen between now and the look-ahead time
    while (nextBeatTimeRef.current < scheduleUntil) {
      const beatTime = nextBeatTimeRef.current
      const beatTimeMs = metronomeStartTimeRef.current + beatTime * 1000
      
      // Only schedule if we haven't already scheduled this beat
      if (!scheduledBeatsRef.current.has(beatNumberRef.current)) {
        scheduledBeatsRef.current.add(beatNumberRef.current)
        void playMetronomeBeatAtTime(beatTimeMs)
      }
      
      // Advance to next beat
      nextBeatTimeRef.current += beatIntervalSec
      beatNumberRef.current++
    }
  }, [playMetronomeBeatAtTime, beatIntervalSec])

  const start = useCallback(() => {
    if (metronomeSchedulerRef.current) return // Already running
    
    // Reset metronome state
    metronomeStartTimeRef.current = Date.now()
    nextBeatTimeRef.current = 0
    beatNumberRef.current = 0
    scheduledBeatsRef.current.clear()
    isRunningRef.current = true
    
    // Start scheduler that runs every 25ms
    metronomeSchedulerRef.current = setInterval(metronomeScheduler, SCHEDULE_INTERVAL_MS)
    
    // Run scheduler immediately to schedule first beat
    metronomeScheduler()
  }, [metronomeScheduler])

  const stop = useCallback(() => {
    if (metronomeSchedulerRef.current) {
      clearInterval(metronomeSchedulerRef.current)
      metronomeSchedulerRef.current = null
    }
    isRunningRef.current = false
    metronomeStartTimeRef.current = null
    nextBeatTimeRef.current = 0
    beatNumberRef.current = 0
    scheduledBeatsRef.current.clear()
  }, [])

  // Auto-start/stop based on enabled prop (only if explicitly enabled)
  useEffect(() => {
    if (enabled && metronomeSchedulerRef.current === null) {
      start()
    } else if (!enabled) {
      stop()
    }
    
    return () => {
      stop()
    }
  }, [enabled, start, stop])

  return {
    start,
    stop,
    isRunning: isRunningRef.current
  }
}
