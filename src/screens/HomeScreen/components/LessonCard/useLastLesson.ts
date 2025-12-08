import { useProgress } from '@/hooks/useProgressContext'
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

type LessonProgress = { isLocked: boolean; stars?: number; isPassed?: boolean }
type ProgressData = Record<string, LessonProgress>
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
  const [loading, setLoading] = useState(true)
  const [allCompleted, setAllCompleted] = useState(false)

  const findIncompleteLessonFromIndex = useCallback((
    startIndex: number,
    progressData: ProgressData
  ): Lesson | null => {
    for (let i = startIndex; i < allStageLessons.length; i++) {
      const stageLesson = allStageLessons[i]
      const lesson = getLessonById(stageLesson.id, progressData)
      if (!lesson) continue
      
      const progress = progressData[stageLesson.id]
      if (progress?.isLocked ?? lesson.isLocked ?? false) continue
      if (isLessonComplete(lesson, progress)) continue
      
      return lesson
    }
    return null
  }, [allStageLessons, getLessonById])

  const findLessonToDisplay = useCallback((
    lastAccess: LastAccess,
    progressData: ProgressData
  ): Lesson | null => {
    if (lastAccess) {
      const lesson = getLessonById(lastAccess.lessonId, progressData) ?? null
      if (!lesson) return null

      const progress = progressData[lastAccess.lessonId]
      if (isLessonComplete(lesson, progress)) {
        const currentIndex = allStageLessons.findIndex(stageLesson => stageLesson.id === lastAccess.lessonId)
        if (currentIndex === -1) return null
        return findIncompleteLessonFromIndex(currentIndex + 1, progressData)
      }
      
      return lesson
    }
    
    return findIncompleteLessonFromIndex(0, progressData)
  }, [allStageLessons, getLessonById, findIncompleteLessonFromIndex])

  const fetchLesson = useCallback(async () => {
    if (userLoading || !user || !initialized) {
      setLoading(true)
      return
    }

    try {
      setLoading(true)
      const lastAccess = await getLastAccessedLessonLocal()
      const currentLesson = findLessonToDisplay(lastAccess, progressData)

      if (!currentLesson) {
        const allCompleted = findIncompleteLessonFromIndex(0, progressData) === null
        setAllCompleted(allCompleted)
        setLesson(null)
        setLoading(false)
      } else {
        const lessonWithProgress = mergeProgressData(currentLesson, progressData)
        setLesson(lessonWithProgress)
        setAllCompleted(false)
        setLoading(false)
      }
    } catch (error) {
      console.error('Failed to get lesson:', error)
      setLesson(null)
      setAllCompleted(false)
      setLoading(false)
    }
  }, [
    userLoading,
    user,
    initialized,
    progressData,
    getLastAccessedLessonLocal,
    findLessonToDisplay,
    findIncompleteLessonFromIndex
  ])

  useEffect(() => {
    if (!userLoading && user && initialized) {
      fetchLesson()
    } else if (!userLoading && !user) {
      setLesson(null)
      setAllCompleted(false)
      setLoading(false)
    }
  }, [userLoading, user, initialized, progressData, fetchLesson])

  // Refresh lesson when screen comes into focus
  useFocusEffect(useCallback(() => {
    if (!userLoading && user && initialized) {
      fetchLesson()
    }
  }, [userLoading, user, initialized, fetchLesson]))

  return { lesson, loading, allCompleted, refresh: fetchLesson }
}

// Helper Functions
function isLessonComplete(
  lesson: Lesson,
  progress: LessonProgress | undefined
): boolean {
  if (lesson.isFinalTest) {
    return progress?.isPassed === true
  }
  return (progress?.stars ?? 0) >= 3
}

function mergeProgressData(
  lesson: Lesson,
  progressData: ProgressData
): Lesson {
  const progress = progressData[lesson.id]
  return {
    ...lesson,
    isLocked: progress?.isLocked ?? lesson.isLocked,
    stars: progress?.stars ?? lesson.stars,
    isPassed: progress?.isPassed ?? lesson.isPassed
  }
}
