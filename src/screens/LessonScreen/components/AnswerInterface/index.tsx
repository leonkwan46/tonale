import { comparePulsePattern } from '@/subjects/aural/exercises/generators/pulse'
import { compareRhythmPattern } from '@/subjects/aural/exercises/generators/rhythm'
import { isEnharmonicEquivalent } from '@/utils/enharmonicMap'
import { playErrorSound, playSuccessSound } from '@/utils/soundUtils'
import type { Question } from '@types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Pressable, Text } from 'react-native'
import { AnswerInterfaceContainer } from './AnswerInterface.styles'
import { RhythmTap } from './AnswerTypes/RhythmTap'
import { KeyPress } from './AnswerTypes/KeyPress'
import { MultipleChoice } from './AnswerTypes/MultipleChoice'
import { TrueFalse } from './AnswerTypes/TrueFalse'
import { ANSWER_TYPE, AnswerType } from './AnswerTypes/types'
import { FINAL_TEST_FAILURE_THRESHOLD } from '../../constants'

interface AnswerInterfaceProps {
  answerType: AnswerType
  questionData: Question
  onAnswerSubmit: (isCorrect: boolean) => void
  onNextQuestion: () => void
  onShowExplanation?: () => void
  wrongAnswersCount?: number
  isFinalTest?: boolean
  onPlaybackFinishRef?: React.MutableRefObject<(() => void) | null>
}

const EXPLANATION_MODAL_DELAY = 1000
const CORRECT_ANSWER_DELAY = 1500

export const AnswerInterface = ({
  answerType,
  questionData,
  onAnswerSubmit,
  onNextQuestion,
  onShowExplanation,
  wrongAnswersCount = 0,
  isFinalTest = false,
  onPlaybackFinishRef
}: AnswerInterfaceProps) => {
  const [answerResult, setAnswerResult] = useState<{ selected: string; correct: boolean } | null>(null)
  const nextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showResult = answerResult !== null
  const isCorrect = answerResult?.correct ?? null
  const selectedAnswer = answerResult?.selected ?? null
  const showCorrectAnswer = answerResult !== null && !answerResult.correct
  const correctAnswerStr = typeof questionData.correctAnswer === 'string' ? questionData.correctAnswer : ''

  useEffect(() => {
    if (answerResult === null) return

    const { correct } = answerResult

    if (!correct && !isFinalTest) {
      const timer = setTimeout(() => onShowExplanation?.(), EXPLANATION_MODAL_DELAY)
      return () => clearTimeout(timer)
    }
  }, [answerResult, isFinalTest, onShowExplanation])

  useEffect(() => {
    if (answerResult === null) return

    const { correct } = answerResult
    if (!correct && !isFinalTest) return

    const totalWrong = wrongAnswersCount + (correct ? 0 : 1)
    const shouldBlock = isFinalTest && !correct && totalWrong >= FINAL_TEST_FAILURE_THRESHOLD

    if (shouldBlock) return

    const timer = setTimeout(() => {
      nextTimerRef.current = null
      onNextQuestion()
    }, CORRECT_ANSWER_DELAY)
    nextTimerRef.current = timer
    return () => {
      clearTimeout(timer)
      nextTimerRef.current = null
    }
  }, [answerResult, wrongAnswersCount, isFinalTest, onNextQuestion])

  const handleSkipDelay = () => {
    if (nextTimerRef.current !== null) {
      clearTimeout(nextTimerRef.current)
      nextTimerRef.current = null
      onNextQuestion()
    }
  }

  const handleAnswer = (answer: string, correct: boolean) => {
    if (answerResult !== null) return
    setAnswerResult({ selected: answer, correct })
    if (correct) playSuccessSound()
    else playErrorSound()
    onAnswerSubmit(correct)
  }

  const handleChoiceSelect = (choice: string) => {
    handleAnswer(choice, choice === correctAnswerStr)
  }

  const handleKeyPress = (key: string) => {
    handleAnswer(key, isEnharmonicEquivalent(key, correctAnswerStr))
  }

  const playbackInterface = questionData.questionInterface?.type === 'playback' ? questionData.questionInterface : undefined

  const handleRhythmTapSubmit = (userTimestamps: number[]) => {
    const correctAnswer = questionData.correctAnswer as number[]
    let isCorrect = false

    const isPulseExercise = playbackInterface?.audioFile && !playbackInterface?.rhythm
    const isRhythmExercise = playbackInterface?.rhythm && !playbackInterface?.audioFile

    if (isPulseExercise) {
      isCorrect = comparePulsePattern(userTimestamps, correctAnswer)
    } else if (isRhythmExercise) {
      isCorrect = compareRhythmPattern(userTimestamps, correctAnswer)
    }

    handleAnswer(userTimestamps.join(','), isCorrect)
  }

  const rhythmDuration = useMemo(() => {
    if (playbackInterface?.rhythm) {
      const totalDuration = playbackInterface.rhythm.reduce((sum, dur) => sum + dur, 0)
      const tempo = playbackInterface.tempo || 90
      const beatDuration = 60 / tempo
      return (totalDuration * beatDuration * 1000) + 1000
    }
    return undefined
  }, [playbackInterface])

  const renderAnswerComponent = () => {
    switch (answerType) {
      case ANSWER_TYPE.MULTIPLE_CHOICE:
        return (
          <MultipleChoice
            testID={`correct-answer-${correctAnswerStr}`}
            choices={questionData.choices}
            correctAnswer={correctAnswerStr}
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
            correctAnswer={correctAnswerStr}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            showCorrectAnswer={showCorrectAnswer}
            onChoiceSelect={handleChoiceSelect}
            testID={`correct-answer-${correctAnswerStr}`}
          />
        )
      case ANSWER_TYPE.KEY_PRESS:
        return (
          <KeyPress
            correctKey={correctAnswerStr}
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
            tempo={playbackInterface?.tempo}
            questionInterface={playbackInterface}
            onPlaybackFinishRef={onPlaybackFinishRef}
          />
        )
      default:
        return <Text>Unknown question type</Text>
    }
  }

  const canSkip = showResult && (isCorrect ?? false)

  return (
    <Pressable onPress={canSkip ? handleSkipDelay : undefined}>
      <AnswerInterfaceContainer>
        {renderAnswerComponent()}
      </AnswerInterfaceContainer>
    </Pressable>
  )
}

