import { useProgress } from '@/hooks'
import type { Stage, StageLesson } from '@types'
import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import { LessonDivider } from '../components/LessonDivider'
import { LessonSection } from '../components/LessonSection'
import { StageHeader } from '../components/StageHeader'
import { TopCloudsCover } from '../components/TopCloudsCover'
import { CollapsibleLessonsContainer, ContentContainer, ContentWrapper, LessonContent, PartialLessonContainer, StageContainer } from './TheoryScreenBody.styles'

const PREVIEW_LESSONS_COUNT = 2

export const TheoryScreenBody = () => {
  const { getStageById, getStageRequirements, getNextLockedStage, stages } = useProgress()
  const stagesRef = useRef(stages)
  stagesRef.current = stages

  const getVisibleLessonsForStage = useCallback((stageId: string): StageLesson[] => {
    const stage = getStageById(stageId)
    if (!stage) return []
    const isLocked = !stage.isUnlocked
    return stage.lessons.map(lesson => ({ ...lesson, isLocked }))
  }, [getStageById])

  const getStageDisplayData = useCallback(
    (stageId: string): { stage: Stage | undefined; isAccessible: boolean; blockingMessage: string; lessons: StageLesson[] } => {
      const stage = getStageById(stageId)
      if (!stage) {
        return { stage: undefined, isAccessible: false, blockingMessage: 'Stage not found', lessons: [] }
      }
      const requirements = getStageRequirements(stageId)
      const lessons = getVisibleLessonsForStage(stageId)
      const blockingMessage =
        !requirements.isUnlocked && requirements.progressNeeded.length > 0
          ? requirements.progressNeeded.join(', ')
          : ''
      return {
        stage,
        isAccessible: requirements.isUnlocked,
        blockingMessage,
        lessons
      }
    },
    [getStageById, getStageRequirements, getVisibleLessonsForStage]
  )

  const scrollViewRef = useRef<ScrollView>(null)
  const [collapsedStages, setCollapsedStages] = useState<Record<string, boolean>>({})
  const [visibleStages, setVisibleStages] = useState<Record<string, boolean>>({})
  const animatedHeights = useRef<Record<string, Animated.Value>>({})
  const stageRefs = useRef<Record<string, View>>({})
  const openedStageIdsRef = useRef<Set<string>>(new Set())

  const scrollToStage = useCallback((stageId: string, offset = 100) => {
    const stageRef = stageRefs.current[stageId]
    const scrollRef = scrollViewRef.current
    if (!stageRef || !scrollRef) return
    stageRef.measureLayout(
      scrollRef as unknown as View,
      (x: number, y: number) => {
        scrollViewRef.current?.scrollTo({ y: Math.max(0, y - offset), animated: true })
      },
      () => scrollViewRef.current?.scrollToEnd({ animated: true })
    )
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const initCollapseState = useCallback(() => {
    const currentStages = stagesRef.current
    const initialCollapsedState: Record<string, boolean> = {}
    const initialVisibleState: Record<string, boolean> = {}
    const unlockedStages = currentStages.filter(s => s.isUnlocked)
    const furthest = unlockedStages.length > 0
      ? unlockedStages.reduce((max, s) => (s.order > max.order ? s : max), unlockedStages[0])
      : undefined
    const furthestId = furthest?.id

    currentStages.forEach(stage => {
      if (!animatedHeights.current[stage.id]) {
        animatedHeights.current[stage.id] = new Animated.Value(1)
      }

      const shouldBeOpen = furthestId === stage.id

      if (stage.isCleared) {
        initialCollapsedState[stage.id] = !shouldBeOpen
        initialVisibleState[stage.id] = shouldBeOpen
        animatedHeights.current[stage.id].setValue(shouldBeOpen ? 1 : 0)
      } else {
        initialVisibleState[stage.id] = true
        animatedHeights.current[stage.id].setValue(1)
      }
    })

    setCollapsedStages(initialCollapsedState)
    setVisibleStages(initialVisibleState)
  }, [])

  useFocusEffect(initCollapseState)

  const toggleStageCollapse = useCallback(
    (stageId: string) => {
      const isCurrentlyCollapsed = collapsedStages[stageId]
      const newCollapsedState = !isCurrentlyCollapsed

      if (newCollapsedState) {
        setVisibleStages(prev => ({ ...prev, [stageId]: false }))
        setCollapsedStages(prev => ({ ...prev, [stageId]: true }))
      } else {
        setVisibleStages(prev => ({ ...prev, [stageId]: true }))
        setCollapsedStages(prev => ({ ...prev, [stageId]: false }))
        openedStageIdsRef.current.add(stageId)
        setTimeout(() => {
          animatedHeights.current[stageId].setValue(0)
          Animated.timing(animatedHeights.current[stageId], {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
          }).start()
          setTimeout(() => scrollToStage(stageId, 0), 150)
        }, 10)
      }
      if (newCollapsedState) openedStageIdsRef.current.delete(stageId)
    },
    [collapsedStages, scrollToStage]
  )

  const nextLockedStage = getNextLockedStage()
  const unlockedStages = stages.filter(s => s.isUnlocked)
  const displayStages = nextLockedStage ? [...unlockedStages, nextLockedStage] : unlockedStages
  const sortedStages = [...displayStages].sort((a, b) => b.order - a.order)
  const hasNextStage = nextLockedStage !== undefined
  const currentStage = hasNextStage ? [...unlockedStages].sort((a, b) => b.order - a.order)[0] : undefined
  const currentStageFinalTestNotCleared = Boolean(currentStage && !currentStage.isCleared)

  return (
    <ContentWrapper ref={scrollViewRef}>
      <ContentContainer>
        <TopCloudsCover
          message={
            hasNextStage && currentStageFinalTestNotCleared && currentStage
              ? 'Finish the final test to unlock next stage!'
              : !hasNextStage
                ? 'Next stage in progress...'
                : null
          }
          reserveLayoutSpace={!hasNextStage}
        />
        
        {sortedStages.map((stage) => {
          const stageData = getStageDisplayData(stage.id)
          const isCollapsed = collapsedStages[stage.id] || false
          const isVisible = visibleStages[stage.id] !== false
          const isPreviewStage = !stage.isUnlocked
          let lessonsToShow = stageData.lessons
          if (isPreviewStage) {
            lessonsToShow = stageData.lessons.slice(0, PREVIEW_LESSONS_COUNT)
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
              {stage.isCleared && lessonsToShow.length > 0 && (
                <StageHeader
                  stage={stage}
                  isCollapsed={isCollapsed}
                  onToggle={() => toggleStageCollapse(stage.id)}
                  showToggle={true}
                />
              )}
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
