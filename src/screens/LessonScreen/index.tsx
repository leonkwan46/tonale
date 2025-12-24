import { storeRevisionQuestionsFn } from '@/config/firebase/functions/revisionQuestions'
import { useProgress } from '@/hooks'
import { FinalTestFailureModal, ScreenContainer, StarRatingModal } from '@/sharedComponents'
import { generateLessonQuestions } from '@/theory/exercises/generate'
import { playLessonFailedSound, playLessonFinishedSound } from '@/utils/soundUtils'
import { calculateStars } from '@/utils/starCalculation'
import type { Question } from '@types'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { LessonHeader } from './components'
import { LessonScreenBody } from './LessonScreenBody'

export function LessonScreen() {
  const router = useRouter()
  const { lessonId, from } = useLocalSearchParams<{ lessonId: string, from: string }>()
  const { progressData, updateFinalTestProgress, updateLessonProgress, getLessonById, getNextLockedStage, trackLessonAccessLocal, refreshRevisionQuestions } = useProgress()
  const lesson = lessonId ? getLessonById(lessonId, progressData) : null
  
  const generateQuestions = useCallback((lessonData: typeof lesson): Question[] => {
    if (!lessonData || !lessonData.exerciseConfig) return []
    return generateLessonQuestions(lessonData.exerciseConfig)
  }, [])
  
  const [questions, setQuestions] = useState<Question[]>(() => {
    if (!lesson || !lessonId) return []
    void trackLessonAccessLocal(lessonId)
    return generateQuestions(lesson)
  })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState<Question[]>([])
  const [showStarModal, setShowStarModal] = useState(false)
  const [showFailureModal, setShowFailureModal] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  
  const restartLesson = useCallback(() => {
    if (!lesson) return
    setCurrentQuestionIndex(0)
    setWrongAnswers([])
    setQuestions(generateQuestions(lesson))
    setIsCompleting(false)
  }, [lesson, generateQuestions])

  const onAnswerSubmit = useCallback((isCorrect: boolean) => {
    if (!isCorrect) {
      const currentQuestion = questions[currentQuestionIndex]
      if (currentQuestion) {
        setWrongAnswers(prev => {
          // Prevent duplicate entries for the same question
          const alreadyExists = prev.some(q => q.id === currentQuestion.id)
          if (alreadyExists) return prev
          
          const updated = [...prev, currentQuestion]
          
          if (lesson?.isFinalTest && updated.length >= 3) {
            setShowFailureModal(true)
          }
          
          return updated
        })
      }
    }
  }, [questions, currentQuestionIndex, lesson?.isFinalTest])

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }, [currentQuestionIndex, questions.length])

  const storeRevisionQuestions = useCallback(async () => {
    if (!lessonId || wrongAnswers.length === 0) return
    
    const questions = wrongAnswers.map(question => ({
      id: question.id,
      lessonId,
      question: question.question,
      correctAnswer: question.correctAnswer,
      choices: question.choices,
      explanation: question.explanation,
      type: question.type,
      visualComponent: question.visualComponent as Record<string, unknown> | undefined,
      correctCount: 0
    }))
    
    try {
      await storeRevisionQuestionsFn({ questions })
      await refreshRevisionQuestions()
    } catch (error) {
      console.error('Failed to store revision questions:', error)
    }
  }, [lessonId, wrongAnswers, refreshRevisionQuestions])

  const completeLesson = useCallback(async () => {
    if (isCompleting) return // Prevent duplicate calls
    setIsCompleting(true)
    
    if (lesson?.isFinalTest) {
      // Final test: pass/fail, no stars, immediate navigation
      const isPassed = wrongAnswers.length < 3
      
      if (lessonId) {
        await updateFinalTestProgress(lessonId, isPassed)
      }
      await storeRevisionQuestions()
      
      if (!isPassed) {
        router.back()
        return
      }
      
      playLessonFinishedSound()
      const hasUnlockedNewStage = getNextLockedStage()
      if (hasUnlockedNewStage) {
        router.push('/(tabs)/theory')
      } else {
        router.back()
      }
    } else {
      // Regular lesson: stars, modal, user can retry/continue
      const stars = calculateStars(questions.length, wrongAnswers.length)
      setShowStarModal(true)
      
      const soundToPlay = stars === 0 ? playLessonFailedSound : playLessonFinishedSound
      soundToPlay()
      
      if (lessonId) {
        await updateLessonProgress(lessonId, stars)
      }
      await storeRevisionQuestions()
    }
  }, [
    isCompleting,
    lesson?.isFinalTest,
    wrongAnswers.length,
    lessonId,
    questions.length,
    updateFinalTestProgress,
    updateLessonProgress,
    storeRevisionQuestions,
    router,
    getNextLockedStage
  ])
  
  if (!lesson || questions.length === 0) return null

  const navigateAfterModal = () => {
    if (from === 'home') {
      router.push('/(tabs)/theory')
    } else {
      router.back()
    }
  }

  const closeModalAndExit = () => {
    setShowStarModal(false)
    navigateAfterModal()
  }

  const closeModalAndRetry = () => {
    setShowStarModal(false)
    restartLesson()
  }

  const closeFailureModalAndRetry = () => {
    setShowFailureModal(false)
    restartLesson()
  }

  const closeFailureModalAndExit = () => {
    setShowFailureModal(false)
    navigateAfterModal()
  }

  return (
    <ScreenContainer>
      <LessonHeader
        lesson={lesson}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        wrongAnswersCount={wrongAnswers.length}
        onBackPress={() => router.back()}
      />
      
      <LessonScreenBody
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        onAnswerSubmit={onAnswerSubmit}
        onNextQuestion={goToNextQuestion}
        onLessonComplete={completeLesson}
        wrongAnswersCount={wrongAnswers.length}
        isFinalTest={lesson?.isFinalTest || false}
      />
      
      {showStarModal && (
        <StarRatingModal
          stars={calculateStars(questions.length, wrongAnswers.length)}
          totalQuestions={questions.length}
          wrongAnswers={wrongAnswers.length}
          onContinue={closeModalAndExit}
          onRetry={closeModalAndRetry}
        />
      )}
      
      {showFailureModal && (
        <FinalTestFailureModal
          onRetry={closeFailureModalAndRetry}
          onExit={closeFailureModalAndExit}
        />
      )}
    </ScreenContainer>
  )
}
