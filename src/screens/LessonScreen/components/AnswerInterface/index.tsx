import { Question } from '@/data/theoryData/types'
import { useDevice } from '@/hooks'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { AnswerInterfaceContainer } from './AnswerInterface.styles'
import { KeyPress } from './QuestionTypes/KeyPress'
import { MultipleChoice } from './QuestionTypes/MultipleChoice'
import { TrueFalse } from './QuestionTypes/TrueFalse'
import { QUESTION_TYPE, QuestionType } from './QuestionTypes/types'

interface AnswerInterfaceProps {
  questionType: QuestionType
  questionData: Question
  onAnswerSubmit: (isCorrect: boolean) => void
  onNextQuestion: () => void
}

export const AnswerInterface: React.FC<AnswerInterfaceProps> = ({ 
  questionType,
  questionData,
  onAnswerSubmit,
  onNextQuestion
}) => {
  const { isTablet } = useDevice()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState(questionData.id)

  // Reset state when questionData changes (new question)
  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(null)
    setShowCorrectAnswer(false)
    setCurrentQuestionId(questionData.id)
  }, [questionData.id])

  // ==========================
  // Handle Wrong Answer
  // ==========================
  useEffect(() => {
    if (showResult && !isCorrect && selectedAnswer !== null && !showCorrectAnswer) {
      setShowCorrectAnswer(true)
      const timer = setTimeout(() => {
        onNextQuestion()
      }, 3000) // 3 seconds delay

      return () => {
        clearTimeout(timer)
      }
    }
  }, [showResult, isCorrect, selectedAnswer])

  // ==========================
  // Handle Correct Answer
  // ==========================
  useEffect(() => {
    if (showResult && isCorrect && selectedAnswer !== null) {
      const timer = setTimeout(() => {
        onNextQuestion()
      }, 1500) // 1.5 seconds for correct answer

      return () => {
        clearTimeout(timer)
      }
    }
  }, [showResult, isCorrect, selectedAnswer])

  const handleChoiceSelect = (choice: string) => {
    if (selectedAnswer !== null) return // Already answered
    
    setSelectedAnswer(choice)
    const correct = choice === questionData.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    
    // Call parent callback
    onAnswerSubmit(correct)
  }

  const renderAnswerComponent = () => {
    switch (questionType) {
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return (
          <MultipleChoice
            key={questionData.id}
            choices={questionData.choices}
            correctAnswer={questionData.correctAnswer}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            showCorrectAnswer={showCorrectAnswer}
            onChoiceSelect={handleChoiceSelect}
          />
        )
      case QUESTION_TYPE.TRUE_FALSE:
        return <TrueFalse />
      case QUESTION_TYPE.KEY_PRESS:
        return <KeyPress />
      default:
        return <Text>Unknown question type</Text>
    }
  }

  return (
    <AnswerInterfaceContainer isTablet={isTablet}>
      {renderAnswerComponent()}
    </AnswerInterfaceContainer>
  )
}

