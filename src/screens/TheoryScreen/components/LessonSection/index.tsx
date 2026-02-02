import { useSafeNavigation } from '@/hooks'
import { Card } from '@/sharedComponents/Card'
import { useTheme } from '@emotion/react'
import type { Lesson } from '@types'
import { useState } from 'react'
import { Description } from './components/Description/Description'
import { FinalTestButton } from './components/FinalTestButton/FinalTestButton'
import { BeamedQuaverLogo } from './components/Logo/BeamedQuaverLogo'
import { LockLogo } from './components/Logo/LockLogo'
import { StarLogo } from './components/Logo/StarLogo'
import { WarningModal } from './components/WarningModal'
import { LessonSectionContainer, StarContainer } from './LessonSection.styles'

interface LessonSectionProps {
  index: number
  lesson: Lesson
  allStageLessons?: Lesson[]
}

export const LessonSection = ({ index, lesson, allStageLessons = [] }: LessonSectionProps) => {
  const { isNavigating, navigate } = useSafeNavigation()
  const [showWarningModal, setShowWarningModal] = useState(false)
  const theme = useTheme()
  const cardSize = theme.components.cardButton.size
  const cardColor = lesson.isLocked ? 'grey' : 'blue'
  
  const renderCard = () => (
    <Card key="card" color={cardColor} size={cardSize}>
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
    </Card>
  )
  
  const components = (isPressed: boolean) => index % 2 === 0 && !lesson.isFinalTest
    ? [
    renderCard(), 
    <Description key="desc" title={lesson.title} description={lesson.description} />
    ]
    : [
    <Description key="desc" title={lesson.title} description={lesson.description} />, 
    renderCard()
    ]

  const checkForZeroStarLessons = () => {
    return allStageLessons.some(stageLesson => 
      !stageLesson.isFinalTest && (stageLesson.stars || 0) < 1
    )
  }

  const handlePress = () => {
    if (isNavigating) return
    
    if (lesson.isFinalTest) {
      // Check if any lesson in the stage has 0 stars
      if (checkForZeroStarLessons()) {
        setShowWarningModal(true)
      } else {
        navigate(`/lesson?lessonId=${lesson.id}`)
      }
    } else {
      if (lesson.isLocked) return
      navigate(`/lesson?lessonId=${lesson.id}`)
    }
  }

  const handleContinueToFinalTest = () => {
    setShowWarningModal(false)
    navigate(`/lesson?lessonId=${lesson.id}`)
  }

  const handleCancelFinalTest = () => {
    setShowWarningModal(false)
  }

  return (
    <>
      {lesson.isFinalTest ? (
        <FinalTestButton
          key="final"
          title={lesson.title}
          description={lesson.description}
          onPress={handlePress}
          disabled={isNavigating}
          testID={`lesson-title-${lesson.id}`}
        />
      ) : (
        <LessonSectionContainer 
          onPress={handlePress}
          testID={`lesson-title-${lesson.id}`}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${lesson.title} lesson`}
          disabled={lesson.isLocked || isNavigating}
        >
          {({ pressed }: { pressed: boolean }) => components(pressed)}
        </LessonSectionContainer>
      )}
      
      <WarningModal
        isVisible={showWarningModal}
        onContinue={handleContinueToFinalTest}
        onCancel={handleCancelFinalTest}
        title="Final Test Warning"
        description="Some lessons in this stage don't have any stars yet. Are you sure you want to take the final test?"
      />
    </>
  )
}
