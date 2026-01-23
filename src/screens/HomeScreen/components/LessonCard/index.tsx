import { useDevice, useLastLesson, useSafeNavigation } from '@/hooks'
import { CardButton } from '@/screens/TheoryScreen/components/LessonSection/components/CardButton/CardButton'
import { Description } from '@/screens/TheoryScreen/components/LessonSection/components/Description/Description'
import { Skeleton } from '@/sharedComponents/Skeleton'
import { useState } from 'react'
import { CardContentContainer, ContentSection, ContinueButton, ContinueButtonContainer, ContinueButtonDepth, ContinueButtonText, LessonCardContainer, NoLessonText } from './LessonCard.styles'

export const LessonCard = () => {
  const { lesson, loading, allCompleted } = useLastLesson()
  const { isNavigating, navigate } = useSafeNavigation()
  const isTablet = useDevice().isTablet
  const [isPressed, setIsPressed] = useState(false)

  if (loading) {
    return (
      <LessonCardContainer isLoading={true} testID="lesson-card-skeleton">
        <CardContentContainer>
          <Skeleton variant="square" width={isTablet ? 35 : 100} height={isTablet ? 35 : 100} />
          <ContentSection>
            <Skeleton variant="rectangle" height={isTablet ? 13 : 50} />
            <Skeleton variant="rectangle" height={isTablet ? 5 : 20} />
            <Skeleton variant="rectangle" height={isTablet ? 5 : 20} />
          </ContentSection>
        </CardContentContainer>
        <Skeleton variant="rectangle" height={isTablet ? 20 : 50} />
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
    navigate(`/lesson?lessonId=${lesson.id}&from=home`)
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
          disabled={isNavigating || lesson.isLocked}
        >
        <ContinueButtonText>Continue Lesson</ContinueButtonText>
      </ContinueButton>
      </ContinueButtonContainer>
    </LessonCardContainer>
  )
}

