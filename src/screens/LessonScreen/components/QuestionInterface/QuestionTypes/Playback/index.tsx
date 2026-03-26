import { useDevice } from '@/hooks'
import type { PlaybackQuestionInterface } from '@types'
import { type FC, useCallback } from 'react'
import {
  convertDurationsToTimestamps,
  DEFAULT_TEMPO,
  useAudioFilePlayback,
  usePlaybackRipples,
  useRhythmClaps
} from './playbackHooks'
import { AnimationContainer, getPlayIconSize, PlaybackCard, PlaybackText, PlayButton, PlayIcon } from './Playback.styles'
import { RippleAnimation } from './RippleAnimation'

interface PlaybackProps {
  questionInterface: PlaybackQuestionInterface
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

export const Playback: FC<PlaybackProps> = ({
  questionInterface,
  onPlaybackPress,
  isPlaying = false,
  onClapPlayingChange,
  correctAnswer,
  answerInterface,
  enableMetronome,
  isAnswering = false,
  onPlaybackFinish,
  onPlaybackStart
}) => {
  const { isTablet } = useDevice()

  const tempo = questionInterface.tempo ?? DEFAULT_TEMPO
  const rhythmPattern = answerInterface === 'rhythmTap' && Array.isArray(correctAnswer)
    ? correctAnswer
    : undefined

  const { isPlaying: isPlayingAudioFile, play: playAudioFile } = useAudioFilePlayback()

  const { isPlaying: isPlayingClaps, playRhythmClaps } = useRhythmClaps({
    tempo,
    enableMetronome,
    onClapPlayingChange,
    onPlaybackStart,
    onPlaybackFinish
  })

  const isCurrentlyPlaying = isPlaying || isPlayingClaps || isPlayingAudioFile

  const playButtonDisabled =
    isCurrentlyPlaying ||
    isAnswering ||
    (!onPlaybackPress && !questionInterface.rhythm && !questionInterface.audioFile)

  const { ripples, removeRipple } = usePlaybackRipples({
    isPlaying: isCurrentlyPlaying,
    rhythm: questionInterface.rhythm
  })

  const handlePlaybackPressInternal = useCallback(async () => {
    if (questionInterface.audioFile) {
      await playAudioFile(questionInterface.audioFile, onPlaybackStart, onPlaybackFinish)
      return
    }

    if (onPlaybackPress) {
      onPlaybackPress()
      onPlaybackStart?.()
      return
    }

    if (rhythmPattern && rhythmPattern.length > 0) {
      playRhythmClaps(rhythmPattern, true)
    } else if (questionInterface.rhythm && questionInterface.rhythm.length > 0) {
      const timestamps = convertDurationsToTimestamps(questionInterface.rhythm)
      playRhythmClaps(timestamps, true)
    }
  }, [questionInterface, rhythmPattern, onPlaybackPress, playRhythmClaps, playAudioFile, onPlaybackStart, onPlaybackFinish])

  return (
    <PlaybackCard isTablet={isTablet}>
      <PlaybackText isTablet={isTablet}>
        Listen to the question
      </PlaybackText>
      <AnimationContainer isTablet={isTablet}>
        {ripples.map(id => (
          <RippleAnimation
            key={id}
            isTablet={isTablet}
            onComplete={() => removeRipple(id)}
          />
        ))}
        <PlayButton
          isTablet={isTablet}
          isPlaying={isCurrentlyPlaying}
          onPlaybackPress={handlePlaybackPressInternal}
          onPress={handlePlaybackPressInternal}
          disabled={playButtonDisabled}
        >
          <PlayIcon
            disabled={playButtonDisabled}
            name={isCurrentlyPlaying ? 'pause' : 'play'}
            size={getPlayIconSize(isTablet)}
          />
        </PlayButton>
      </AnimationContainer>
    </PlaybackCard>
  )
}
