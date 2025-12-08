import { storeFailedQuestionsFn } from '@/config/firebase/functions/wrongQuestions'
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
  const { progressData, updateFinalTestProgress, updateLessonProgress, getLessonById, getNextLockedStage, trackLessonAccessLocal } = useProgress()
  const lesson = lessonId ? getLessonById(lessonId, progressData) : null
  
  const [questions, setQuestions] = useState<Question[]>(() => {
    if (!lesson) return []
    if (lessonId) {
      void trackLessonAccessLocal(lessonId)
    }
    return lesson.exerciseConfig 
      ? generateLessonQuestions(lesson.exerciseConfig)
      : lesson.questions || []
  })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([])
  const [showStarModal, setShowStarModal] = useState(false)
  const [showFailureModal, setShowFailureModal] = useState(false)
  const [earnedStars, setEarnedStars] = useState(0)
  
  const restartLesson = useCallback(() => {
    if (!lesson) return
    const newQuestions = lesson.exerciseConfig 
      ? generateLessonQuestions(lesson.exerciseConfig)
      : lesson.questions || []
    setCurrentQuestionIndex(0)
    setWrongQuestions([])
    setEarnedStars(0)
    setQuestions(newQuestions)
  }, [lesson])

  const onAnswerSubmit = useCallback((isCorrect: boolean) => {
    if (!isCorrect) {
      const currentQuestion = questions[currentQuestionIndex]
      if (currentQuestion) {
        setWrongQuestions(prev => {
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

  const storeWrongQuestions = useCallback(async () => {
    if (!lessonId || wrongQuestions.length === 0) return
    
    const questions = wrongQuestions.map(question => ({
      id: question.id,
      lessonId,
      question: question.question,
      correctAnswer: question.correctAnswer,
      choices: question.choices,
      explanation: question.explanation,
      type: question.type,
      visualComponent: question.visualComponent as Record<string, unknown> | undefined
    }))
    
    try {
      await storeFailedQuestionsFn({ questions })
    } catch (error) {
      console.error('Failed to store wrong questions:', error)
    }
  }, [lessonId, wrongQuestions])

  const completeFinalTest = useCallback(async () => {
    const isPassed = wrongQuestions.length < 3
    if (lessonId) {
      await updateFinalTestProgress(lessonId, isPassed)
    }
    
    await storeWrongQuestions()
    
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
  }, [wrongQuestions.length, lessonId, updateFinalTestProgress, router, storeWrongQuestions])
  
  const completeRegularLesson = useCallback(async () => {
    const stars = calculateStars(questions.length, wrongQuestions.length)
    setEarnedStars(stars)
    setShowStarModal(true)
    
    const soundToPlay = stars === 0 ? playLessonFailedSound : playLessonFinishedSound
    soundToPlay()
    
    if (lessonId) {
      await updateLessonProgress(lessonId, stars)
    }
    
    await storeWrongQuestions()
  }, [questions.length, wrongQuestions.length, lessonId, updateLessonProgress, storeWrongQuestions])

  const completeLesson = useCallback(async () => {
    if (lesson?.isFinalTest) {
      await completeFinalTest()
    } else {
      await completeRegularLesson()
    }
  }, [lesson?.isFinalTest, completeFinalTest, completeRegularLesson])
  
  if (!lesson || questions.length === 0) return null

  const navigateBack = () => {
    router.back()
  }

  const closeModalAndExit = () => {
    setShowStarModal(false)
    if (from === 'home') {
      router.push('/(tabs)/theory')
    } else {
      router.back()
    }
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
    if (from === 'home') {
      router.push('/(tabs)/theory')
    } else {
      router.back()
    }
  }

  return (
    <ScreenContainer>
      <LessonHeader
        lesson={lesson}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        wrongAnswersCount={wrongQuestions.length}
        onBackPress={navigateBack}
      />
      
      <LessonScreenBody
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        onAnswerSubmit={onAnswerSubmit}
        onNextQuestion={goToNextQuestion}
        onLessonComplete={completeLesson}
        wrongAnswersCount={wrongQuestions.length}
        isFinalTest={lesson?.isFinalTest || false}
      />
      
      {showStarModal && (
        <StarRatingModal
          stars={earnedStars}
          totalQuestions={questions.length}
          wrongAnswers={wrongQuestions.length}
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
