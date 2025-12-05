import { allStageLessons, getLastAccessedLessonLocal, getLessonById } from '@/utils/lesson'
import { getUserProgressData } from '@/utils/progress'
import { Lesson } from '@/theory/curriculum/types'
import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'

interface LessonResult {
  lesson: Lesson | null
  loading: boolean
  allCompleted: boolean
  refresh: () => Promise<void>
}

export const useLastLesson = (): LessonResult => {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [allCompleted, setAllCompleted] = useState(false)

  const fetchLesson = useCallback(async () => {
    try {
      setLoading(true)
      
      const lastAccess = await getLastAccessedLessonLocal()
      const progressData = getUserProgressData()
      
      let currentLesson = findLessonToDisplay(lastAccess, progressData)
      
      if (!currentLesson || isAllLessonsCompleted()) {
        setAllCompleted(true)
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
    } finally {
      setLoading(false)
    }
  }, [])

  useFocusEffect(useCallback(() => {
    fetchLesson()
  }, [fetchLesson]))

  return { lesson, loading, allCompleted, refresh: fetchLesson }
}

const findLessonToDisplay = (
  lastAccess: { lessonId: string; timestamp: number } | null,
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson | null => {
  if (lastAccess) {
    const lesson = getLessonById(lastAccess.lessonId) ?? null
    if (!lesson) return null

    const isComplete = isLessonComplete(lesson, progressData[lastAccess.lessonId])
    
    if (isComplete) {
      return findNextIncompleteLesson(lastAccess.lessonId, progressData)
    }
    
    return lesson
  }
  
  return getFirstIncompleteLesson(progressData)
}

const isLessonComplete = (
  lesson: Lesson,
  progress: { isLocked: boolean; stars?: number; isPassed?: boolean } | undefined
): boolean => {
  if (lesson.isFinalTest) {
    return progress?.isPassed === true
  }
  return (progress?.stars ?? 0) >= 3
}

const isLessonLocked = (
  lesson: Lesson,
  progress: { isLocked: boolean; stars?: number; isPassed?: boolean } | undefined
): boolean => {
  return progress?.isLocked ?? lesson.isLocked ?? false
}

const getFirstIncompleteLesson = (
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson | null => {
  for (const stageLesson of allStageLessons) {
    const lesson = getLessonById(stageLesson.id)
    if (!lesson) continue
    
    if (isLessonLocked(lesson, progressData[stageLesson.id])) continue
    if (isLessonComplete(lesson, progressData[stageLesson.id])) continue
    
    return lesson
  }
  return null
}

const findNextIncompleteLesson = (
  currentLessonId: string,
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson | null => {
  const currentIndex = allStageLessons.findIndex(lesson => lesson.id === currentLessonId)
  if (currentIndex === -1) return null

  for (let i = currentIndex + 1; i < allStageLessons.length; i++) {
    const stageLesson = allStageLessons[i]
    const lesson = getLessonById(stageLesson.id)
    if (!lesson) continue
    
    if (isLessonLocked(lesson, progressData[stageLesson.id])) continue
    if (isLessonComplete(lesson, progressData[stageLesson.id])) continue
    
    return lesson
  }

  return null
}

const isAllLessonsCompleted = (): boolean => {
  const progressData = getUserProgressData()
  let incompleteCount = 0
  let completeCount = 0
  
  for (const stageLesson of allStageLessons) {
    const lesson = getLessonById(stageLesson.id)
    if (!lesson) continue
    
    const progress = progressData[stageLesson.id]
    if (isLessonLocked(lesson, progress)) continue
    
    if (isLessonComplete(lesson, progress)) {
      completeCount++
    } else {
      incompleteCount++
    }
  }
  
  return incompleteCount === 0 && completeCount > 0
}

const mergeProgressData = (
  lesson: Lesson,
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson => {
  const progress = progressData[lesson.id]
  return {
    ...lesson,
    isLocked: progress?.isLocked ?? lesson.isLocked,
    stars: progress?.stars ?? lesson.stars,
    isPassed: progress?.isPassed ?? lesson.isPassed
  }
}
