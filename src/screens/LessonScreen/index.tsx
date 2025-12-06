import { FinalTestFailureModal, ScreenContainer, StarRatingModal } from '@/sharedComponents'
import { getLessonById, getNextLockedStage, trackLessonAccessLocal } from '@/utils/lesson'
import { updateFinalTestProgress, updateLessonProgress } from '@/utils/userProgress'
import { Question } from '@/theory/curriculum/types'
import { generateLessonQuestions } from '@/theory/exercises/generate'
import { playLessonFailedSound, playLessonFinishedSound } from '@/utils/soundUtils'
import { calculateStars } from '@/utils/starCalculation'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { LessonHeader } from './components'
import { LessonScreenBody } from './LessonScreenBody'

export function LessonScreen() {
  const router = useRouter()
  const { lessonId, from } = useLocalSearchParams<{ lessonId: string, from: string }>()
  const lesson = lessonId ? getLessonById(lessonId) : null
  
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0)
  const [showStarModal, setShowStarModal] = useState(false)
  const [showFailureModal, setShowFailureModal] = useState(false)
  const [earnedStars, setEarnedStars] = useState(0)
  
  useEffect(() => {
    if (!lessonId) return
    
    const currentLesson = getLessonById(lessonId)
    if (!currentLesson) return
    
    const newQuestions = currentLesson.exerciseConfig 
      ? generateLessonQuestions(currentLesson.exerciseConfig)
      : currentLesson.questions || []
    
    setQuestions(newQuestions)
    setCurrentQuestionIndex(0)
    setWrongAnswersCount(0)
    
    // Track lesson access locally
    trackLessonAccessLocal(lessonId)
  }, [lessonId])
  
  const restartLesson = useCallback(() => {
    if (!lesson) return
    const newQuestions = lesson.exerciseConfig 
      ? generateLessonQuestions(lesson.exerciseConfig)
      : lesson.questions || []
    setCurrentQuestionIndex(0)
    setWrongAnswersCount(0)
    setEarnedStars(0)
    setQuestions(newQuestions)
  }, [lesson])

  const onAnswerSubmit = useCallback((isCorrect: boolean) => {
    if (!isCorrect) {
      const newWrongCount = wrongAnswersCount + 1
      setWrongAnswersCount(newWrongCount)
      
      if (lesson?.isFinalTest && newWrongCount >= 3) {
        setShowFailureModal(true)
      }
    }
  }, [wrongAnswersCount, lesson?.isFinalTest])

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }, [currentQuestionIndex, questions.length])

  const completeFinalTest = useCallback(() => {
    const isPassed = wrongAnswersCount < 3
    if (lessonId) updateFinalTestProgress(lessonId, isPassed)
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
  }, [wrongAnswersCount, lessonId, router])
  
  const completeRegularLesson = useCallback(() => {
    const stars = calculateStars(questions.length, wrongAnswersCount)
    setEarnedStars(stars)
    setShowStarModal(true)
    
    const soundToPlay = stars === 0 ? playLessonFailedSound : playLessonFinishedSound
    soundToPlay()
    
    if (lessonId) updateLessonProgress(lessonId, stars)
  }, [questions.length, wrongAnswersCount, lessonId])

  const completeLesson = useCallback(() => {
    if (lesson?.isFinalTest) {
      completeFinalTest()
    } else {
      completeRegularLesson()
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
        wrongAnswersCount={wrongAnswersCount}
        onBackPress={navigateBack}
      />
      
      <LessonScreenBody
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        onAnswerSubmit={onAnswerSubmit}
        onNextQuestion={goToNextQuestion}
        onLessonComplete={completeLesson}
        wrongAnswersCount={wrongAnswersCount}
        isFinalTest={lesson?.isFinalTest || false}
      />
      
      {showStarModal && (
        <StarRatingModal
          stars={earnedStars}
          totalQuestions={questions.length}
          wrongAnswers={wrongAnswersCount}
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
