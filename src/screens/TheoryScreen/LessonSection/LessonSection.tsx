import React from 'react'
import { CardButton, Description, FinalTest } from './components'
import { LessonSectionContainer } from './LessonSection.styles'

interface Lesson {
  title: string
  description: string
  isLocked: boolean
  isFinalTest?: boolean
  stars: number
}

interface LessonSectionProps {
  index: number
  lesson: Lesson
}

export const LessonSection: React.FC<LessonSectionProps> = ({ index, lesson }) => {
  const components = (isPressed: boolean) => index % 2 === 0 && !lesson.isFinalTest
    ? [
    <CardButton key="card" isPressed={isPressed} isLocked={lesson.isLocked} stars={lesson.stars} />, 
    <Description key="desc" title={lesson.title} description={lesson.description} />
    ]
    : [
    <Description key="desc" title={lesson.title} description={lesson.description} />, 
    <CardButton key="card" isPressed={isPressed} isLocked={lesson.isLocked} stars={lesson.stars} />
    ]

  const handlePress = () => {
    
  }

  return (
    <LessonSectionContainer 
      onPress={handlePress}
    >
      {({ pressed }) => 
        lesson.isFinalTest ? (
          <FinalTest 
            key="final" 
            isPressed={pressed} 
            title={lesson.title} 
            description={lesson.description} 
          />
        ) : (
          components(pressed)
        )
      }
    </LessonSectionContainer>
  )
}