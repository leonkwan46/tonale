import { useDevice } from '@/hooks'
import { comparePulsePattern } from '@/subjects/aural/exercises/generators/pulse'
import { compareRhythmPattern } from '@/subjects/aural/exercises/generators/rhythm'
import { isEnharmonicEquivalent } from '@/utils/enharmonicMap'
import { playErrorSound, playSuccessSound } from '@/utils/soundUtils'
import type { AnswerType, Question } from '@types'
import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
import { AnswerInterfaceContainer } from './AnswerInterface.styles'
import { KeyPress } from './AnswerTypes/KeyPress'
import { MultipleChoice } from './AnswerTypes/MultipleChoice'
import { RhythmTap } from './AnswerTypes/RhythmTap'
import { TrueFalse } from './AnswerTypes/TrueFalse'
import { ANSWER_TYPE } from './AnswerTypes/types'

interface AnswerInterfaceProps {
  answerInterface: AnswerType
  questionData: Question
  onAnswerSubmit: (isCorrect: boolean) => void
  onNextQuestion: () => void
  wrongAnswersCount?: number
  isFinalTest?: boolean
  onAnsweringStateChange?: (isAnswering: boolean) => void
  onPlaybackFinishRef?: React.MutableRefObject<(() => void) | null>
  hasPlaybackStarted?: boolean
}

export const AnswerInterface: React.FC<AnswerInterfaceProps> = ({ 
  answerInterface,
  questionData,
  onAnswerSubmit,
  onNextQuestion,
  wrongAnswersCount = 0,
  isFinalTest = false,
  onAnsweringStateChange,
  onPlaybackFinishRef,
  hasPlaybackStarted = true
}) => {
  const { isTablet } = useDevice()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [isRhythmTapRecording, setIsRhythmTapRecording] = useState(false)
  const internalPlaybackFinishRef = useRef<(() => void) | null>(null)
  
  useEffect(() => {
    if (onPlaybackFinishRef) {
      onPlaybackFinishRef.current = () => {
        internalPlaybackFinishRef.current?.()
      }
    }
    return () => {
      if (onPlaybackFinishRef) {
        onPlaybackFinishRef.current = null
      }
    }
  }, [onPlaybackFinishRef])

  const questionInterface = questionData.questionInterface
  const isNoteIdentification = questionInterface?.clef && 
    questionInterface?.elements && 
    questionInterface.elements.length > 0 &&
    questionInterface.elements.some(element => element.pitch)

  const notifyAnsweringState = useCallback((recording: boolean, showingResult: boolean) => {
    if (answerInterface === ANSWER_TYPE.RHYTHM_TAP) {
      const isAnswering = recording || showingResult
      onAnsweringStateChange?.(isAnswering)
    } else {
      onAnsweringStateChange?.(false)
    }
  }, [answerInterface, onAnsweringStateChange])

  useEffect(() => {
    const hasAnswer = selectedAnswer !== null || (answerInterface === ANSWER_TYPE.RHYTHM_TAP && showResult)
    
    if (showResult && hasAnswer) {
      if (!isCorrect) {
        setShowCorrectAnswer(true)
      }
      
      const totalWrong = wrongAnswersCount + (isCorrect ? 0 : 1)
      const shouldBlock = isFinalTest && !isCorrect && totalWrong > 3
      
      if (!shouldBlock) {
        const timer = setTimeout(() => {
          onNextQuestion()
        }, 1500)

        return () => {
          clearTimeout(timer)
        }
      }
    }
  }, [showResult, isCorrect, selectedAnswer, answerInterface, onNextQuestion, isFinalTest, wrongAnswersCount])

  const handleChoiceSelect = (choice: string) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(choice)
    const correct = typeof questionData.correctAnswer === 'string' 
      ? choice === questionData.correctAnswer 
      : false
    setIsCorrect(correct)
    setShowResult(true)
    notifyAnsweringState(isRhythmTapRecording, true)
    
    if (correct) {
      playSuccessSound()
    } else {
      playErrorSound()
    }
    
    onAnswerSubmit(correct)
  }

  const handleKeyPress = (key: string) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(key)
    const correct = typeof questionData.correctAnswer === 'string'
      ? isEnharmonicEquivalent(key, questionData.correctAnswer)
      : false
    setIsCorrect(correct)
    setShowResult(true)
    notifyAnsweringState(isRhythmTapRecording, true)
    
    if (correct) {
      playSuccessSound()
    } else {
      playErrorSound()
    }
    
    onAnswerSubmit(correct)
  }

  const handleRhythmTapSubmit = (userTimestamps: number[]) => {
    if (selectedAnswer !== null || showResult) return
    
    const expectedTimestamps = Array.isArray(questionData.correctAnswer) 
      ? questionData.correctAnswer 
      : []
    
    const isPulseExercise = questionInterface?.audioFile && !questionInterface?.rhythm

    const correct = isPulseExercise
      ? comparePulsePattern(userTimestamps, expectedTimestamps)
      : compareRhythmPattern(userTimestamps, expectedTimestamps)
    
    if (isPulseExercise) {
      console.log('[Pulse Debug] Result:', correct ? 'CORRECT' : 'INCORRECT')
    }
    
    setSelectedAnswer('submitted')
    setIsCorrect(correct)
    setShowResult(true)
    notifyAnsweringState(false, true)
    
    if (correct) {
      playSuccessSound()
    } else {
      playErrorSound()
    }
    
    onAnswerSubmit(correct)
  }

  const renderAnswerComponent = () => {
    switch (answerInterface) {
      case ANSWER_TYPE.MULTIPLE_CHOICE:
        return (
          <MultipleChoice
            key={questionData.id}
            testID={`correct-answer-${typeof questionData.correctAnswer === 'string' ? questionData.correctAnswer : ''}`}
            choices={questionData.choices}
            correctAnswer={typeof questionData.correctAnswer === 'string' ? questionData.correctAnswer : ''}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            showCorrectAnswer={showCorrectAnswer}
            onChoiceSelect={handleChoiceSelect}
            type={questionData.choices.length <= 4 ? 'row' : 'grid'}
            isNoteIdentification={isNoteIdentification}
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
            key={questionData.id}
            correctKey={typeof questionData.correctAnswer === 'string' ? questionData.correctAnswer : ''}
            onKeyPress={handleKeyPress}
          />
        )
      case ANSWER_TYPE.RHYTHM_TAP:
        const rhythmPattern = Array.isArray(questionData.correctAnswer) 
          ? questionData.correctAnswer 
          : []
        const rhythmDuration = rhythmPattern.length > 0 
          ? (rhythmPattern[rhythmPattern.length - 1] + 0.5) * 1000
          : 0
        const buttonState = showResult 
          ? (isCorrect ? 'correct' : 'incorrect')
          : 'default'
        const tempo = questionData.questionInterface?.tempo || 120
        
        return (
          <RhythmTap
            key={questionData.id}
            onTapSubmit={handleRhythmTapSubmit}
            disabled={showResult || !hasPlaybackStarted}
            rhythmDuration={rhythmDuration}
            buttonState={buttonState}
            tempo={tempo}
            questionInterface={questionData.questionInterface}
            onRecordingChange={(isRecording) => {
              setIsRhythmTapRecording(isRecording)
              notifyAnsweringState(isRecording, showResult)
            }}
            onPlaybackFinishRef={internalPlaybackFinishRef}
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
