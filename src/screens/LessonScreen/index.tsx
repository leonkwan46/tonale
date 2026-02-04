import { storeRevisionQuestionsFn } from '@/config/firebase/functions/revisionQuestions'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useProgress, useSafeNavigation } from '@/hooks'
import { getAllAuralStages, getAuralLessonWithProgress } from '@/subjects/aural/curriculum/stages/helpers'
import { generateAuralQuestions } from '@/subjects/aural/exercises/generate'
import { getNextLockedStage } from '@/subjects/curriculumHelper'
import { getTheoryLessonWithProgress, stagesArray as theoryStagesArray } from '@/subjects/theory/curriculum/stages/helpers'
import { generateLessonQuestions } from '@/subjects/theory/exercises/generate'
import { playLessonFailedSound, playLessonFinishedSound } from '@/utils/soundUtils'
import { calculateStars } from '@/utils/starCalculation'
import type { Question, StoreRevisionQuestionPayload } from '@types'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import { FinalTestFailureModal } from './components/FinalTestFailureModal'
import { FinalTestSuccessModal } from './components/FinalTestSuccessModal'
import { LessonHeader } from './components/LessonHeader'
import { StarRatingModal } from './components/StarRatingModal'
import { LessonScreenBody } from './LessonScreenBody'

export const LessonScreen = () => {
  const { navigate, navigateBack } = useSafeNavigation()
  const { lessonId, from } = useLocalSearchParams<{ lessonId: string, from: string }>()
  const { progressData, updateFinalTestProgress, updateLessonProgress, trackLessonAccessLocal, refreshRevisionQuestions } = useProgress()
  
  // Get lesson - try aural first, then theory
  const getLesson = useCallback((id: string) => {
    if (id.startsWith('aural-')) {
      return getAuralLessonWithProgress(id, progressData)
    }
    return getTheoryLessonWithProgress(id, progressData)
  }, [progressData])
  
  const lesson = lessonId ? getLesson(lessonId) : null
  
  const generateQuestions = useCallback((lessonData: typeof lesson): Question[] => {
    if (!lessonData || !lessonData.exerciseConfig) return []

    // Detect aural lessons by ID prefix
    const isAuralLesson = lessonData.id.startsWith('aural-')

    if (isAuralLesson) {
      return generateAuralQuestions(lessonData.exerciseConfig)
    }

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
  const [showSuccessModal, setShowSuccessModal] = useState(false)
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
    
    const questions: StoreRevisionQuestionPayload[] = wrongAnswers.map(question => {
      const payload: StoreRevisionQuestionPayload = {
        id: question.id,
        lessonId,
        question: question.question,
        correctAnswer: question.correctAnswer,
        choices: question.choices,
        type: question.type,
        correctCount: 0
      }
      
      // Convert Explanation object to string (Firebase expects string)
      if (question.explanation) {
        payload.explanation = typeof question.explanation === 'string' 
          ? question.explanation 
          : question.explanation.text
      }
      if (question.visualComponent) {
        payload.visualComponent = question.visualComponent
      }
      // Only include questionInterface for rhythmTap questions
      if (question.type === 'rhythmTap' && question.questionInterface) {
        payload.questionInterface = question.questionInterface
      }
      
      return payload
    })
    
    try {
      await storeRevisionQuestionsFn({ questions })
      await refreshRevisionQuestions()
    } catch (error) {
      console.error('Failed to store revision questions:', error)
      // Log the actual error details if available
      if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
      }
    }
  }, [lessonId, wrongAnswers, refreshRevisionQuestions])

  const completeLesson = useCallback(async () => {
    if (isCompleting) return // Prevent duplicate calls
    setIsCompleting(true)
    
    if (lesson?.isFinalTest) {
      // Final test: pass/fail, show success modal or navigate back
      const isPassed = wrongAnswers.length < 3
      
      if (lessonId) {
        await updateFinalTestProgress(lessonId, isPassed)
      }
      await storeRevisionQuestions()
      
      if (!isPassed) {
        navigateBack()
        return
      }
      
      playLessonFinishedSound()
      setShowSuccessModal(true)
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
    progressData,
    updateFinalTestProgress,
    updateLessonProgress,
    storeRevisionQuestions,
    navigate,
    navigateBack
  ])
  
  if (!lesson || questions.length === 0) return null

  const navigateAfterModal = () => {
    if (from === 'home') {
      navigate('/(tabs)/theory')
    } else {
      navigateBack()
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

  const closeSuccessModalAndContinue = () => {
    setShowSuccessModal(false)
    // Determine subject and check for unlocked stages
    const isAuralLesson = lessonId?.startsWith('aural-') ?? false
    const stages = isAuralLesson ? getAllAuralStages() : theoryStagesArray
    const nextLockedStage = getNextLockedStage(stages, progressData)
    
    if (nextLockedStage) {
      navigate(isAuralLesson ? '/(tabs)/aural' : '/(tabs)/theory')
    } else {
      navigateAfterModal()
    }
  }

  return (
    <ScreenContainer>
      <LessonHeader
        lesson={lesson}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        wrongAnswersCount={wrongAnswers.length}
        onBackPress={navigateBack}
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
      
      <StarRatingModal
        visible={showStarModal}
        stars={calculateStars(questions.length, wrongAnswers.length)}
        totalQuestions={questions.length}
        wrongAnswers={wrongAnswers.length}
        onContinue={closeModalAndExit}
        onRetry={closeModalAndRetry}
      />
      
      <FinalTestFailureModal
        visible={showFailureModal}
        onRetry={closeFailureModalAndRetry}
        onExit={closeFailureModalAndExit}
      />
      
      <FinalTestSuccessModal
        visible={showSuccessModal}
        onContinue={closeSuccessModalAndContinue}
      />
    </ScreenContainer>
  )
}
