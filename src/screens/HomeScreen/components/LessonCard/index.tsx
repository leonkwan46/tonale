import { useLastLesson } from '@/hooks'
import { CardButton } from '@/screens/TheoryScreen/components/LessonSection/components/CardButton/CardButton'
import { Description } from '@/screens/TheoryScreen/components/LessonSection/components/Description/Description'
import { Loading } from '@/sharedComponents'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { CardContentContainer, ContinueButton, ContinueButtonContainer, ContinueButtonDepth, ContinueButtonText, LessonCardContainer, NoLessonText } from './LessonCard.styles'

export const LessonCard = () => {
  const { lesson, loading, allCompleted } = useLastLesson()
  const router = useRouter()
  const [isPressed, setIsPressed] = useState(false)

  if (loading) {
    return (
      <LessonCardContainer>
        <CardContentContainer>
          <Loading size="large" />
        </CardContentContainer>
      </LessonCardContainer>
    )
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
    return (
      <LessonCardContainer>
        <CardContentContainer>
          <NoLessonText>Sorry, no lesson found here</NoLessonText>
        </CardContentContainer>
      </LessonCardContainer>
    )
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

