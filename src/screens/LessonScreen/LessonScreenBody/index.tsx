import type { Question } from '@types'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import { useDevice } from '../../../hooks'
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
  const currentQuestion = questions[currentQuestionIndex]
  const { title, questionInterface, answerInterface } = currentQuestion
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const [isAnswering, setIsAnswering] = useState(false)
  const [hasPlaybackStarted, setHasPlaybackStarted] = useState(false)
  const [hasPlaybackFinished, setHasPlaybackFinished] = useState(false)
  const onPlaybackFinishRef = useRef<(() => void) | null>(null)

  const isPulseExercise = questionInterface?.audioFile && !questionInterface?.rhythm && answerInterface === 'rhythmTap'
  const isRhythmExercise = questionInterface?.rhythm && !questionInterface?.audioFile && answerInterface === 'rhythmTap'

  useEffect(() => {
    setHasPlaybackStarted(false)
    setHasPlaybackFinished(false)
  }, [currentQuestion.id])

  const handleAnswerSubmitInternal = useCallback((isCorrect: boolean) => {
    onAnswerSubmit(isCorrect)
  }, [onAnswerSubmit])

  const handleNextQuestionInternal = useCallback(() => {
    setIsAnswering(false)
    if (isLastQuestion) {
      onLessonComplete?.()
    } else {
      onNextQuestion()
    }
  }, [isLastQuestion, onLessonComplete, onNextQuestion])

  const handleAnsweringStateChange = useCallback((isAnsweringState: boolean) => {
    setIsAnswering(isAnsweringState)
  }, [])

  const handlePlaybackStart = useCallback(() => {
    setHasPlaybackStarted(true)
  }, [])

  const handlePlaybackFinish = useCallback(() => {
    if (isRhythmExercise) {
      setHasPlaybackFinished(true)
    }
    onPlaybackFinishRef.current?.()
  }, [isRhythmExercise])

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
          key={`question-${currentQuestion.id}`}
          questionInterface={questionInterface}
          correctAnswer={currentQuestion.correctAnswer}
          answerInterface={answerInterface}
          isAnswering={isAnswering}
          onPlaybackFinish={handlePlaybackFinish}
          onPlaybackStart={isPulseExercise ? handlePlaybackStart : undefined}
        />
      )}
      
      <AnswerInterface 
        key={`answer-${currentQuestion.id}`}
        answerInterface={answerInterface}
        questionData={currentQuestion}
        onAnswerSubmit={handleAnswerSubmitInternal}
        onNextQuestion={handleNextQuestionInternal}
        wrongAnswersCount={wrongAnswersCount}
        isFinalTest={isFinalTest}
        onAnsweringStateChange={handleAnsweringStateChange}
        onPlaybackFinishRef={onPlaybackFinishRef}
        hasPlaybackStarted={
          isPulseExercise ? hasPlaybackStarted : 
          isRhythmExercise ? hasPlaybackFinished : 
          true
        }
      />
      
    </BodyContainer>
  )
}
