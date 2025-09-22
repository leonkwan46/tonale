import { generateLessonQuestions } from '@/data/questionGeneration/generateLessonQuestions'
import { getLessonById } from '@/data/theoryData'
import { Question } from '@/data/theoryData/types'
import { ScreenContainer } from '@/sharedComponents'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { LessonHeader } from './components'
import { LessonScreenBody } from './LessonScreenBody'

export function LessonScreen() {
  const router = useRouter()
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>()
  const lesson = lessonId ? getLessonById(lessonId) : null
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0)
  
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
      console.log('Test failed! Too many wrong answers.')
      router.back()
    }
  }, [wrongAnswersCount, lesson?.isFinalTest, router])
  
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

  const handleLessonComplete = () => {
    // TODO: Handle lesson completion
    console.log('Lesson completed!')
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
      />
    </ScreenContainer>
  )
}
