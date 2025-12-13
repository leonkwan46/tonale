import { useProgress } from '@/hooks'
import { stagesArray } from '@/subjects/theory/curriculum/stages/helpers'
import { Stage, StageLesson } from '@/subjects/theory/curriculum/types'
import { useFocusEffect } from 'expo-router'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import { LessonDivider, LessonSection, StageHeader, TopCloudsCover } from '../components'
import {
  CollapsibleLessonsContainer,
  ContentContainer,
  ContentWrapper,
  LessonContent,
  MessageContainer,
  MessageOverlay,
  MessageText,
  PartialLessonContainer,
  Spacer,
  StageContainer
} from './TheoryScreenBody.styles'

export const TheoryScreenBody = () => {
  const { getStageById, getStageRequirements } = useProgress()

  const scrollViewRef = useRef<ScrollView>(null)
  const [collapsedStages, setCollapsedStages] = useState<Record<string, boolean>>({})
  const [visibleStages, setVisibleStages] = useState<Record<string, boolean>>({})
  const [refreshKey, setRefreshKey] = useState(0)
  const animatedHeights = useRef<Record<string, Animated.Value>>({})
  const stageRefs = useRef<Record<string, View>>({})
  const openedStageIdsRef = useRef<Set<string>>(new Set())

  const getVisibleLessonsForStage = useCallback((stageId: string): StageLesson[] => {
    const stage = getStageById(stageId)
    if (!stage) return []

    return stage.lessons.map(lesson => ({
      ...lesson,
      isLocked: !stage.isUnlocked
    }))
  }, [getStageById])

  const getStageDisplayData = useCallback((stageId: string) => {
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
    const blockingMessage = !requirements.isUnlocked && requirements.progressNeeded.length > 0
      ? requirements.progressNeeded.join(', ')
      : ''

    return {
      stage,
      isAccessible: requirements.isUnlocked,
      blockingMessage,
      lessons
    }
  }, [getStageById, getStageRequirements, getVisibleLessonsForStage])

  const scrollToStage = useCallback((stageId: string, offset: number = 100) => {
    const stageRef = stageRefs.current[stageId]
    if (!stageRef || !scrollViewRef.current) return

    stageRef.measureLayout(
      scrollViewRef.current as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      (x: number, y: number) => {
        scrollViewRef.current?.scrollTo({
          y: Math.max(0, y - offset),
          animated: true
        })
      },
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
    )
  }, [])

  const toggleStageCollapse = useCallback((stageId: string) => {
    const isCollapsed = collapsedStages[stageId]
    const willCollapse = !isCollapsed

    setVisibleStages(prev => ({ ...prev, [stageId]: !willCollapse }))
    setCollapsedStages(prev => ({ ...prev, [stageId]: willCollapse }))

    if (willCollapse) {
      openedStageIdsRef.current.delete(stageId)
    } else {
      openedStageIdsRef.current.add(stageId)
      setTimeout(() => {
        animatedHeights.current[stageId].setValue(0)
        Animated.timing(animatedHeights.current[stageId], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }).start(() => {
          scrollToStage(stageId, 0)
        })
      }, 10)
    }
  }, [collapsedStages, scrollToStage])

  const handleContentSizeChange = useCallback(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [])

  const initializeStageStates = useCallback(() => {
    const initialCollapsedState: Record<string, boolean> = {}
    const initialVisibleState: Record<string, boolean> = {}

    const unlockedStages = stagesArray.filter(s => s.isUnlocked)
    const furthest = unlockedStages.length > 0
      ? unlockedStages.reduce((max, s) => (s.order > max.order ? s : max), unlockedStages[0])
      : undefined
    const furthestId = furthest?.id

    stagesArray.forEach(stage => {
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

  useEffect(() => {
    initializeStageStates()
  }, [initializeStageStates, refreshKey])

  useFocusEffect(
    useCallback(() => {
      setRefreshKey(prev => prev + 1)
    }, [])
  )

  const unlockedStages = stagesArray.filter(stage => stage.isUnlocked)
  const lockedStages = stagesArray.filter(stage => !stage.isUnlocked)
  const nextLockedStage = lockedStages.length > 0
    ? lockedStages.reduce((min, s) => (s.order < min.order ? s : min), lockedStages[0])
    : undefined

  const displayStages = nextLockedStage
    ? [...unlockedStages, nextLockedStage]
    : unlockedStages

  const sortedStages = displayStages.sort((a, b) => b.order - a.order)
  const hasNextStage = nextLockedStage !== undefined

  const renderLesson = useCallback((
    lesson: StageLesson,
    reversedIndex: number,
    originalIndex: number,
    lessonsToShow: StageLesson[],
    isPreviewStage: boolean
  ) => {
    const shouldBePartial = isPreviewStage && reversedIndex === 0

    return (
      <Fragment key={lesson.id}>
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
      </Fragment>
    )
  }, [])

  const renderStage = useCallback((stage: Stage) => {
    const stageData = getStageDisplayData(stage.id)
    const isCollapsed = collapsedStages[stage.id] ?? false
    const isVisible = visibleStages[stage.id] !== false
    const isPreviewStage = !stage.isUnlocked
    const lessonsToShow = isPreviewStage ? stageData.lessons.slice(0, 2) : stageData.lessons

    return (
      <StageContainer
        key={stage.id}
        ref={(ref) => {
          if (ref) stageRefs.current[stage.id] = ref
        }}
      >
        {stage.isCleared && (
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
                return renderLesson(lesson, reversedIndex, originalIndex, lessonsToShow, isPreviewStage)
              })}
          </CollapsibleLessonsContainer>
        )}
      </StageContainer>
    )
  }, [collapsedStages, visibleStages, getStageDisplayData, toggleStageCollapse, renderLesson])

  return (
    <ContentWrapper ref={scrollViewRef} onContentSizeChange={handleContentSizeChange}>
      <ContentContainer>
        <TopCloudsCover />

        {!hasNextStage && (
          <MessageOverlay>
            <MessageContainer>
              <MessageText>Next stage still in progress...</MessageText>
            </MessageContainer>
          </MessageOverlay>
        )}

        {!hasNextStage && <Spacer />}

        {sortedStages.map(renderStage)}
      </ContentContainer>
    </ContentWrapper>
  )
}
