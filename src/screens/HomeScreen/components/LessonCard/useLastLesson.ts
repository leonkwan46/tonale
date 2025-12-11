import { useProgress, type ProgressData } from '@/hooks/useProgressContext'
import { useUser } from '@/hooks/useUserContext'
import { Lesson } from '@/theory/curriculum/types'
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
  const { loading: userLoading, user } = useUser()
  const {
    progressData,
    initialized,
    getLessonById,
    getLastAccessedLessonLocal,
    allStageLessons
  } = useProgress()
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [allCompleted, setAllCompleted] = useState(false)

  const loading = userLoading || !initialized || !user

  const fetchLesson = useCallback(async () => {
    if (loading) return

    try {
      const lastAccess = await getLastAccessedLessonLocal()
      const currentLesson = findLessonToDisplay(
        lastAccess,
        progressData,
        allStageLessons,
        getLessonById
      )
      
      if (!currentLesson) {
        const allCompleted = findIncompleteLessonFromIndex(
          0,
          progressData,
          allStageLessons,
          getLessonById
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
    getLastAccessedLessonLocal,
    allStageLessons,
    getLessonById
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
function findIncompleteLessonFromIndex(
  startIndex: number,
  progressData: Record<string, ProgressData>,
  allStageLessons: { id: string }[],
  getLessonById: (id: string, progressData?: Record<string, ProgressData>) => Lesson | undefined
): Lesson | null {
  for (let i = startIndex; i < allStageLessons.length; i++) {
    const stageLesson = allStageLessons[i]
    const lesson = getLessonById(stageLesson.id, progressData) ?? null
    if (!lesson) continue
    
    const progress = progressData[stageLesson.id]
    if (progress?.isLocked ?? lesson.isLocked ?? false) continue
    if (isLessonComplete(lesson, progress)) continue
    
    return lesson
  }
  return null
}

function findLessonToDisplay(
  lastAccess: LastAccess,
  progressData: Record<string, ProgressData>,
  allStageLessons: { id: string }[],
  getLessonById: (id: string, progressData?: Record<string, ProgressData>) => Lesson | undefined
): Lesson | null {
  if (lastAccess) {
    const lesson = getLessonById(lastAccess.lessonId, progressData) ?? null
    if (!lesson) return null

    const progress = progressData[lastAccess.lessonId]
    if (isLessonComplete(lesson, progress)) {
      const currentIndex = allStageLessons.findIndex(stageLesson => stageLesson.id === lastAccess.lessonId)
      if (currentIndex === -1) return null
      return findIncompleteLessonFromIndex(currentIndex + 1, progressData, allStageLessons, getLessonById)
    }
    
    return lesson
  }
  
  return findIncompleteLessonFromIndex(0, progressData, allStageLessons, getLessonById)
}

function isLessonComplete(
  lesson: Lesson,
  progress: ProgressData | undefined
): boolean {
  if (lesson.isFinalTest) {
    return progress?.isPassed === true
  }
  return (progress?.stars ?? 0) >= 3
}

function mergeProgressData(
  lesson: Lesson,
  progressData: Record<string, ProgressData>
): Lesson {
  const progress: ProgressData | undefined = progressData[lesson.id]
  return {
    ...lesson,
    isLocked: progress?.isLocked ?? lesson.isLocked,
    stars: progress?.stars ?? lesson.stars,
    isPassed: progress?.isPassed ?? lesson.isPassed
  }
}
