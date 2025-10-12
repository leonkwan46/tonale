import {
  getStageById,
  getStageRequirements,
  stagesArray
} from '@/data/theoryData'
import { Stage, StageLesson } from '@/data/theoryData/types'
import { useFocusEffect } from 'expo-router'
import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { LessonDivider, LessonSection, StageHeader, TopCloudsCover } from '../components'
import { CollapsibleLessonsContainer, ContentContainer, ContentWrapper, LessonContent, PartialLessonContainer, StageContainer } from './TheoryScreenBody.styles'

// UI Utility Functions for TheoryScreenBody
const getVisibleLessonsForStage = (stageId: string): StageLesson[] => {
  const stage = getStageById(stageId)
  if (!stage) return []
  
  // If stage is unlocked, show all lessons
  if (stage.isUnlocked) {
    return stage.lessons.map(lesson => ({ ...lesson, isLocked: false }))
  }
  
  // If stage is locked, show lessons as locked
  return stage.lessons.map(lesson => ({ ...lesson, isLocked: true }))
}

const getStageDisplayData = (stageId: string): {
  stage: Stage | undefined
  isAccessible: boolean
  blockingMessage: string
  lessons: StageLesson[]
} => {
  const stage = getStageById(stageId)
  if (!stage) {
    return {
      stage: undefined,
      isAccessible: false,
      blockingMessage: 'Stage not found',
      lessons: []
    }
  }
  
  const requirements = getStageRequirements(stageId)
  const lessons = getVisibleLessonsForStage(stageId)
  
  let blockingMessage = ''
  if (!requirements.isUnlocked && requirements.progressNeeded.length > 0) {
    blockingMessage = requirements.progressNeeded.join(', ')
  }
  
  return {
    stage,
    isAccessible: requirements.isUnlocked,
    blockingMessage,
    lessons
  }
}

export const TheoryScreenBody = () => {
  const scrollViewRef = useRef<ScrollView>(null)
  const [collapsedStages, setCollapsedStages] = useState<Record<string, boolean>>({})
  const [visibleStages, setVisibleStages] = useState<Record<string, boolean>>({})
  const [refreshKey, setRefreshKey] = useState(0) // Force re-render when progress updates
  const animatedHeights = useRef<Record<string, Animated.Value>>({})
  const stageRefs = useRef<Record<string, View>>({})

  // Helper function to scroll to a stage
  const scrollToStage = (stageId: string, offset: number = 100) => {
    if (stageRefs.current[stageId] && scrollViewRef.current) {
      stageRefs.current[stageId].measureLayout(
        scrollViewRef.current as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        (x: number, y: number) => {
          scrollViewRef.current?.scrollTo({
            y: Math.max(0, y - offset),
            animated: true
          })
        },
        () => {
          // Fallback if measureLayout fails
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      )
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useFocusEffect(
    useCallback(() => {
      setRefreshKey(prev => prev + 1)
    }, [])
  )
  useEffect(() => {
    const initialCollapsedState: Record<string, boolean> = {}
    const initialVisibleState: Record<string, boolean> = {}
    
    stagesArray.forEach(stage => {
      // Initialize animated value for each stage
      if (!animatedHeights.current[stage.id]) {
        animatedHeights.current[stage.id] = new Animated.Value(1)
      }
      
      // Automatically collapse cleared stages (except the current one being worked on)
      if (stage.isCleared) {
        // Find if there's a next unlocked stage
        const nextStage = stagesArray.find(s => s.order === stage.order + 1 && s.isUnlocked)
        const shouldCollapse = !!nextStage // Collapse if next stage is unlocked
        initialCollapsedState[stage.id] = shouldCollapse
        initialVisibleState[stage.id] = !shouldCollapse // Show content if not collapsed
        
        // Set initial animated value
        animatedHeights.current[stage.id].setValue(shouldCollapse ? 0 : 1)
      } else {
        // Non-cleared stages are always visible
        initialVisibleState[stage.id] = true
      }
    })
    setCollapsedStages(initialCollapsedState)
    setVisibleStages(initialVisibleState)
  }, [refreshKey])

  const toggleStageCollapse = (stageId: string) => {
    const isCurrentlyCollapsed = collapsedStages[stageId]
    const newCollapsedState = !isCurrentlyCollapsed
    
    if (newCollapsedState) {
      // Collapsing: hide content immediately (no scroll)
      setVisibleStages(prev => ({
        ...prev,
        [stageId]: false
      }))
      setCollapsedStages(prev => ({
        ...prev,
        [stageId]: true
      }))
    } else {
      // Expanding: show then fade in
      setVisibleStages(prev => ({
        ...prev,
        [stageId]: true
      }))
      setCollapsedStages(prev => ({
        ...prev,
        [stageId]: false
      }))
      
      // Small delay to ensure DOM update, then start fade in animation and scroll
      setTimeout(() => {
        animatedHeights.current[stageId].setValue(0)
        Animated.timing(animatedHeights.current[stageId], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }).start()
        
        // Scroll to the expanded content
        setTimeout(() => {
          scrollToStage(stageId, 0)
        }, 150) // Wait for content to be rendered
      }, 10)
    }
  }

  // Get all unlocked stages plus a preview of the next locked stage
  const displayStages = stagesArray.filter(stage => stage.isUnlocked)
  const nextLockedStage = stagesArray.find(stage => !stage.isUnlocked && stage.order === Math.min(...stagesArray.filter(s => !s.isUnlocked).map(s => s.order)))
  
  if (nextLockedStage) {
    displayStages.push(nextLockedStage)
  }
  
  // Check if there's no next stage (all stages completed)
  const hasNextStage = nextLockedStage !== undefined

  // Sort stages by order (reverse for display from bottom to top)
  const sortedStages = displayStages.sort((a, b) => b.order - a.order)

  return (
    <ContentWrapper ref={scrollViewRef}>
      <ContentContainer>
        <TopCloudsCover />
        
        {/* Show "next stage in progress" message when no next stage exists */}
        {!hasNextStage && (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: scale(180), // Same height as TopCloudsCover
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 20
          }}>
            <View style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: scale(12),
              borderRadius: scale(8)
            }}>
              <Text style={{
                color: 'white',
                fontSize: scale(14),
                textAlign: 'center'
              }}>
                Next stage still in progress...
              </Text>
            </View>
          </View>
        )}
        
        {/* Spacer to maintain 1.25 space when no next stage */}
        {!hasNextStage && (
          <View style={{
            height: scale(180), // Same height as TopCloudsCover
            width: '100%'
          }} />
        )}
        
        {sortedStages.map((stage, stageIndex) => {
          const stageData = getStageDisplayData(stage.id)
          const isCollapsed = collapsedStages[stage.id] || false
          const isVisible = visibleStages[stage.id] !== false // Default to true if not set
          const isPreviewStage = !stage.isUnlocked
          
          // For preview stage, only show 1.25 lessons
          let lessonsToShow = stageData.lessons
          if (isPreviewStage) {
            lessonsToShow = stageData.lessons.slice(0, 2) // Show 2 lessons for preview
          }

          return (
            <StageContainer 
              key={stage.id} 
              ref={(ref) => {
                if (ref) {
                  stageRefs.current[stage.id] = ref
                }
              }}
            >
              {/* Show stage header only for cleared stages */}
              {stage.isCleared && (
                <StageHeader
                  stage={stage}
                  isCollapsed={isCollapsed}
                  onToggle={() => toggleStageCollapse(stage.id)}
                  showToggle={true}
                />
              )}
              
              {/* Lessons container - collapsible for cleared stages */}
              {isVisible && (
                <CollapsibleLessonsContainer
                  style={{
                    opacity: stage.isCleared ? animatedHeights.current[stage.id] : 1
                  }}
                >
                  {lessonsToShow
                    .slice()
                    .reverse()
                    .map((lesson, reversedIndex) => {
                      const originalIndex = lessonsToShow.length - 1 - reversedIndex
                      const isLastLesson = reversedIndex === 0 // Topmost lesson in this stage
                      const shouldBePartial = isPreviewStage && isLastLesson
                      
                      return (
                        <React.Fragment key={lesson.id}>
                          <PartialLessonContainer isPartial={shouldBePartial}>
                            <LessonContent isPartial={shouldBePartial}>
                              <LessonSection 
                                index={originalIndex} 
                                lesson={lesson}
                                allStageLessons={lessonsToShow}
                              />
                            </LessonContent>
                          </PartialLessonContainer>
                          {reversedIndex < lessonsToShow.length - 1 && !lesson.isFinalTest && <LessonDivider />}
                        </React.Fragment>
                      )
                    })}
                </CollapsibleLessonsContainer>
              )}
            </StageContainer>
          )
        })}
      </ContentContainer>
    </ContentWrapper>
  )
}
