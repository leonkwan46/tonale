import { useDevice } from '@/hooks'
import { isEnharmonicEquivalent } from '@/utils/enharmonicMap'
import { playErrorSound, playSuccessSound } from '@/utils/soundUtils'
import type { Question } from '@types'
import * as React from 'react'
import { useEffect, useState } from 'react'
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
  isNoteIdentification?: boolean
  wrongAnswersCount?: number
  isFinalTest?: boolean
}

export const AnswerInterface: React.FC<AnswerInterfaceProps> = ({ 
  questionType,
  questionData,
  onAnswerSubmit,
  onNextQuestion,
  isNoteIdentification = false,
  wrongAnswersCount = 0,
  isFinalTest = false
}) => {
  const { isTablet } = useDevice()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

  // Reset state when questionData changes (new question)
  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(null)
    setShowCorrectAnswer(false)
  }, [questionData.id])

  // ==========================
  // Handle Answer Result
  // ==========================
  useEffect(() => {
    if (showResult && selectedAnswer !== null) {
      if (!isCorrect) {
        setShowCorrectAnswer(true)
      }
      
      // Block if: final test, wrong answer, and this would be the 3rd wrong
      const totalWrong = wrongAnswersCount + (isCorrect ? 0 : 1)
      const shouldBlock = isFinalTest && !isCorrect && totalWrong > 3
      
      if (!shouldBlock) {
        const timer = setTimeout(() => {
          onNextQuestion()
        }, 1500) // Same delay for both correct and incorrect answers

        return () => {
          clearTimeout(timer)
        }
      }
    }
  }, [showResult, isCorrect, selectedAnswer, onNextQuestion, isFinalTest, wrongAnswersCount])

  const handleChoiceSelect = (choice: string) => {
    if (selectedAnswer !== null) return // Already answered
    
    setSelectedAnswer(choice)
    const correct = choice === questionData.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    
    // Play success sound immediately when answer is correct
    if (correct) {
      playSuccessSound()
    } else {
      playErrorSound()
    }
    
    // Call parent callback
    onAnswerSubmit(correct)
  }

  const handleKeyPress = (key: string) => {
    if (selectedAnswer !== null) return // Already answered
    
    setSelectedAnswer(key)
    const correct = isEnharmonicEquivalent(key, questionData.correctAnswer)
    setIsCorrect(correct)
    setShowResult(true)
    
    // Play success sound immediately when answer is correct
    if (correct) {
      playSuccessSound()
    } else {
      playErrorSound()
    }
    
    // Call parent callback
    onAnswerSubmit(correct)
  }

  const renderAnswerComponent = () => {
    switch (questionType) {
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return (
          <MultipleChoice
            key={questionData.id}
            testID={`correct-answer-${questionData.correctAnswer}`}
            choices={questionData.choices}
            correctAnswer={questionData.correctAnswer}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            showCorrectAnswer={showCorrectAnswer}
            onChoiceSelect={handleChoiceSelect}
            type={questionData.choices.length <= 4 ? 'row' : 'grid'}
            isNoteIdentification={isNoteIdentification}
          />
        )
      case QUESTION_TYPE.TRUE_FALSE:
        return (
          <TrueFalse
            choices={questionData.choices}
            correctAnswer={questionData.correctAnswer}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            showCorrectAnswer={showCorrectAnswer}
            onChoiceSelect={handleChoiceSelect}
            testID={`correct-answer-${questionData.correctAnswer}`}
          />
        )
      case QUESTION_TYPE.KEY_PRESS:
        return (
          <KeyPress
            key={questionData.id}
            correctKey={questionData.correctAnswer}
            onKeyPress={handleKeyPress}
          />
        )
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

