import { AudioPlayer, createAudioPlayer } from 'expo-audio'
import { useRef, useState } from 'react'
import { setupAutoCleanup } from '@/utils/audioPlayerUtils'
import { AUDIO_VOLUME_PLAYBACK } from '../constants'

interface UseAudioFilePlaybackReturn {
  isPlaying: boolean
  play: (
    audioFile: ReturnType<typeof require>,
    onStart?: () => void,
    onFinish?: () => void
  ) => Promise<void>
  stop: () => void
}

/**
 * Hook for playing pre-recorded audio files (MP3).
 * Used for pulse exercises where user taps along to a melody.
 *
 * @returns Object with play, stop functions and isPlaying state
 */
export const useAudioFilePlayback = (): UseAudioFilePlaybackReturn => {
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<AudioPlayer | null>(null)

  const play = async (
    audioFile: ReturnType<typeof require>,
    onStart?: () => void,
    onFinish?: () => void
  ) => {
    // Stop any existing playback
    if (playerRef.current) {
      playerRef.current.remove()
      playerRef.current = null
    }

    try {
      const player = createAudioPlayer(audioFile)
      player.volume = AUDIO_VOLUME_PLAYBACK
      playerRef.current = player

      setupAutoCleanup(player)

      // Add finish listener
      player.addListener('playbackStatusUpdate', (status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false)
          onFinish?.()
        }
      })

      setIsPlaying(true)
      onStart?.()
      await player.play()
    } catch (error) {
      console.error('Audio playback error:', error)
      setIsPlaying(false)
    }
  }

  const stop = () => {
    if (playerRef.current) {
      playerRef.current.remove()
      playerRef.current = null
    }
    setIsPlaying(false)
  }

  return { isPlaying, play, stop }
}
