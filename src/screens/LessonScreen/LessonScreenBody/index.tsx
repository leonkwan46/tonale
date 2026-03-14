import type { Question } from '@types'
import { useCallback, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { AnswerInterface } from '../components/AnswerInterface'
import { QuestionInterface } from '../components/QuestionInterface'
import { LessonScrollView, QuestionText } from './LessonScreenBody.styles'
import { QuestionExplanation } from '../components/QuestionExplanation'

const FINAL_TEST_FAILURE_THRESHOLD = 3

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
  const { question, type } = currentQuestion
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const onPlaybackFinishRef = useRef<(() => void) | null>(null)
  const [showExplanationModal, setShowExplanationModal] = useState(false)

  const handleNextQuestionInternal = useCallback(() => {
    if (isLastQuestion) {
      onLessonComplete?.()
    } else {
      onNextQuestion()
    }
  }, [isLastQuestion, onLessonComplete, onNextQuestion])

  const handleExplanationContinue = useCallback(() => {
    setShowExplanationModal(false)
    const shouldBlock =
      isFinalTest && wrongAnswersCount + 1 >= FINAL_TEST_FAILURE_THRESHOLD
    if (shouldBlock) return
    handleNextQuestionInternal()
  }, [isFinalTest, wrongAnswersCount, handleNextQuestionInternal])

  if (questions.length === 0) return null

  return (
    <LessonScrollView
      bounces={false}
      overScrollMode={Platform.OS === 'android' ? 'never' : undefined}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <QuestionInterface question={currentQuestion} />

      <QuestionText testID="question-text">{question}</QuestionText>

      <AnswerInterface
        key={currentQuestion.id}
        answerType={type}
        questionData={currentQuestion}
        onAnswerSubmit={onAnswerSubmit}
        onNextQuestion={handleNextQuestionInternal}
        onShowExplanation={() => setShowExplanationModal(true)}
        wrongAnswersCount={wrongAnswersCount}
        isFinalTest={isFinalTest}
        onPlaybackFinishRef={onPlaybackFinishRef}
      />

      {showExplanationModal && !isFinalTest && (
        <QuestionExplanation
          explanation={currentQuestion.explanation}
          correctAnswer={typeof currentQuestion.correctAnswer === 'string' ? currentQuestion.correctAnswer : ''}
          visualComponent={currentQuestion.visualComponent}
          onContinue={handleExplanationContinue}
        />
      )}
    </LessonScrollView>
  )
}
