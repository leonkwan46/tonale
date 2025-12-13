import { useDevice } from '@/hooks'
import { Ionicons } from '@expo/vector-icons'
import type { QuestionInterface } from '@types'
import { type FC } from 'react'
import { scale } from 'react-native-size-matters'
import { QUESTION_TYPE } from '../types'
import { PlaybackCard, PlaybackText, PlayButton } from './Playback.styles'

interface PlaybackProps {
  questionInterface: QuestionInterface
  onPlaybackPress?: () => void
  isPlaying?: boolean
}

export const Playback: FC<PlaybackProps> = ({ questionInterface, onPlaybackPress, isPlaying = false }) => {
  const { isTablet } = useDevice()

  const shouldShowPlayback = questionInterface.type === QUESTION_TYPE.PLAYBACK || onPlaybackPress

  if (!shouldShowPlayback) return null

  return (
    <PlaybackCard isTablet={isTablet}>
      <PlaybackText isTablet={isTablet}>
        Listen to the question
      </PlaybackText>
      <PlayButton 
        isTablet={isTablet}
        onPress={onPlaybackPress}
        disabled={isPlaying || !onPlaybackPress}
        style={{ opacity: (isPlaying || !onPlaybackPress) ? 0.6 : 1 }}
      >
        <Ionicons 
          name={isPlaying ? 'pause' : 'play'} 
          size={isTablet ? scale(40) : scale(50)} 
          color="#fff"
          style={{ marginLeft: isPlaying ? 0 : scale(2) }}
        />
      </PlayButton>
    </PlaybackCard>
  )
}
