import { usePreventDoubleTap } from '@/hooks'
import { WarningModal } from '@/sharedComponents'
import { Lesson } from '@/subjects/aural/curriculum'
import { useRouter } from 'expo-router'
import * as React from 'react'
import { useState } from 'react'
import { CardButton, Description, FinalTest } from './components'
import { LessonSectionContainer } from './LessonSection.styles'

interface LessonSectionProps {
  index: number
  lesson: Lesson
  allStageLessons?: Lesson[]
}

export const LessonSection: React.FC<LessonSectionProps> = ({ index, lesson, allStageLessons = [] }: LessonSectionProps) => {
  const router = useRouter()
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

  const handlePress = usePreventDoubleTap(() => {
    if (lesson.isFinalTest) {
      // Check if any lesson in the stage has 0 stars
      if (checkForZeroStarLessons()) {
        setShowWarningModal(true)
      } else {
        router.push(`/lesson?lessonId=${lesson.id}`)
      }
    } else if (!lesson.isLocked) {
      router.push(`/lesson?lessonId=${lesson.id}`)
    }
  })

  const handleContinueToFinalTest = () => {
    setShowWarningModal(false)
    router.push(`/lesson?lessonId=${lesson.id}`)
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
        disabled={lesson.isLocked}
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
