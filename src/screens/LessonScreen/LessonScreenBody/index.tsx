import { Question } from '@/data/theoryData/types'
import React from 'react'
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

  // Check if this is a note identification exercise (has clef + elements with pitch property)
  const isNoteIdentification = visualComponent?.clef && 
    visualComponent?.elements && 
    visualComponent.elements.length > 0 &&
    visualComponent.elements.some(element => element.pitch)


  if (questions.length === 0) return null

  const handleAnswerSubmitInternal = (isCorrect: boolean) => {
    // Pass the answer result to the parent component
    onAnswerSubmit(isCorrect)
  }

  const handleNextQuestionInternal = () => {
    if (isLastQuestion) {
      // Lesson completed
      onLessonComplete?.()
    } else {
      // Move to next question
      onNextQuestion()
    }
  }

  return (
    <BodyContainer>
      <QuestionText isTablet={isTablet}>
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
