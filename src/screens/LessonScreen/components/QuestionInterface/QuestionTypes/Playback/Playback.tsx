import { useDevice } from '@/hooks'
import type { QuestionInterface } from '@types'
import { type FC, useCallback } from 'react'
import { QUESTION_TYPE } from '../types'
import { DEFAULT_TEMPO } from './constants'
import { useAudioFilePlayback } from './hooks/useAudioFilePlayback'
import { usePlaybackRipples } from './hooks/usePlaybackRipples'
import { useRhythmClaps } from './hooks/useRhythmClaps'
import { AnimationContainer, getPlayIconSize, IconWrapper, PlaybackCard, PlaybackText, PlayButton, PlayIcon } from './Playback.styles'
import { RippleAnimation } from './RippleAnimation'
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

  const tempo = questionInterface.tempo || DEFAULT_TEMPO
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

  const { ripples, removeRipple } = usePlaybackRipples({
    isPlaying: isCurrentlyPlaying,
    rhythm: questionInterface.rhythm
  })

  const handlePlaybackPressInternal = useCallback(async () => {
    const { rhythm, audioFile } = questionInterface

    if (audioFile) {
      await playAudioFile(audioFile, onPlaybackStart, onPlaybackFinish)
      return
    }

    if (onPlaybackPress) {
      onPlaybackPress()
      onPlaybackStart?.()
      return
    }

    if (rhythmPattern && rhythmPattern.length > 0) {
      playRhythmClaps(rhythmPattern, true)
    } else if (rhythm && rhythm.length > 0) {
      const timestamps = convertDurationsToTimestamps(rhythm)
      playRhythmClaps(timestamps, true)
    }
  }, [questionInterface, rhythmPattern, onPlaybackPress, playRhythmClaps, playAudioFile, onPlaybackStart, onPlaybackFinish])

  if (questionInterface.type !== QUESTION_TYPE.PLAYBACK && !onPlaybackPress) return null

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
        disabled={isCurrentlyPlaying || isAnswering || (!onPlaybackPress && !questionInterface.rhythm && !questionInterface.audioFile)}
      >
        <IconWrapper isPlaying={isCurrentlyPlaying}>
          <PlayIcon 
            isTablet={isTablet}
            name={isCurrentlyPlaying ? 'pause' : 'play'} 
            size={getPlayIconSize(isTablet)}
          />
        </IconWrapper>
      </PlayButton>
      </AnimationContainer>
    </PlaybackCard>
  )
}
