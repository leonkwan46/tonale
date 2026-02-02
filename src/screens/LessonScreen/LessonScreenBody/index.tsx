import type { Question } from '@types'
import { useCallback, useEffect, useRef } from 'react'
import { Platform, ScrollView } from 'react-native'
import { AnswerInterface } from '../components/AnswerInterface'
import { Playback } from '../components/QuestionInterface/QuestionTypes/Playback'
import { VisualQuestion } from '../components/VisualQuestion'
import { BodyContainer, QuestionText } from './LessonScreenBody.styles'

interface LessonScreenBodyProps {
  questions: Question[]
  currentQuestionIndex: number
  onAnswerSubmit: (isCorrect: boolean) => void
  onNextQuestion: () => void
  onLessonComplete?: () => void
  wrongAnswersCount?: number
  isFinalTest?: boolean
}

export const LessonScreenBody = ({
  questions,
  currentQuestionIndex,
  onAnswerSubmit,
  onNextQuestion,
  onLessonComplete,
  wrongAnswersCount = 0,
  isFinalTest = false
}: LessonScreenBodyProps) => {
  const currentQuestion = questions[currentQuestionIndex]
  const { question, visualComponent, type, stage } = currentQuestion
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  // Playback state for aural exercises
  const onPlaybackFinishRef = useRef<(() => void) | null>(null)

  const handleAnswerSubmitInternal = useCallback((isCorrect: boolean) => {
    onAnswerSubmit(isCorrect)
  }, [onAnswerSubmit])

  const handleNextQuestionInternal = useCallback(() => {
    if (isLastQuestion) {
      onLessonComplete?.()
    } else {
      onNextQuestion()
    }
  }, [isLastQuestion, onLessonComplete, onNextQuestion])

  // Reset playback state on question change
  useEffect(() => {
    onPlaybackFinishRef.current = null
  }, [currentQuestion.id])

  if (questions.length === 0) return null

  return (
    <ScrollView
      bounces={false}
      overScrollMode={Platform.OS === 'android' ? 'never' : undefined}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <BodyContainer>
        {visualComponent && (
          <VisualQuestion visualComponent={visualComponent} stage={stage} />
        )}

        {currentQuestion.questionInterface && (
          <Playback
            questionInterface={currentQuestion.questionInterface}
            enableMetronome={false}
          />
        )}

        <QuestionText testID="question-text">{question}</QuestionText>

        <AnswerInterface
          answerType={type}
          questionData={currentQuestion}
          onAnswerSubmit={handleAnswerSubmitInternal}
          onNextQuestion={handleNextQuestionInternal}
          onLessonComplete={onLessonComplete}
          wrongAnswersCount={wrongAnswersCount}
          isFinalTest={isFinalTest}
          isLastQuestion={isLastQuestion}
          onPlaybackFinishRef={onPlaybackFinishRef}
        />
      </BodyContainer>
    </ScrollView>
  )
}
