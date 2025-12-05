import { useLastLesson } from '@/hooks'
import { CardButton, Description } from '@/screens/TheoryScreen/components/LessonSection/components'
import { useRouter } from 'expo-router'
import * as React from 'react'
import { useState } from 'react'
import { CardContentContainer, ContinueButton, ContinueButtonContainer, ContinueButtonDepth, ContinueButtonText, LessonCardContainer } from './LessonCard.styles'

export const LessonCard: React.FC = () => {
  const { lesson, loading, allCompleted } = useLastLesson()
  const router = useRouter()
  const [isPressed, setIsPressed] = useState(false)

  if (loading) {
    return null
  }

  if (allCompleted) {
    return (
      <LessonCardContainer>
        <CardContentContainer>
          <CardButton isLocked={false} isPressed={false} stars={3} isCompleted={true} />
          <Description title="All Lessons Completed" description="You have completed all lesson" />
        </CardContentContainer>
      </LessonCardContainer>
    )
  }

  if (!lesson) {
    return null
  }

  const handleContinuePress = () => {
    router.push(`/lesson?lessonId=${lesson.id}&from=home`)
  }

  return (
    <LessonCardContainer>
      <CardContentContainer>
        <CardButton isLocked={lesson.isLocked} isPressed={false} stars={lesson.stars} />
        <Description title={lesson.title} description={lesson.description} />
      </CardContentContainer>
      <ContinueButtonContainer isPressed={isPressed}>
        <ContinueButtonDepth />
        <ContinueButton 
          onPress={handleContinuePress}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
        <ContinueButtonText>Continue Lesson</ContinueButtonText>
      </ContinueButton>
      </ContinueButtonContainer>
    </LessonCardContainer>
  )
}

