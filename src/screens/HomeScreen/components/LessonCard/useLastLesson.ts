import { useProgress, type ProgressData } from '@/hooks/useProgressContext'
import { useUser } from '@/hooks/useUserContext'
import { getTheoryLessonWithProgress } from '@/subjects/theory/curriculum/stages/helpers'
import type { Lesson } from '@types'
import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'

interface LessonResult {
  lesson: Lesson | null
  loading: boolean
  allCompleted: boolean
  refresh: () => Promise<void>
}

type LastAccess = { lessonId: string; timestamp: number } | null

export const useLastLesson = (): LessonResult => {
  const { loading: userLoading, authUser } = useUser()
  const {
    progressData,
    progressDataInitialized,
    getLastLessonAccess,
    allStageLessons
  } = useProgress()
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [allCompleted, setAllCompleted] = useState(false)

  const loading = userLoading || !progressDataInitialized || !authUser

  const fetchLesson = useCallback(async () => {
    if (loading) return

    try {
      const lastAccess = await getLastLessonAccess()
      const currentLesson = findLessonToDisplay(
        lastAccess,
        progressData,
        allStageLessons
      )
      
      if (!currentLesson) {
        const allCompleted = findIncompleteLessonFromIndex(
          0,
          progressData,
          allStageLessons
        ) === null
        setAllCompleted(allCompleted)
          setLesson(null)
      } else {
        const lessonWithProgress = mergeProgressData(currentLesson, progressData)
          setLesson(lessonWithProgress)
          setAllCompleted(false)
      }
    } catch (error) {
      console.error('Failed to get lesson:', error)
        setLesson(null)
        setAllCompleted(false)
    }
  }, [
    loading,
    progressData,
    getLastLessonAccess,
    allStageLessons
  ])

  // Reactive update: refreshes when progressData or user state changes
  // Handles updates when lessons are completed and context data changes
  useEffect(() => {
    if (!loading) {
      fetchLesson()
    } else {
        setLesson(null)
        setAllCompleted(false)
    }
  }, [loading, progressData, fetchLesson])

  // Navigation-based refresh: refreshes when screen comes into focus
  // Catches AsyncStorage updates from other screens (e.g., theory screen lesson selection)
  // that may not have triggered context updates yet
  useFocusEffect(useCallback(() => {
    if (!loading) {
      fetchLesson()
    }
  }, [loading, fetchLesson]))

  return { lesson, loading, allCompleted, refresh: fetchLesson }
}

// Helper Functions
const findIncompleteLessonFromIndex = (
  startIndex: number,
  progressData: Record<string, ProgressData>,
  allStageLessons: { id: string }[]
): Lesson | null => {
  for (let i = startIndex; i < allStageLessons.length; i++) {
    const stageLesson = allStageLessons[i]
    const lesson = getTheoryLessonWithProgress(stageLesson.id, progressData) ?? null
    if (!lesson) continue

    const progress = progressData[stageLesson.id]
    if (progress?.isLocked ?? lesson.isLocked ?? false) continue
    if (isLessonComplete(lesson, progress)) continue

    return lesson
  }
  return null
}

const findLessonToDisplay = (
  lastAccess: LastAccess,
  progressData: Record<string, ProgressData>,
  allStageLessons: { id: string }[]
): Lesson | null => {
  if (lastAccess) {
    const startIndex = allStageLessons.findIndex(stageLesson => stageLesson.id === lastAccess.lessonId)
    const lessonFromId = getTheoryLessonWithProgress(lastAccess.lessonId, progressData) ?? null

    // If lastAccess points to a lesson that no longer exists, or isn't in allStageLessons,
    // fall back to the first incomplete lesson instead of bailing out.
    if (!lessonFromId || startIndex === -1) {
      return findIncompleteLessonFromIndex(0, progressData, allStageLessons)
    }

    const progress = progressData[lessonFromId.id]
    if (isLessonComplete(lessonFromId, progress)) {
      // Try to find the next incomplete lesson after the last accessed one.
      const nextLesson = findIncompleteLessonFromIndex(startIndex + 1, progressData, allStageLessons)
      if (nextLesson) {
        return nextLesson
      }

      // Wrap around: if there are incomplete lessons before startIndex, pick the first one.
      return findIncompleteLessonFromIndex(0, progressData, allStageLessons)
    }

    return lessonFromId
  }

  return findIncompleteLessonFromIndex(0, progressData, allStageLessons)
}

const isLessonComplete = (
  lesson: Lesson,
  progress: ProgressData | undefined
): boolean => {
  if (lesson.isFinalTest) {
    return progress?.isPassed === true
  }
  return (progress?.stars ?? 0) >= 3
}

const mergeProgressData = (
  lesson: Lesson,
  progressData: Record<string, ProgressData>
): Lesson => {
  const progress = progressData[lesson.id]
  return {
    ...lesson,
    isLocked: progress?.isLocked ?? lesson.isLocked,
    stars: progress?.stars ?? lesson.stars,
    isPassed: progress?.isPassed ?? lesson.isPassed
  }
}
