import { generateLessonQuestions } from '@/data/questionGeneration/generateLessonQuestions'
import { getLessonById } from '@/data/theoryData'
import { getNextLockedStage } from '@/data/theoryData/stages/stageDataHelpers'
import { forceRefreshProgress, updateFinalTestProgress, updateLessonProgress } from '@/data/theoryData/theoryDataHelpers'
import { Question } from '@/data/theoryData/types'
import { FinalTestFailureModal, ScreenContainer, StarRatingModal } from '@/sharedComponents'
import { calculateStars } from '@/utils/starCalculation'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { LessonHeader } from './components'
import { LessonScreenBody } from './LessonScreenBody'

export function LessonScreen() {
  const router = useRouter()
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>()
  const lesson = lessonId ? getLessonById(lessonId) : null
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0)
  const [showStarModal, setShowStarModal] = useState(false)
  const [showFailureModal, setShowFailureModal] = useState(false)
  const [earnedStars, setEarnedStars] = useState(0)
  
  // Generate questions when lesson loads
  useEffect(() => {
    if (lessonId) {
      const currentLesson = getLessonById(lessonId)
      if (currentLesson) {
        // Use auto-generated questions if available, otherwise use hardcoded questions
        if (currentLesson.exerciseConfig) {
          const generatedQuestions = generateLessonQuestions(currentLesson.exerciseConfig)
          setQuestions(generatedQuestions)
        } else if (currentLesson.questions) {
          setQuestions(currentLesson.questions)
        }
      }
    }
  }, [lessonId])

  // Check if test failed (3 wrong answers in final test)
  useEffect(() => {
    if (lesson?.isFinalTest && wrongAnswersCount >= 3) {
      setShowFailureModal(true)
    }
  }, [wrongAnswersCount, lesson?.isFinalTest])
  
  if (!lesson || questions.length === 0) return null

  const handleBackPress = () => {
    router.back()
  }

  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (!isCorrect) {
      setWrongAnswersCount(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handleLessonComplete = async () => {
    if (lesson?.isFinalTest) {
      const isPassed = wrongAnswersCount < 3
      
      if (lessonId) {
        await updateFinalTestProgress(lessonId, isPassed, wrongAnswersCount)
        await forceRefreshProgress()
      }
      
      if (isPassed) {
        const nextStage = getNextLockedStage()
        if (nextStage) {
          router.push('/(tabs)/theory')
        } else {
          router.back()
        }
      } else {
        router.back()
      }
    } else {
      const stars = calculateStars(questions.length, wrongAnswersCount)
      setEarnedStars(stars)
      setShowStarModal(true)
      
      if (lessonId) {
        await updateLessonProgress(lessonId, stars, wrongAnswersCount)
      }
    }
  }

  const handleModalContinue = async () => {
    setShowStarModal(false)
    await forceRefreshProgress()
    router.back()
  }

  const handleModalRetry = () => {
    setShowStarModal(false)
    setCurrentQuestionIndex(0)
    setWrongAnswersCount(0)
    setEarnedStars(0)
    
    if (lesson) {
      if (lesson.exerciseConfig) {
        const generatedQuestions = generateLessonQuestions(lesson.exerciseConfig)
        setQuestions(generatedQuestions)
      } else if (lesson.questions) {
        setQuestions(lesson.questions)
      }
    }
  }

  const handleFailureModalRetry = () => {
    setShowFailureModal(false)
    setCurrentQuestionIndex(0)
    setWrongAnswersCount(0)
    
    if (lesson) {
      if (lesson.exerciseConfig) {
        const generatedQuestions = generateLessonQuestions(lesson.exerciseConfig)
        setQuestions(generatedQuestions)
      } else if (lesson.questions) {
        setQuestions(lesson.questions)
      }
    }
  }

  const handleFailureModalExit = () => {
    setShowFailureModal(false)
    router.back()
  }

  return (
    <ScreenContainer>
      <LessonHeader
        lesson={lesson}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        wrongAnswersCount={wrongAnswersCount}
        onBackPress={handleBackPress}
      />
      
      <LessonScreenBody
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        onAnswerSubmit={handleAnswerSubmit}
        onNextQuestion={handleNextQuestion}
        onLessonComplete={handleLessonComplete}
        wrongAnswersCount={wrongAnswersCount}
        isFinalTest={lesson?.isFinalTest || false}
      />
      
      {/* Star Rating Modal */}
      {showStarModal && (
        <StarRatingModal
          stars={earnedStars}
          totalQuestions={questions.length}
          wrongAnswers={wrongAnswersCount}
          onContinue={handleModalContinue}
          onRetry={handleModalRetry}
        />
      )}
      
      {/* Final Test Failure Modal */}
      {showFailureModal && (
        <FinalTestFailureModal
          onRetry={handleFailureModalRetry}
          onExit={handleFailureModalExit}
        />
      )}
    </ScreenContainer>
  )
}
