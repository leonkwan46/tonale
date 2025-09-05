import { generateQuestionsForLesson } from '@/data/questionGeneration/generateLessonQuestions'
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
import { AnswerInterface } from './components/AnswerInterface'
import { MusicStaff } from './components/MusicStaff'

export function LessonScreen() {
  const router = useRouter()
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>()
  const lesson = lessonId ? getLessonById(lessonId) : null
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  
  // Generate questions when lesson loads
  useEffect(() => {
    if (lessonId) {
      const currentLesson = getLessonById(lessonId)
      if (currentLesson) {
        // Use auto-generated questions if available, otherwise use hardcoded questions
        if (currentLesson.exerciseConfig) {
          const generatedQuestions = generateQuestionsForLesson(lessonId)
          setQuestions(generatedQuestions)
        } else if (currentLesson.questions) {
          setQuestions(currentLesson.questions)
        }
      }
    }
  }, [lessonId])
  
  if (!lesson || questions.length === 0) return null

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleBackPress = () => {
    router.back()
  }

  const handleAnswerSubmit = (isCorrect: boolean) => {
    // AnswerInterface now handles the timing and progression
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Lesson completed
      // TODO: Handle lesson completion
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  return (
    <ScreenContainer>
      <Header>
        <BackButton onPress={handleBackPress}>
          <BackButtonText>Go Back</BackButtonText>
        </BackButton>
      </Header>

      <MusicStaff />

      <AnswerInterface 
        questionType={currentQuestion.type}
        questionData={currentQuestion}
        onAnswerSubmit={handleAnswerSubmit}
        onNextQuestion={handleNextQuestion}
      />
    </ScreenContainer>
  )
}
