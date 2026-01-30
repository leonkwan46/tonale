import { AudioPlayer, createAudioPlayer } from 'expo-audio'
import { useEffect, useRef, useState } from 'react'
import { setupAutoCleanup } from '@/utils/audioPlayerUtils'
import { AUDIO_VOLUME_PLAYBACK, CLAP_SOUND } from '../constants'

const SCHEDULE_INTERVAL_MS = 5 // Check every 5ms for precise timing
const SCHEDULE_AHEAD_MS = 50 // Schedule claps 50ms ahead to compensate for timer jitter

interface UseRhythmClapsProps {
  tempo?: number
  enableMetronome?: boolean
  onClapPlayingChange?: (isPlaying: boolean) => void
  onPlaybackStart?: () => void
  onPlaybackFinish?: () => void
}

interface UseRhythmClapsReturn {
  isPlaying: boolean
  playRhythmClaps: (timestamps: number[], notifyStart?: boolean) => Promise<void>
  stop: () => void
}

/**
 * Hook for playing rhythm patterns using synthesized clap sounds.
 * Uses precise scheduling to ensure accurate timing.
 *
 * Key features:
 * - Preloads multiple clap players for concurrent playback
 * - 5ms scheduler interval for precise timing
 * - 50ms look-ahead scheduling to compensate for timer jitter
 * - Round-robin player reuse for long patterns
 *
 * @param props - Configuration options
 * @returns Object with playRhythmClaps, stop functions and isPlaying state
 */
export const useRhythmClaps = ({
  tempo = 90,
  enableMetronome = false,
  onClapPlayingChange,
  onPlaybackStart,
  onPlaybackFinish
}: UseRhythmClapsProps): UseRhythmClapsReturn => {
  const [isPlaying, setIsPlaying] = useState(false)
  const clapPlayersRef = useRef<AudioPlayer[]>([])
  const schedulerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  // Preload clap players for concurrent playback
  useEffect(() => {
    const preloadPlayers = async () => {
      const players: AudioPlayer[] = []
      for (let i = 0; i < 5; i++) {
        const player = createAudioPlayer(CLAP_SOUND)
        player.volume = AUDIO_VOLUME_PLAYBACK
        setupAutoCleanup(player)
        players.push(player)
      }
      clapPlayersRef.current = players
    }

    void preloadPlayers()

    return () => {
      clapPlayersRef.current.forEach(player => player.remove())
    }
  }, [])

  const stop = () => {
    if (schedulerIntervalRef.current) {
      clearInterval(schedulerIntervalRef.current)
      schedulerIntervalRef.current = null
    }

    setIsPlaying(false)
    onClapPlayingChange?.(false)
  }

  const playRhythmClaps = async (
    timestamps: number[],
    notifyStart: boolean = true
  ) => {
    if (timestamps.length === 0) return

    setIsPlaying(true)
    onClapPlayingChange?.(true)

    // Set shared start time
    startTimeRef.current = Date.now()

    if (notifyStart) {
      onPlaybackStart?.()
    }

    let currentIndex = 0
    const timestampsMs = timestamps.map(ts => ts * 1000) // Convert to milliseconds

    // Scheduler loop - checks every 5ms for claps to play
    const scheduleClaps = () => {
      const elapsed = Date.now() - startTimeRef.current
      const lookAhead = elapsed + SCHEDULE_AHEAD_MS

      // Schedule all claps that should play within the look-ahead window
      while (currentIndex < timestampsMs.length && timestampsMs[currentIndex] <= lookAhead) {
        const player = clapPlayersRef.current[currentIndex % clapPlayersRef.current.length]
        const scheduleTime = timestampsMs[currentIndex]

        // Schedule clap to play at the exact time
        setTimeout(() => {
          void player.play()
        }, Math.max(0, scheduleTime - elapsed))

        currentIndex++
      }

      // Continue scheduling or finish
      if (currentIndex < timestampsMs.length) {
        schedulerIntervalRef.current = setTimeout(scheduleClaps, SCHEDULE_INTERVAL_MS)
      } else {
        // Wait for last clap to finish before calling onPlaybackFinish
        const lastTimestamp = timestampsMs[timestampsMs.length - 1]
        const remainingTime = lastTimestamp - elapsed + 500 // Add 500ms buffer

        setTimeout(() => {
          setIsPlaying(false)
          onClapPlayingChange?.(false)
          onPlaybackFinish?.()
        }, Math.max(0, remainingTime))
      }
    }

    scheduleClaps()
  }

  return { isPlaying, playRhythmClaps, stop }
}
