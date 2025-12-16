import { useMetronome } from '@/hooks'
import { setupAutoCleanup } from '@/utils/audioPlayerUtils'
import { createAudioPlayer } from 'expo-audio'
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

export const useRhythmClaps = ({
  tempo = DEFAULT_TEMPO,
  enableMetronome = false,
  onClapPlayingChange,
  onPlaybackStart,
  onPlaybackFinish
}: UseRhythmClapsOptions = {}): UseRhythmClapsReturn => {
  const [isPlaying, setIsPlaying] = useState(false)
  const clapTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const { start: startMetronome, stop: stopMetronome } = useMetronome({
    enabled: false,
    volume: AUDIO_VOLUME_METRONOME,
    bpm: tempo
  })

  const playClapSound = useCallback(async () => {
    try {
      const player = createAudioPlayer(CLAP_SOUND)
      player.volume = AUDIO_VOLUME_PLAYBACK
      await player.play()
      setupAutoCleanup(player)
    } catch (error) {
      console.warn('Could not play clap sound:', error)
    }
  }, [])

  const clearClapTimeouts = useCallback(() => {
    clapTimeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    clapTimeoutsRef.current = []
  }, [])

  const stop = useCallback(() => {
    clearClapTimeouts()
    setIsPlaying(false)
    onClapPlayingChange?.(false)
    stopMetronome()
  }, [clearClapTimeouts, onClapPlayingChange, stopMetronome])

  const playRhythmClaps = useCallback((timestamps: number[], notifyStart = false) => {
    clearClapTimeouts()
    setIsPlaying(true)
    onClapPlayingChange?.(true)
    
    if (notifyStart) {
      onPlaybackStart?.()
    }

    if (enableMetronome) {
      startMetronome()
    }

    timestamps.forEach((timestamp) => {
      const timeout = setTimeout(() => {
        void playClapSound()
      }, timestamp * 1000)
      clapTimeoutsRef.current.push(timeout)
    })

    const lastTimestamp = timestamps[timestamps.length - 1] || 0
    const finalTimeout = setTimeout(() => {
      setIsPlaying(false)
      onClapPlayingChange?.(false)
      if (enableMetronome) {
        stopMetronome()
      }
      onPlaybackFinish?.()
    }, (lastTimestamp + RHYTHM_FINAL_TIMEOUT_BUFFER) * 1000)
    clapTimeoutsRef.current.push(finalTimeout)
  }, [
    clearClapTimeouts,
    enableMetronome,
    onClapPlayingChange,
    playClapSound,
    startMetronome,
    stopMetronome,
    onPlaybackStart,
    onPlaybackFinish
  ])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearClapTimeouts()
      stopMetronome()
    }
  }, [clearClapTimeouts, stopMetronome])

  return {
    isPlaying,
    playRhythmClaps,
    stop
  }
}

