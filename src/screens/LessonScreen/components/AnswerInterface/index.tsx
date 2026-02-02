import { comparePulsePattern } from '@/subjects/aural/exercises/generators/pulse'
import { compareRhythmPattern } from '@/subjects/aural/exercises/generators/rhythm'
import { isEnharmonicEquivalent } from '@/utils/enharmonicMap'
import { playErrorSound, playSuccessSound } from '@/utils/soundUtils'
import type { Question } from '@types'
import { useEffect, useMemo, useState } from 'react'
import { Text } from 'react-native'
import { QuestionExplanation } from '../QuestionExplanation'
import { AnswerInterfaceContainer } from './AnswerInterface.styles'
import { RhythmTap } from './AnswerTypes/RhythmTap'
import { KeyPress } from './AnswerTypes/KeyPress'
import { MultipleChoice } from './AnswerTypes/MultipleChoice'
import { TrueFalse } from './AnswerTypes/TrueFalse'
import { ANSWER_TYPE, AnswerType } from './AnswerTypes/types'

interface AnswerInterfaceProps {
  answerType: AnswerType
  questionData: Question
  onAnswerSubmit: (isCorrect: boolean) => void
  onNextQuestion: () => void
  onLessonComplete?: () => void
  wrongAnswersCount?: number
  isFinalTest?: boolean
  isLastQuestion?: boolean
  onPlaybackFinishRef?: React.MutableRefObject<(() => void) | null>
}

const EXPLANATION_MODAL_DELAY = 1000
const CORRECT_ANSWER_DELAY = 1500
const FINAL_TEST_FAILURE_THRESHOLD = 3

export const AnswerInterface = ({
  answerType,
  questionData,
  onAnswerSubmit,
  onNextQuestion,
  onLessonComplete,
  wrongAnswersCount = 0,
  isFinalTest = false,
  isLastQuestion = false,
  onPlaybackFinishRef
}: AnswerInterfaceProps) => {
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
    const correctAnswer = typeof questionData.correctAnswer === 'string'
      ? questionData.correctAnswer
      : ''
    handleAnswer(choice, choice === correctAnswer)
  }

  const handleKeyPress = (key: string) => {
    const correctAnswer = typeof questionData.correctAnswer === 'string'
      ? questionData.correctAnswer
      : ''
    handleAnswer(key, isEnharmonicEquivalent(key, correctAnswer))
  }

  const handleRhythmTapSubmit = (userTimestamps: number[]) => {
    const correctAnswer = questionData.correctAnswer as number[]
    let isCorrect = false

    const isPulseExercise = questionData.questionInterface?.audioFile && !questionData.questionInterface?.rhythm
    const isRhythmExercise = questionData.questionInterface?.rhythm && !questionData.questionInterface?.audioFile

    if (isPulseExercise) {
      isCorrect = comparePulsePattern(userTimestamps, correctAnswer)
    } else if (isRhythmExercise) {
      isCorrect = compareRhythmPattern(userTimestamps, correctAnswer)
    }

    handleAnswer(userTimestamps.join(','), isCorrect)
  }

  const rhythmDuration = useMemo(() => {
    if (questionData.questionInterface?.rhythm) {
      const totalDuration = questionData.questionInterface.rhythm.reduce((sum, dur) => sum + dur, 0)
      const tempo = questionData.questionInterface.tempo || 90
      const beatDuration = 60 / tempo
      return (totalDuration * beatDuration * 1000) + 1000 // Add 1s buffer
    }
    return undefined
  }, [questionData])

  const renderAnswerComponent = () => {
    switch (answerType) {
      case ANSWER_TYPE.MULTIPLE_CHOICE:
        return (
          <MultipleChoice
            testID={`correct-answer-${typeof questionData.correctAnswer === 'string' ? questionData.correctAnswer : ''}`}
            choices={questionData.choices}
            correctAnswer={typeof questionData.correctAnswer === 'string' ? questionData.correctAnswer : ''}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onChoiceSelect={handleChoiceSelect}
            type={questionData.layoutType ?? 'row'}
          />
        )
      case ANSWER_TYPE.TRUE_FALSE:
        return (
          <TrueFalse
            choices={questionData.choices}
            correctAnswer={typeof questionData.correctAnswer === 'string' ? questionData.correctAnswer : ''}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            showCorrectAnswer={showCorrectAnswer}
            onChoiceSelect={handleChoiceSelect}
            testID={`correct-answer-${typeof questionData.correctAnswer === 'string' ? questionData.correctAnswer : ''}`}
          />
        )
      case ANSWER_TYPE.KEY_PRESS:
        return (
          <KeyPress
            correctKey={typeof questionData.correctAnswer === 'string' ? questionData.correctAnswer : ''}
            onKeyPress={handleKeyPress}
          />
        )
      case ANSWER_TYPE.RHYTHM_TAP:
        return (
          <RhythmTap
            onTapSubmit={handleRhythmTapSubmit}
            disabled={showResult}
            rhythmDuration={rhythmDuration}
            buttonState={
              showResult
                ? (isCorrect ? 'correct' : 'incorrect')
                : 'default'
            }
            tempo={questionData.questionInterface?.tempo}
            questionInterface={questionData.questionInterface}
            onRecordingChange={(recording) => {
              // Optional: track recording state
            }}
            onPlaybackFinishRef={onPlaybackFinishRef}
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
      <AnswerInterfaceContainer>
        {renderAnswerComponent()}
      </AnswerInterfaceContainer>
      
      {showExplanationModal && !isFinalTest && (
        <QuestionExplanation
          explanation={questionData.explanation}
          correctAnswer={typeof questionData.correctAnswer === 'string' ? questionData.correctAnswer : ''}
          visualComponent={questionData.visualComponent}
          onContinue={handleContinue}
        />
      )}
    </>
  )
}

