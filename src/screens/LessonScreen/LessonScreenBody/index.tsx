import { useDevice } from '@/hooks'
import type { Question } from '@types'
import { useCallback, useRef } from 'react'
import { Platform } from 'react-native'
import { AnswerInterface } from '../components/AnswerInterface'
import { QuestionInterface } from '../components/QuestionInterface'
import { LessonScrollView, QuestionText } from './LessonScreenBody.styles'
import { QuestionExplanation } from '../components/QuestionExplanation'
import { FINAL_TEST_FAILURE_THRESHOLD } from '../constants'

interface LessonScreenBodyProps {
  questions: Question[]
  currentQuestionIndex: number
  onAnswerSubmit: (isCorrect: boolean) => void
  onNextQuestion: () => void
  onLessonComplete?: () => void
  wrongAnswersCount?: number
  isFinalTest?: boolean
  showExplanationModal: boolean
  onShowExplanation: () => void
  onHideExplanation: () => void
}

export const LessonScreenBody = ({
  questions,
  currentQuestionIndex,
  onAnswerSubmit,
  onNextQuestion,
  onLessonComplete,
  wrongAnswersCount = 0,
  isFinalTest = false,
  showExplanationModal,
  onShowExplanation,
  onHideExplanation
}: LessonScreenBodyProps) => {
  const { isTablet } = useDevice()
  const currentQuestion = questions[currentQuestionIndex]
  const { question, type } = currentQuestion
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const onPlaybackFinishRef = useRef<(() => void) | null>(null)

  const handleNextQuestionInternal = useCallback(() => {
    if (isLastQuestion) {
      onLessonComplete?.()
    } else {
      onNextQuestion()
    }
  }, [isLastQuestion, onLessonComplete, onNextQuestion])

  const handleExplanationContinue = useCallback(() => {
    onHideExplanation()
    const shouldBlock =
      isFinalTest && wrongAnswersCount + 1 >= FINAL_TEST_FAILURE_THRESHOLD
    if (shouldBlock) return
    handleNextQuestionInternal()
  }, [onHideExplanation, isFinalTest, wrongAnswersCount, handleNextQuestionInternal])

  if (questions.length === 0) return null

  return (
    <LessonScrollView
      bounces={false}
      overScrollMode={Platform.OS === 'android' ? 'never' : undefined}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <QuestionInterface question={currentQuestion} />

      <QuestionText
        testID="question-text"
        size={isTablet ? 'md' : 'lg'}
        weight="semibold"
        align="center"
      >
        {question}
      </QuestionText>

      <AnswerInterface
        key={currentQuestion.id}
        answerType={type}
        questionData={currentQuestion}
        onAnswerSubmit={onAnswerSubmit}
        onNextQuestion={handleNextQuestionInternal}
        onShowExplanation={onShowExplanation}
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
