import { Question } from '@/data/theoryData/types'
import React, { useEffect, useState } from 'react'
import { AnswerInterface } from '../components/AnswerInterface'
import { VisualQuestion } from '../components/VisualQuestion'
import { BodyContainer, ExplanationContainer, ExplanationText, QuestionContainer, QuestionText } from './LessonScreenBody.styles'

interface LessonScreenBodyProps {
  questions: Question[]
  onLessonComplete?: () => void
}

export const LessonScreenBody: React.FC<LessonScreenBodyProps> = ({
  questions,
  onLessonComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const { question, visualComponent, type, explanation } = currentQuestion
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  useEffect(() => {
    setShowResult(false)
    setIsCorrect(null)
  }, [currentQuestionIndex])

  if (questions.length === 0) return null

  const handleAnswerSubmit = (isCorrect: boolean) => {
    setShowResult(true)
    setIsCorrect(isCorrect)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Lesson completed
      onLessonComplete?.()
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  return (
    <BodyContainer>
      <QuestionContainer>
        <QuestionText>
          {question}
        </QuestionText>
      </QuestionContainer>

      {/* Music Staff */}
      {visualComponent && (
        <VisualQuestion visualComponent={visualComponent} />
      )}
      
      {/* Answer Interface */}
      <AnswerInterface 
        questionType={type}
        questionData={currentQuestion}
        onAnswerSubmit={handleAnswerSubmit}
        onNextQuestion={handleNextQuestion}
      />
      
      {showResult && explanation && (
        <ExplanationContainer>
          <ExplanationText isCorrect={isCorrect || false}>
            {explanation}
          </ExplanationText>
        </ExplanationContainer>
      )}
    </BodyContainer>
  )
}
