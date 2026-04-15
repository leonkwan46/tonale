import type { Stage } from '@types'
import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, View } from 'react-native'

export const useCollapsibleStages = (stages: Stage[]) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const [collapsedStages, setCollapsedStages] = useState<Record<string, boolean>>({})
  const [visibleStages, setVisibleStages] = useState<Record<string, boolean>>({})
  const animatedHeights = useRef<Record<string, Animated.Value>>({})
  const stageRefs = useRef<Record<string, View>>({})
  const openedStageIdsRef = useRef<Set<string>>(new Set())
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stagesRef = useRef(stages)
  stagesRef.current = stages

  const scrollToStage = useCallback((stageId: string, offset = 100) => {
    const stageRef = stageRefs.current[stageId]
    const scrollRef = scrollViewRef.current
    if (!stageRef || !scrollRef) return
    stageRef.measureLayout(
      scrollRef as unknown as View,
      (_, y) => scrollViewRef.current?.scrollTo({ y: Math.max(0, y - offset), animated: true }),
      () => scrollViewRef.current?.scrollToEnd({ animated: true })
    )
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
    return () => {
      clearTimeout(timer)
      if (expandTimerRef.current) clearTimeout(expandTimerRef.current)
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    }
  }, [])

  const initCollapseState = useCallback(() => {
    const currentStages = stagesRef.current
    const initialCollapsedState: Record<string, boolean> = {}
    const initialVisibleState: Record<string, boolean> = {}
    const unlockedStages = currentStages.filter(s => s.isUnlocked)
    const furthest =
      unlockedStages.length > 0
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
      const newCollapsedState = !collapsedStages[stageId]

      if (newCollapsedState) {
        setVisibleStages(prev => ({ ...prev, [stageId]: false }))
        setCollapsedStages(prev => ({ ...prev, [stageId]: true }))
        openedStageIdsRef.current.delete(stageId)
      } else {
        setVisibleStages(prev => ({ ...prev, [stageId]: true }))
        setCollapsedStages(prev => ({ ...prev, [stageId]: false }))
        openedStageIdsRef.current.add(stageId)
        if (expandTimerRef.current) clearTimeout(expandTimerRef.current)
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
        expandTimerRef.current = setTimeout(() => {
          animatedHeights.current[stageId].setValue(0)
          Animated.timing(animatedHeights.current[stageId], {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
          }).start()
          scrollTimerRef.current = setTimeout(() => scrollToStage(stageId, 0), 150)
        }, 10)
      }
    },
    [collapsedStages, scrollToStage]
  )

  return { scrollViewRef, collapsedStages, visibleStages, animatedHeights, stageRefs, toggleStageCollapse }
}
