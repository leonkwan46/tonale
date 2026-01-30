import { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import type { QuestionInterface } from '@/types/lesson'
import { PlayButton, PlayButtonContainer, PlayButtonText } from './Playback.styles'
import { RippleAnimation } from './RippleAnimation'
import { useAudioFilePlayback } from './hooks/useAudioFilePlayback'
import { usePlaybackRipples } from './hooks/usePlaybackRipples'
import { useRhythmClaps } from './hooks/useRhythmClaps'
import { convertDurationsToTimestamps } from './utils'

interface PlaybackProps {
  questionInterface: QuestionInterface
  onPlaybackPress?: () => void
  isPlaying?: boolean
  onClapPlayingChange?: (isPlaying: boolean) => void
  correctAnswer?: string | number[]
  answerInterface?: string
  enableMetronome?: boolean
  isAnswering?: boolean
  onPlaybackFinish?: () => void
  onPlaybackStart?: () => void
}

/**
 * Unified playback component for aural exercises.
 * Automatically detects playback type (audioFile vs rhythm) and routes appropriately.
 *
 * Features:
 * - Audio file playback for pulse exercises
 * - Rhythm clap synthesis for rhythm exercises
 * - Visual ripple animations
 * - Play/pause button with state management
 *
 * @param props - Playback configuration and callbacks
 */
export const Playback = ({
  questionInterface,
  onPlaybackPress,
  isPlaying: externalIsPlaying,
  onClapPlayingChange,
  enableMetronome = false,
  onPlaybackFinish,
  onPlaybackStart
}: PlaybackProps) => {
  const { audioFile, rhythm, tempo = 90 } = questionInterface

  // Audio file playback
  const {
    isPlaying: isAudioPlaying,
    play: playAudio,
    stop: stopAudio
  } = useAudioFilePlayback()

  // Rhythm claps playback
  const {
    isPlaying: isClapPlaying,
    playRhythmClaps,
    stop: stopClaps
  } = useRhythmClaps({
    tempo,
    enableMetronome,
    onClapPlayingChange,
    onPlaybackStart,
    onPlaybackFinish
  })

  // Ripple animations
  const { ripples, removeRipple } = usePlaybackRipples({
    isPlaying: isClapPlaying,
    rhythm
  })

  const isPlaying = externalIsPlaying ?? (isAudioPlaying || isClapPlaying)

  const handlePlayPress = useCallback(() => {
    if (onPlaybackPress) {
      onPlaybackPress()
      return
    }

    if (audioFile) {
      void playAudio(audioFile, onPlaybackStart, onPlaybackFinish)
    } else if (rhythm) {
      const timestamps = convertDurationsToTimestamps(rhythm)
      void playRhythmClaps(timestamps, true)
    }
  }, [audioFile, rhythm, playAudio, playRhythmClaps, onPlaybackPress, onPlaybackStart, onPlaybackFinish])

  const handleStop = useCallback(() => {
    stopAudio()
    stopClaps()
  }, [stopAudio, stopClaps])

  return (
    <PlayButtonContainer>
      <TouchableOpacity onPress={isPlaying ? handleStop : handlePlayPress}>
        <PlayButton isPlaying={isPlaying}>
          <PlayButtonText>{isPlaying ? 'Pause' : 'Play'}</PlayButtonText>
        </PlayButton>
      </TouchableOpacity>

      {ripples.map(rippleId => (
        <RippleAnimation
          key={rippleId}
          onAnimationComplete={() => removeRipple(rippleId)}
        />
      ))}
    </PlayButtonContainer>
  )
}
