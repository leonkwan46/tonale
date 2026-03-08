import type { Question } from '@types'
import { useCallback, useRef } from 'react'
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
  const onPlaybackFinishRef = useRef<(() => void) | null>(null)

  const handleNextQuestionInternal = useCallback(() => {
    if (isLastQuestion) {
      onLessonComplete?.()
    } else {
      onNextQuestion()
    }
  }, [isLastQuestion, onLessonComplete, onNextQuestion])

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
          key={currentQuestion.id}
          answerType={type}
          questionData={currentQuestion}
          onAnswerSubmit={onAnswerSubmit}
          onNextQuestion={handleNextQuestionInternal}
          wrongAnswersCount={wrongAnswersCount}
          isFinalTest={isFinalTest}
          onPlaybackFinishRef={onPlaybackFinishRef}
        />
      </BodyContainer>
    </ScrollView>
  )
}
