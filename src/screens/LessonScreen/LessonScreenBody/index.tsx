import { Question } from '@/data/theoryData/types'
import React from 'react'
import { AnswerInterface } from '../components/AnswerInterface'
import { VisualQuestion } from '../components/VisualQuestion'
import { BodyContainer, QuestionContainer, QuestionText } from './LessonScreenBody.styles'

interface LessonScreenBodyProps {
  questions: Question[]
  currentQuestionIndex: number
  onAnswerSubmit: (isCorrect: boolean) => void
  onNextQuestion: () => void
  onLessonComplete?: () => void
}

export const LessonScreenBody: React.FC<LessonScreenBodyProps> = ({
  questions,
  currentQuestionIndex,
  onAnswerSubmit,
  onNextQuestion,
  onLessonComplete
}) => {

  const currentQuestion = questions[currentQuestionIndex]
  const { question, visualComponent, type } = currentQuestion
  const isLastQuestion = currentQuestionIndex === questions.length - 1


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
      <QuestionContainer>
        <QuestionText>
          {question}
        </QuestionText>
      </QuestionContainer>

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
      />
      
    </BodyContainer>
  )
}
