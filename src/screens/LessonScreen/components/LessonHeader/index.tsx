import type { Lesson } from '@types'
import { useDevice } from '../../../../hooks'
import { BackArrowIcon } from './BackArrowIcon'
import {
  BackButton,
  Header,
  ProgressText,
  ProgressTracker,
  XMark,
  XMarksContainer
} from './LessonHeader.styles'

interface LessonHeaderProps {
  lesson: Lesson | null
  currentQuestionIndex: number
  totalQuestions: number
  wrongAnswersCount: number
  onBackPress: () => void
}

export const LessonHeader = ({
  lesson,
  currentQuestionIndex,
  totalQuestions,
  wrongAnswersCount,
  onBackPress
}: LessonHeaderProps) => {
  const { isTablet } = useDevice()
  
  return (
    <Header>
      <BackButton testID="back-button" onPress={onBackPress}>
        <BackArrowIcon size={16} />
      </BackButton>
      
      {lesson?.isFinalTest ? (
        <ProgressTracker>
          <ProgressText testID="question-counter">{currentQuestionIndex + 1}/{totalQuestions}</ProgressText>
          <XMarksContainer>
            <XMark isActive={wrongAnswersCount >= 1} isTablet={isTablet}>✗</XMark>
            <XMark isActive={wrongAnswersCount >= 2} isTablet={isTablet}>✗</XMark>
            <XMark isActive={wrongAnswersCount >= 3} isTablet={isTablet}>✗</XMark>
          </XMarksContainer>
        </ProgressTracker>
      ) : (
        <ProgressTracker>
          <ProgressText testID="question-counter">{currentQuestionIndex + 1}/{totalQuestions}</ProgressText>
        </ProgressTracker>
      )}
    </Header>
  )
}
