import { useSafeNavigation } from '@/hooks'
import type { Lesson } from '@types'
import { useState } from 'react'
import { CardButton } from './components/CardButton/CardButton'
import { Description } from './components/Description/Description'
import { FinalTest } from './components/FinalTest/FinalTest'
import { WarningModal } from './components/WarningModal'
import { LessonSectionContainer } from './LessonSection.styles'

interface LessonSectionProps {
  index: number
  lesson: Lesson
  allStageLessons?: Lesson[]
}

export const LessonSection = ({ index, lesson, allStageLessons = [] }: LessonSectionProps) => {
  const { isNavigating, navigate } = useSafeNavigation()
  const [showWarningModal, setShowWarningModal] = useState(false)
  
  const components = (isPressed: boolean) => index % 2 === 0 && !lesson.isFinalTest
    ? [
    <CardButton key="card" isPressed={isPressed} isLocked={lesson.isLocked} stars={lesson.stars} />, 
    <Description key="desc" title={lesson.title} description={lesson.description} />
    ]
    : [
    <Description key="desc" title={lesson.title} description={lesson.description} />, 
    <CardButton key="card" isPressed={isPressed} isLocked={lesson.isLocked} stars={lesson.stars} />
    ]

  const checkForZeroStarLessons = () => {
    return allStageLessons.some(stageLesson => 
      !stageLesson.isFinalTest && (stageLesson.stars || 0) < 1
    )
  }

  const handlePress = () => {
    if (isNavigating || lesson.isLocked) return
    
    if (lesson.isFinalTest) {
      // Check if any lesson in the stage has 0 stars
      if (checkForZeroStarLessons()) {
        setShowWarningModal(true)
      } else {
        navigate(`/lesson?lessonId=${lesson.id}`)
      }
    } else {
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
      <LessonSectionContainer 
        onPress={handlePress}
        testID={`lesson-title-${lesson.id}`}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${lesson.title} lesson`}
        disabled={lesson.isLocked || isNavigating}
      >
        {({ pressed }: { pressed: boolean }) => 
          lesson.isFinalTest ? (
            <FinalTest 
              key="final" 
              isPressed={pressed} 
              title={lesson.title} 
              description={lesson.description}
              testID={`lesson-title-${lesson.id}`}
            />
          ) : (
            components(pressed)
          )
        }
      </LessonSectionContainer>
      
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
