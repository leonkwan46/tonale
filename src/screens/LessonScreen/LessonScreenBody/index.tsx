import type { Question } from '@types'
import * as React from 'react'
import { useCallback } from 'react'
import { useDevice } from '../../../hooks'
import { AnswerInterface } from '../components/AnswerInterface'
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

export const LessonScreenBody: React.FC<LessonScreenBodyProps> = ({
  questions,
  currentQuestionIndex,
  onAnswerSubmit,
  onNextQuestion,
  onLessonComplete,
  wrongAnswersCount = 0,
  isFinalTest = false
}) => {
  const { isTablet } = useDevice()
  const currentQuestion = questions[currentQuestionIndex]
  const { question, visualComponent, type } = currentQuestion
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const isNoteIdentification = visualComponent?.clef && 
    visualComponent?.elements && 
    visualComponent.elements.length > 0 &&
    visualComponent.elements.some(element => element.pitch)

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

  if (questions.length === 0) return null

  return (
    <BodyContainer>
      <QuestionText 
        testID="question-text"
        isTablet={isTablet}
      >
        {question}
      </QuestionText>

      {/* Music Element */}
      {visualComponent && (
        <VisualQuestion visualComponent={visualComponent} />
      )}
      
      {/* Answer Interface */}
      <AnswerInterface 
        questionType={type}
        questionData={currentQuestion}
        onAnswerSubmit={handleAnswerSubmitInternal}
        onNextQuestion={handleNextQuestionInternal}
        isNoteIdentification={isNoteIdentification}
        wrongAnswersCount={wrongAnswersCount}
        isFinalTest={isFinalTest}
      />
      
    </BodyContainer>
  )
}
