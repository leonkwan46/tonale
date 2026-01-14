import { useDevice } from '@/hooks'
import { isEnharmonicEquivalent } from '@/utils/enharmonicMap'
import { playErrorSound, playSuccessSound } from '@/utils/soundUtils'
import type { Question } from '@types'
import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { QuestionExplanation } from '../QuestionExplanation'
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
  onLessonComplete?: () => void
  wrongAnswersCount?: number
  isFinalTest?: boolean
  isLastQuestion?: boolean
}

const EXPLANATION_MODAL_DELAY = 1000
const CORRECT_ANSWER_DELAY = 1500
const FINAL_TEST_FAILURE_THRESHOLD = 3

export const AnswerInterface = ({ 
  questionType,
  questionData,
  onAnswerSubmit,
  onNextQuestion,
  onLessonComplete,
  wrongAnswersCount = 0,
  isFinalTest = false,
  isLastQuestion = false
}: AnswerInterfaceProps) => {
  const { isTablet } = useDevice()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [showExplanationModal, setShowExplanationModal] = useState(false)

  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(null)
    setShowCorrectAnswer(false)
    setShowExplanationModal(false)
  }, [questionData.id])

  useEffect(() => {
    // Only proceed if we have a result and a selected answer
    if (!showResult || selectedAnswer === null) return

    // Handle wrong answers: show correct answer
    if (!isCorrect) {
      setShowCorrectAnswer(true)
      
      // For regular lessons (not final tests), show explanation modal
      if (!isFinalTest) {
        const timer = setTimeout(() => {
          setShowExplanationModal(true)
        }, EXPLANATION_MODAL_DELAY)
        
        return () => clearTimeout(timer)
      }
    }

    // Check if we should block progression (final test failure threshold)
    // Block if: final test + wrong answer + this would be the 4th wrong answer
    const totalWrong = wrongAnswersCount + (isCorrect ? 0 : 1)
    const shouldBlock = isFinalTest && !isCorrect && totalWrong > 3
    
    // If not blocked, proceed to next question after delay
    if (!shouldBlock) {
      const timer = setTimeout(() => {
        if (isLastQuestion && onLessonComplete) {
          onLessonComplete()
        } else {
          onNextQuestion()
        }
      }, CORRECT_ANSWER_DELAY)

      return () => clearTimeout(timer)
    }
  }, [showResult, isCorrect, selectedAnswer, onNextQuestion, onLessonComplete, isFinalTest, wrongAnswersCount, isLastQuestion])

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(answer)
    setIsCorrect(isCorrect)
    setShowResult(true)
    
    if (isCorrect) {
      playSuccessSound()
    } else {
      playErrorSound()
    }
    
    onAnswerSubmit(isCorrect)
  }

  const handleChoiceSelect = (choice: string) => {
    handleAnswer(choice, choice === questionData.correctAnswer)
  }

  const handleKeyPress = (key: string) => {
    handleAnswer(key, isEnharmonicEquivalent(key, questionData.correctAnswer))
  }

  const renderAnswerComponent = () => {
    switch (questionType) {
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return (
          <MultipleChoice
            testID={`correct-answer-${questionData.correctAnswer}`}
            choices={questionData.choices}
            correctAnswer={questionData.correctAnswer}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onChoiceSelect={handleChoiceSelect}
            type={questionData.layoutType ?? 'row'}
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
            correctKey={questionData.correctAnswer}
            onKeyPress={handleKeyPress}
          />
        )
      default:
        return <Text>Unknown question type</Text>
    }
  }

  const handleContinue = () => {
    setShowExplanationModal(false)
    const shouldBlock = isFinalTest && wrongAnswersCount + 1 >= FINAL_TEST_FAILURE_THRESHOLD
    
    if (shouldBlock) return
    
    if (isLastQuestion && onLessonComplete) {
      onLessonComplete()
    } else {
      onNextQuestion()
    }
  }

  return (
    <>
      <AnswerInterfaceContainer isTablet={isTablet}>
        {renderAnswerComponent()}
      </AnswerInterfaceContainer>
      
      {showExplanationModal && !isFinalTest && (
        <QuestionExplanation
          explanation={questionData.explanation}
          correctAnswer={questionData.correctAnswer}
          visualComponent={questionData.visualComponent}
          onContinue={handleContinue}
        />
      )}
    </>
  )
}

