import { generateLessonQuestions } from '@/data/questionGeneration/generateLessonQuestions'
import { getLessonById } from '@/data/theoryData'
import { Question } from '@/data/theoryData/types'
import { ScreenContainer } from '@/sharedComponents'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  BackButton,
  BackButtonText,
  Header
} from './LessonScreen.styles'
import { LessonScreenBody } from './LessonScreenBody'

export function LessonScreen() {
  const router = useRouter()
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>()
  const lesson = lessonId ? getLessonById(lessonId) : null
  const [questions, setQuestions] = useState<Question[]>([])
  
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
  
  if (!lesson || questions.length === 0) return null

  const handleBackPress = () => {
    router.back()
  }

  const handleLessonComplete = () => {
    // TODO: Handle lesson completion
    console.log('Lesson completed!')
  }

  return (
    <ScreenContainer>
      <Header>
        <BackButton onPress={handleBackPress}>
          <BackButtonText>Go Back</BackButtonText>
        </BackButton>
      </Header>
      
      <LessonScreenBody
        questions={questions}
        onLessonComplete={handleLessonComplete}
      />
    </ScreenContainer>
  )
}
