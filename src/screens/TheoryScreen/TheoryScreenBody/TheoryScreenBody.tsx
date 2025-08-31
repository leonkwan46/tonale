import React, { useEffect, useRef } from 'react'
import { ScrollView } from 'react-native'
import { LessonSection } from '../LessonSection/LessonSection'
import { LessonDivider, TopCloudsCover } from '../components'
import {
  getStageDisplayData,
  type Lesson
} from '../sampleData'
import { ContentContainer, ContentWrapper, PartialLessonContainer } from './TheoryScreenBody.styles'

export const TheoryScreenBody = () => {
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // For demo purposes, show stage 1 and a preview of stage 2
  const stage1Data = getStageDisplayData('stage-1')
  const stage2Data = getStageDisplayData('stage-2')
  
  // Show all of stage 1 + 1.25 lessons from stage 2 (1 full + 0.25 partial)
  const stage1Lessons = stage1Data.lessons
  const stage2PreviewLessons = stage2Data.lessons.slice(0, 2) // Take first 2 lessons from stage 2
  
  const allDisplayLessons: Lesson[] = [
    ...stage1Lessons,
    ...stage2PreviewLessons
  ]

  // Calculate which lesson should be partially visible
  const totalLessons = allDisplayLessons.length
  const stage2StartIndex = stage1Lessons.length

  return (
    <ContentWrapper ref={scrollViewRef}>
      <ContentContainer>
        <TopCloudsCover
          isCleared={stage1Data.stage?.isCleared || false}
        />
        {allDisplayLessons
          .slice()
          .reverse()
          .map((lesson, reversedIndex) => {
            const originalIndex = totalLessons - 1 - reversedIndex
            const isFromStage2 = originalIndex >= stage2StartIndex
            const isLastStage2Lesson = originalIndex === totalLessons - 1 // This will be the topmost lesson
            const shouldBePartial = isFromStage2 && isLastStage2Lesson
            
            return (
              <React.Fragment key={lesson.id}>
                <PartialLessonContainer isPartial={shouldBePartial}>
                  <LessonSection index={originalIndex} lesson={lesson} />
                </PartialLessonContainer>
                {reversedIndex < totalLessons - 1 && !lesson.isFinalTest && <LessonDivider />}
              </React.Fragment>
            )
          })}
      </ContentContainer>
    </ContentWrapper>
  )
}