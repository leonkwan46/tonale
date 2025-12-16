import { addSafePlaybackListener, setupAutoCleanup } from '@/utils/audioPlayerUtils'
import { createAudioPlayer } from 'expo-audio'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AUDIO_VOLUME_PLAYBACK } from '../constants'

interface UseAudioFilePlaybackReturn {
  isPlaying: boolean
  play: (audioFile: string, onStart?: () => void, onFinish?: () => void) => Promise<void>
  stop: () => void
}

/**
 * Hook for playing pre-recorded audio files (MP3, etc.)
 * For note-based playback, see usePlayer hook
 */
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
    audioFile: string,
    onStart?: () => void,
    onFinish?: () => void
  ) => {
    try {
      // Stop any currently playing audio
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioFilePlayerRef.current) {
        audioFilePlayerRef.current.pause()
        audioFilePlayerRef.current = null
      }
      setIsPlaying(false)
    }
  }, [])

  return {
    isPlaying,
    play,
    stop
  }
}

