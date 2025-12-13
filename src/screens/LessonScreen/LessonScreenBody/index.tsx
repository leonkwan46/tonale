import type { Question } from '@types'
import { createAudioPlayer } from 'expo-audio'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import { useDevice, usePlayer } from '../../../hooks'
import { AnswerInterface } from '../components/AnswerInterface'
import { QuestionInterface } from '../components/QuestionInterface'
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

export const LessonScreenBody: FC<LessonScreenBodyProps> = ({
  questions,
  currentQuestionIndex,
  onAnswerSubmit,
  onNextQuestion,
  onLessonComplete,
  wrongAnswersCount = 0,
  isFinalTest = false
}) => {
  const { isTablet } = useDevice()
  const { play, stop, isPlaying } = usePlayer()
  const currentQuestion = questions[currentQuestionIndex]
  const { title, questionInterface, answerInterface } = currentQuestion
  const rhythmPattern = answerInterface === 'rhythmTap' && Array.isArray(currentQuestion.correctAnswer)
    ? currentQuestion.correctAnswer
    : undefined
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const clapTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const [isPlayingClaps, setIsPlayingClaps] = useState(false)
  const [shouldStartMetronome, setShouldStartMetronome] = useState(false)

  const isNoteIdentification = questionInterface?.clef && 
    questionInterface?.elements && 
    questionInterface.elements.length > 0 &&
    questionInterface.elements.some(element => element.pitch)

  const isRhythmTapQuestion = answerInterface === 'rhythmTap'
  const isRhythmQuestion = questionInterface?.rhythmMelody !== undefined || isRhythmTapQuestion
  const rhythmMelody = questionInterface?.rhythmMelody

  useEffect(() => {
    setShouldStartMetronome(false)
    return () => {
      clapTimeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      clapTimeoutsRef.current = []
    }
  }, [currentQuestionIndex])

  const playClapSound = useCallback(async () => {
    try {
      const clapSound = require('../../../../assets/sounds/clap.mp3')
      const player = createAudioPlayer(clapSound)
      player.volume = 0.8
      await player.play()
      
      // Clean up the player after it finishes playing
      player.addListener('playbackStatusUpdate', (status) => {
        if (status.isLoaded && status.didJustFinish) {
          player.remove()
        }
      })
    } catch (error) {
      console.warn('Could not play clap sound:', error)
    }
  }, [])

  const handlePlayRhythm = useCallback(async () => {
    clapTimeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    clapTimeoutsRef.current = []

    if (isRhythmTapQuestion && rhythmPattern) {
      setIsPlayingClaps(true)
      setShouldStartMetronome(true)
      
      rhythmPattern.forEach((timestamp) => {
        const timeout = setTimeout(() => {
          void playClapSound()
        }, timestamp * 1000)
        clapTimeoutsRef.current.push(timeout)
      })

      const lastTimestamp = rhythmPattern[rhythmPattern.length - 1] || 0
      const finalTimeout = setTimeout(() => {
        setIsPlayingClaps(false)
        setShouldStartMetronome(false)
      }, (lastTimestamp + 0.5) * 1000)
      clapTimeoutsRef.current.push(finalTimeout)
    } else if (rhythmMelody) {
    await stop()
    await play(rhythmMelody, { instrument: 'acoustic_grand_piano', tempo: 120 })
    }
  }, [isRhythmTapQuestion, rhythmPattern, rhythmMelody, playClapSound, play, stop])

  const handleAnswerSubmitInternal = useCallback((isCorrect: boolean) => {
    onAnswerSubmit(isCorrect)
  }, [onAnswerSubmit])

  const handleNextQuestionInternal = useCallback(() => {
    if (isLastQuestion) {
      onLessonComplete?.()
    } else {
      onNextQuestion()
    }
  }, [isLastQuestion, onLessonComplete, onNextQuestion])

  if (questions.length === 0) return null

  return (
    <BodyContainer>
      <QuestionText 
        testID="question-text"
        isTablet={isTablet}
      >
        {title}
      </QuestionText>

      {questionInterface && (
        <QuestionInterface 
          questionInterface={questionInterface}
          onPlaybackPress={isRhythmQuestion ? handlePlayRhythm : undefined}
          isPlaying={isPlaying || isPlayingClaps}
        />
      )}
      
      <AnswerInterface 
        answerInterface={answerInterface}
        questionData={currentQuestion}
        onAnswerSubmit={handleAnswerSubmitInternal}
        onNextQuestion={handleNextQuestionInternal}
        isNoteIdentification={isNoteIdentification}
        wrongAnswersCount={wrongAnswersCount}
        isFinalTest={isFinalTest}
        shouldStartMetronome={shouldStartMetronome}
      />
      
    </BodyContainer>
  )
}
