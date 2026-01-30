import { AudioPlayer, createAudioPlayer } from 'expo-audio'
import { useCallback, useEffect, useRef, useState } from 'react'
import { setupAutoCleanup } from '@/utils/audioPlayerUtils'

const METRONOME_SOUND = require('../../assets/sounds/metronome_beat.mp3')
const AUDIO_VOLUME_METRONOME = 0.4
const SCHEDULE_INTERVAL_MS = 5

interface UseMetronomeReturn {
  start: () => void
  stop: () => void
  isPlaying: boolean
}

/**
 * Hook for metronome functionality.
 * Provides precise metronome playback at specified BPM.
 *
 * @param bpm - Beats per minute for the metronome
 * @returns Object with start, stop functions and isPlaying state
 */
export const useMetronome = (bpm: number = 90): UseMetronomeReturn => {
  const [isPlaying, setIsPlaying] = useState(false)
  const metronomePlayerRef = useRef<AudioPlayer | null>(null)
  const schedulerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const nextBeatTimeRef = useRef<number>(0)

  const beatInterval = (60 / bpm) * 1000 // Convert BPM to milliseconds

  const stop = useCallback(() => {
    if (schedulerIntervalRef.current) {
      clearInterval(schedulerIntervalRef.current)
      schedulerIntervalRef.current = null
    }

    if (metronomePlayerRef.current) {
      metronomePlayerRef.current.remove()
      metronomePlayerRef.current = null
    }

    setIsPlaying(false)
  }, [])

  const start = useCallback(() => {
    if (isPlaying) {
      stop()
    }

    // Create metronome player
    const player = createAudioPlayer(METRONOME_SOUND)
    player.volume = AUDIO_VOLUME_METRONOME
    metronomePlayerRef.current = player
    setupAutoCleanup(player)

    // Set up timing
    startTimeRef.current = Date.now()
    nextBeatTimeRef.current = startTimeRef.current

    setIsPlaying(true)

    // Play first beat immediately
    void player.play()
    nextBeatTimeRef.current += beatInterval

    // Scheduler loop
    schedulerIntervalRef.current = setInterval(() => {
      const now = Date.now()

      if (now >= nextBeatTimeRef.current) {
        // Play beat
        const beatPlayer = createAudioPlayer(METRONOME_SOUND)
        beatPlayer.volume = AUDIO_VOLUME_METRONOME
        setupAutoCleanup(beatPlayer)
        void beatPlayer.play()

        // Schedule next beat
        nextBeatTimeRef.current += beatInterval
      }
    }, SCHEDULE_INTERVAL_MS)
  }, [isPlaying, beatInterval, stop])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  return { start, stop, isPlaying }
}
