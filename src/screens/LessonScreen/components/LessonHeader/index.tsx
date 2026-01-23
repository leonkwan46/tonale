import type { Lesson } from '@types'
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
  return (
    <Header>
      <BackButton testID="back-button" onPress={onBackPress}>
        <BackArrowIcon size={16} />
      </BackButton>
      
      {lesson?.isFinalTest ? (
        <ProgressTracker>
          <ProgressText testID="question-counter">{currentQuestionIndex + 1}/{totalQuestions}</ProgressText>
          <XMarksContainer>
            <XMark isActive={wrongAnswersCount >= 1}>✗</XMark>
            <XMark isActive={wrongAnswersCount >= 2}>✗</XMark>
            <XMark isActive={wrongAnswersCount >= 3}>✗</XMark>
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
