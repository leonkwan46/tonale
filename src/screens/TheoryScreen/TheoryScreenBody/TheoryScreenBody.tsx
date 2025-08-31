import React, { useEffect, useRef } from 'react'
import { ScrollView } from 'react-native'
import { LessonSection } from '../LessonSection/LessonSection'
import { LessonDivider, TopCloudsCover } from '../components'
import { ContentContainer, ContentWrapper } from './TheoryScreenBody.styles'

const stageOneLessons = [
  {
    title: 'Lesson 1',
    description: 'This is the first lesson',
    isLocked: false,
    stars: 0
  },
  {
    title: 'Lesson 2',
    description: 'This is the second lesson',
    isLocked: false,
    stars: 0
  },
  {
    title: 'Lesson 3',
    description: 'This is the third lesson',
    isLocked: false,
    stars: 0
  },
  {
    title: 'Lesson 4',
    description: 'This is the fourth lesson',
    isLocked: false,
    stars: 0
  },
  {
    title: 'Lesson 5',
    description: 'This is the fifth lesson',
    isLocked: false,
    stars: 0
  },
  {
    title: 'Lesson 6',
    description: 'This is the sixth lesson',
    isLocked: false,
    stars: 0
  },
  {
    title: 'Final Test',
    description: 'This is the final test of Stage 1',
    isLocked: false,
    isFinalTest: true,
    stars: 0
  }
]

const stageTwoLessons = [
  {
    title: 'Lesson 7',
    description: 'This is the seventh lesson',
    isLocked: false,
    stars: 0
  },
  {
    title: 'Lesson 8',
    description: 'This is the eighth lesson',
    isLocked: false,
    stars: 0
  },
  {
    title: 'Lesson 9',
    description: 'This is the ninth lesson',
    isLocked: false,
    stars: 0
  },
  {
    title: 'Lesson 10',
    description: 'This is the tenth lesson',
    isLocked: false,
    stars: 0
  },
  {
    title: 'Lesson 11',
    description: 'This is the eleventh lesson',
    isLocked: false,
    stars: 0
  }
]

const lockedNextLessons = [
  {
    title: 'Lesson 12',
    description: 'This is the twelfth lesson',
    isLocked: true,
    stars: 0
  }
]

const stages = {
  stageOne: {
    lessons: stageOneLessons.slice(0, stageOneLessons.length),
    isCleared: stageOneLessons.every(lesson => lesson.stars >= 1) && 
               stageOneLessons.reduce((total, lesson) => total + lesson.stars, 0) >= stageOneLessons.length
  },
  stageTwo: {
    lessons: stageTwoLessons.slice(0, stageTwoLessons.length),
    isCleared: stageTwoLessons.every(lesson => lesson.stars >= 1) && 
               stageTwoLessons.reduce((total, lesson) => total + lesson.stars, 0) >= stageTwoLessons.length
  }
}

export const TheoryScreenBody = () => {
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ContentWrapper ref={scrollViewRef}>
      <ContentContainer>
        <TopCloudsCover
          isCleared={stages.stageOne.isCleared}
        />
        {stageOneLessons.concat(lockedNextLessons)
          .slice()
          .reverse()
          .map((lesson, reversedIndex) => {
            const totalLessons = stageOneLessons.concat(lockedNextLessons)
            const originalIndex = totalLessons.length - 1 - reversedIndex
            return (
              <React.Fragment key={originalIndex}>
                <LessonSection index={originalIndex} lesson={lesson} />
                {reversedIndex < totalLessons.length - 1 && !lesson.isFinalTest && <LessonDivider />}
              </React.Fragment>
            )
          })}
      </ContentContainer>
    </ContentWrapper>
  )
}