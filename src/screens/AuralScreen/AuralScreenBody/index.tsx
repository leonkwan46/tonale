import { useProgress } from '@/hooks'
import { getAllAuralStages, getAuralStage } from '@/subjects/aural/curriculum/stages/helpers'
import type { Stage, StageLesson } from '@types'
import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import { LessonDivider } from '../../TheoryScreen/components/LessonDivider'
import { LessonSection } from '../../TheoryScreen/components/LessonSection'
import { StageHeader } from '../../TheoryScreen/components/StageHeader'
import { TopCloudsCover } from '../../TheoryScreen/components/TopCloudsCover'
import { CollapsibleLessonsContainer, ContentContainer, ContentWrapper, LessonContent, MessageContainer, MessageOverlay, MessageText, PartialLessonContainer, SpacerView, StageContainer } from './AuralScreenBody.styles'

export const AuralScreenBody = () => {
  const { progressData } = useProgress()

  // UI Utility Functions for AuralScreenBody
  const getVisibleLessonsForStage = useCallback((stageId: string): StageLesson[] => {
    const stage = getAuralStage(stageId)
    if (!stage) return []
    
    // Merge progress data with lessons
    return stage.lessons.map(lesson => {
      const progress = progressData[lesson.id]
      return {
        ...lesson,
        isLocked: progress?.isLocked ?? lesson.isLocked ?? false,
        stars: progress?.stars ?? lesson.stars ?? 0
      }
    })
  }, [progressData])

  const getStageDisplayData = useCallback((stageId: string): {
    stage: Stage | undefined
    isAccessible: boolean
    blockingMessage: string
    lessons: StageLesson[]
  } => {
    const stage = getAuralStage(stageId)
    if (!stage) {
      return {
        stage: undefined,
        isAccessible: false,
        blockingMessage: 'Stage not found',
        lessons: []
      }
    }
    
    const lessons = getVisibleLessonsForStage(stageId)
    
    return {
      stage,
      isAccessible: stage.isUnlocked,
      blockingMessage: '',
      lessons
    }
  }, [getVisibleLessonsForStage])

  
  const scrollViewRef = useRef<ScrollView>(null)
  const [collapsedStages, setCollapsedStages] = useState<Record<string, boolean>>({})
  const [visibleStages, setVisibleStages] = useState<Record<string, boolean>>({})
  const [refreshKey, setRefreshKey] = useState(0) // Force re-render when progress updates
  const animatedHeights = useRef<Record<string, Animated.Value>>({})
  const stageRefs = useRef<Record<string, View>>({})
  const openedStageIdsRef = useRef<Set<string>>(new Set())

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
    const initState = async () => {
      const initialCollapsedState: Record<string, boolean> = {}
      const initialVisibleState: Record<string, boolean> = {}
      const allStages = getAllAuralStages()

      // Determine highest unlocked stage (furthest) - auto-open this stage
      const unlockedStages = allStages.filter(s => s.isUnlocked)
      const furthest = unlockedStages.length > 0
        ? unlockedStages.reduce((max, s) => (s.order > max.order ? s : max), unlockedStages[0])
        : undefined
      const furthestId = furthest?.id

      allStages.forEach(stage => {
        // Initialize animated value for each stage
        if (!animatedHeights.current[stage.id]) {
          animatedHeights.current[stage.id] = new Animated.Value(1)
        }

        const shouldBeOpen = furthestId === stage.id

        if (stage.isCleared) {
          // Cleared stages are collapsible; open if shouldBeOpen, otherwise collapse
          initialCollapsedState[stage.id] = !shouldBeOpen
          initialVisibleState[stage.id] = shouldBeOpen
          animatedHeights.current[stage.id].setValue(shouldBeOpen ? 1 : 0)
        } else {
          // Non-cleared stages should remain visible (not collapsible)
          initialVisibleState[stage.id] = true
          animatedHeights.current[stage.id].setValue(1)
        }
      })

      setCollapsedStages(initialCollapsedState)
      setVisibleStages(initialVisibleState)
    }

    void initState()
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
      
      // Track user intent to keep this stage open (session-only, not persisted)
      openedStageIdsRef.current.add(stageId)

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
    if (newCollapsedState) {
      // Track user intent to keep this stage closed (session-only, not persisted)
      openedStageIdsRef.current.delete(stageId)
    }
  }

  // Get all unlocked stages plus a preview of the next locked stage
  const allStages = getAllAuralStages()
  const displayStages = allStages.filter(stage => stage.isUnlocked)
  const nextLockedStage = allStages.find(stage => !stage.isUnlocked && stage.order === Math.min(...allStages.filter(s => !s.isUnlocked).map(s => s.order)))
  
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
          <MessageOverlay>
            <MessageContainer>
              <MessageText>
                Next stage still in progress...
              </MessageText>
            </MessageContainer>
          </MessageOverlay>
        )}
        
        {/* Spacer to maintain 1.25 space when no next stage */}
        {!hasNextStage && (
          <SpacerView />
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
              {/* Show stage header only for cleared stages with lessons */}
              {stage.isCleared && lessonsToShow.length > 0 && (
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
                      
                      return [
                        <PartialLessonContainer key={lesson.id} isPartial={shouldBePartial}>
                          <LessonContent isPartial={shouldBePartial}>
                            <LessonSection 
                              index={originalIndex} 
                              lesson={lesson}
                              allStageLessons={lessonsToShow}
                            />
                          </LessonContent>
                        </PartialLessonContainer>,
                        reversedIndex < lessonsToShow.length - 1 && !lesson.isFinalTest && <LessonDivider key={`divider-${lesson.id}`} />
                      ]
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
