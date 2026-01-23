import { useDevice, useLastLesson, useSafeNavigation } from '@/hooks'
import { Description } from '@/screens/TheoryScreen/components/LessonSection/components/Description/Description'
import { BeamedQuaverLogo } from '@/screens/TheoryScreen/components/LessonSection/components/Logo/BeamedQuaverLogo'
import { LockLogo } from '@/screens/TheoryScreen/components/LessonSection/components/Logo/LockLogo'
import { StarLogo } from '@/screens/TheoryScreen/components/LessonSection/components/Logo/StarLogo'
import { Button3D } from '@/sharedComponents/Button3D'
import { Card3DView } from '@/sharedComponents/Card3DView'
import { Skeleton } from '@/sharedComponents/Skeleton'
import { useTheme } from '@emotion/react'
import { CardContentContainer, ContinueButtonText, LessonCardContainer, NoLessonText, SkeletonContentSection, StarContainer } from './LessonCard.styles'

export const LessonCard = () => {
  const { lesson, loading, allCompleted } = useLastLesson()
  const { isNavigating, navigate } = useSafeNavigation()
  const isTablet = useDevice().isTablet
  const theme = useTheme()
  const cardSize = theme.components.cardButton.size

  if (loading) {
    return (
      <LessonCardContainer isLoading={true} testID="lesson-card-skeleton">
        <CardContentContainer>
          <Skeleton variant="square" width={isTablet ? 35 : 100} height={isTablet ? 35 : 100} />
          <SkeletonContentSection>
            <Skeleton variant="rectangle" height={isTablet ? 13 : 50} />
            <Skeleton variant="rectangle" height={isTablet ? 5 : 20} />
            <Skeleton variant="rectangle" height={isTablet ? 5 : 20} />
          </SkeletonContentSection>
        </CardContentContainer>
        <Skeleton variant="rectangle" height={isTablet ? 20 : 50} />
      </LessonCardContainer>
    )
  }

  if (allCompleted) {
    return (
      <LessonCardContainer>
        <CardContentContainer>
          <Card3DView color="green" size={cardSize}>
            <BeamedQuaverLogo />
            <StarContainer>
              <StarLogo filled={true} />
              <StarLogo filled={true} />
              <StarLogo filled={true} />
            </StarContainer>
          </Card3DView>
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

  const cardColor = lesson.isLocked ? 'grey' : 'blue'

  return (
    <LessonCardContainer>
      <CardContentContainer>
        <Card3DView color={cardColor} size={cardSize}>
          {lesson.isLocked ? (
            <LockLogo />
          ) : (
            <>
              <BeamedQuaverLogo />
              <StarContainer>
                <StarLogo filled={(lesson.stars ?? 0) >= 1} />
                <StarLogo filled={(lesson.stars ?? 0) >= 2} />
                <StarLogo filled={(lesson.stars ?? 0) >= 3} />
              </StarContainer>
            </>
          )}
        </Card3DView>
        <Description title={lesson.title} description={lesson.description} />
      </CardContentContainer>
      <Button3D
        onPress={handleContinuePress}
        disabled={isNavigating || lesson.isLocked}
        testID="continue-lesson-button"
        fullWidth={true}
      >
        {() => (
          <ContinueButtonText>Continue Lesson</ContinueButtonText>
        )}
      </Button3D>
    </LessonCardContainer>
  )
}

