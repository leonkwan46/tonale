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

  // Reset result state when question changes
  useEffect(() => {
    setShowResult(false)
    setIsCorrect(null)
  }, [currentQuestionIndex])

  if (questions.length === 0) return null

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

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
          {currentQuestion.question}
        </QuestionText>
      </QuestionContainer>

      {/* Music Staff */}
      <VisualQuestion visualComponent={currentQuestion.visualComponent} />
      
      {/* Answer Interface */}
      <AnswerInterface 
        questionType={currentQuestion.type}
        questionData={currentQuestion}
        onAnswerSubmit={handleAnswerSubmit}
        onNextQuestion={handleNextQuestion}
      />
      
      {showResult && currentQuestion.explanation && (
        <ExplanationContainer>
          <ExplanationText isCorrect={isCorrect || false}>
            {currentQuestion.explanation}
          </ExplanationText>
        </ExplanationContainer>
      )}
    </BodyContainer>
  )
}
