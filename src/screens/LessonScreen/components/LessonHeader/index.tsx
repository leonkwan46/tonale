import { Lesson } from '@/data/theoryData/types'
import React from 'react'
import {
  BackButton,
  BackButtonText,
  Header,
  HeaderSpacer,
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

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  lesson,
  currentQuestionIndex,
  totalQuestions,
  wrongAnswersCount,
  onBackPress
}) => {
  return (
    <Header>
      <BackButton onPress={onBackPress}>
        <BackButtonText>←</BackButtonText>
      </BackButton>
      
      {lesson?.isFinalTest ? (
        <XMarksContainer>
          <XMark isActive={wrongAnswersCount >= 1}>✗</XMark>
          <XMark isActive={wrongAnswersCount >= 2}>✗</XMark>
          <XMark isActive={wrongAnswersCount >= 3}>✗</XMark>
        </XMarksContainer>
      ) : (
        <ProgressTracker>
          <ProgressText>{currentQuestionIndex + 1}/{totalQuestions}</ProgressText>
        </ProgressTracker>
      )}
      
      <HeaderSpacer />
    </Header>
  )
}
