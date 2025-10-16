import { getAllLessonProgressFn, updateLessonProgressFn } from '@/config/firebase/functions/lessonProgress'
import { LESSON_PROGRESS_CACHE_KEY, PROGRESS_CACHE_DURATION } from '@/constants/cache'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LessonProgressCache } from '@types'
import { refreshStageUnlockStatus, stagesArray } from './stages/stageDataHelpers'
import { Stage, StageLesson } from './types'

let userProgressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }> = {}
let lastProgressFetch: number = 0
let currentUserId: string = ''

const saveProgressCache = async (
  userId: string, 
  data: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Promise<void> => {
  try {
    const cache: LessonProgressCache = {
      userId,
      timestamp: Date.now(),
      data
    }
    await AsyncStorage.setItem(LESSON_PROGRESS_CACHE_KEY, JSON.stringify(cache))
  } catch (error) {
    console.error('Failed to save progress to device cache:', error)
  }
}
const loadProgressCache = async (userId: string): Promise<LessonProgressCache | null> => {
  try {
    const cached = await AsyncStorage.getItem(LESSON_PROGRESS_CACHE_KEY)
    if (!cached) return null
    
    const cache: LessonProgressCache = JSON.parse(cached)
    
    if (cache.userId !== userId) {
      await clearProgressCache()
      return null
    }
    
    return cache
  } catch (error) {
    console.error('Failed to load progress from device cache:', error)
    return null
  }
}
const clearProgressCache = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(LESSON_PROGRESS_CACHE_KEY)
  } catch (error) {
    console.error('Failed to clear progress cache:', error)
  }
}
export const initializeUserProgress = async (userId: string): Promise<void> => {
  try {
    currentUserId = userId
    
    const cachedData = await loadProgressCache(userId)
    if (cachedData) {
      userProgressData = cachedData.data
      lastProgressFetch = cachedData.timestamp
      syncProgressDataToStages()
      refreshStageUnlockStatus()
    }
    
    const result = await getAllLessonProgressFn()
    
    if (result.data.success) {
      const lessonsData = result.data.data
      userProgressData = Object.keys(lessonsData).reduce((acc, lessonId) => {
        const lessonProgress = lessonsData[lessonId]
        acc[lessonId] = {
          isLocked: false,
          stars: lessonProgress.stars,
          isPassed: lessonProgress.isPassed
        }
        return acc
      }, {} as Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>)
      
      lastProgressFetch = Date.now()
      syncProgressDataToStages()
      refreshStageUnlockStatus()
      await saveProgressCache(userId, userProgressData)
    }
  } catch (error) {
    console.error('Failed to fetch user progress:', error)
    if (Object.keys(userProgressData).length === 0) {
      userProgressData = {}
      lastProgressFetch = Date.now()
    }
  }
}

export const refreshUserProgress = async (userId: string): Promise<void> => {
  const now = Date.now()
  const shouldRefresh = (now - lastProgressFetch) > PROGRESS_CACHE_DURATION
  
  if (shouldRefresh || Object.keys(userProgressData).length === 0) {
    await initializeUserProgress(userId)
  }
}
export const forceRefreshProgress = async (): Promise<void> => {
  if (!currentUserId) return
  
  try {
    const result = await getAllLessonProgressFn()
    
    if (result.data.success) {
      const lessonsData = result.data.data
      userProgressData = Object.keys(lessonsData).reduce((acc, lessonId) => {
        const lessonProgress = lessonsData[lessonId]
        acc[lessonId] = {
          isLocked: false,
          stars: lessonProgress.stars,
          isPassed: lessonProgress.isPassed
        }
        return acc
      }, {} as Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>)
      
      lastProgressFetch = Date.now()
      syncProgressDataToStages()
      refreshStageUnlockStatus()
      await saveProgressCache(currentUserId, userProgressData)
    }
  } catch (error) {
    console.error('Failed to force refresh progress:', error)
  }
}
export const getLessonProgress = (lessonId: string): { isLocked: boolean; stars?: number; isPassed?: boolean } => {
  if (userProgressData[lessonId]) {
    return userProgressData[lessonId]
  }
  
  return { 
    isLocked: true,
    stars: 0,
    isPassed: false
  }
}
export const updateLessonProgress = async (
  lessonId: string, 
  stars: number, 
  wrongAnswersCount: number = 0
): Promise<void> => {
  const validStars = Math.max(0, Math.min(3, stars))
  
  userProgressData[lessonId] = { 
    isLocked: false, 
    stars: validStars
  }
  
  updateLessonDataInStages(lessonId, { stars: validStars })
  syncProgressDataToStages()
  refreshStageUnlockStatus()
  
  try {
    await updateLessonProgressFn({
      lessonId,
      lessonType: 'regular',
      stars: validStars,
      wrongAnswersCount
    })
    
    if (currentUserId) {
      await saveProgressCache(currentUserId, userProgressData)
    }
  } catch (error) {
    console.error('Failed to sync progress to backend:', error)
  }
}
export const updateFinalTestProgress = async (
  lessonId: string, 
  isPassed: boolean,
  wrongAnswersCount: number = 0
): Promise<void> => {
  userProgressData[lessonId] = { 
    isLocked: false, 
    isPassed: isPassed 
  }
  
  updateLessonDataInStages(lessonId, { isPassed })
  syncProgressDataToStages()
  refreshStageUnlockStatus()
  
  try {
    await updateLessonProgressFn({
      lessonId,
      lessonType: 'finalTest',
      isPassed,
      wrongAnswersCount
    })
    
    if (currentUserId) {
      await saveProgressCache(currentUserId, userProgressData)
    }
  } catch (error) {
    console.error('Failed to sync final test progress to backend:', error)
  }
}
const updateLessonDataInStages = (lessonId: string, progressData: { stars?: number; isPassed?: boolean }): void => {
  stagesArray.forEach((stage: Stage) => {
    stage.lessons.forEach((lesson: StageLesson) => {
      if (lesson.id === lessonId) {
        if (progressData.stars !== undefined) {
          lesson.stars = progressData.stars
        }
        if (progressData.isPassed !== undefined) {
          lesson.isPassed = progressData.isPassed
        }
      }
    })
  })
}

const syncProgressDataToStages = (): void => {
  stagesArray.forEach((stage: Stage) => {
    stage.lessons.forEach((lesson: StageLesson) => {
      const progressData = userProgressData[lesson.id]
      if (progressData) {
        lesson.isLocked = progressData.isLocked
        lesson.stars = progressData.stars
        lesson.isPassed = progressData.isPassed
      }
    })
    
    const regularLessons = stage.lessons.filter(lesson => !lesson.isFinalTest)
    const finalTest = stage.lessons.find(lesson => lesson.isFinalTest)
    
    stage.totalStars = regularLessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
    stage.isCleared = finalTest ? (finalTest.isPassed === true) : false
  })
}
export const clearUserProgress = async (): Promise<void> => {
  userProgressData = {}
  lastProgressFetch = 0
  currentUserId = ''
  await clearProgressCache()
}

export const isProgressLoaded = (): boolean => {
  return Object.keys(userProgressData).length > 0
}

export const getCacheStatus = (): { isStale: boolean; lastFetch: number } => {
  const now = Date.now()
  const isStale = (now - lastProgressFetch) > PROGRESS_CACHE_DURATION
  return { isStale, lastFetch: lastProgressFetch }
}

