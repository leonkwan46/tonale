import { LESSON_PROGRESS_CACHE_KEY } from '@/constants/cache'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LessonProgressCache } from '@types'

let userProgressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }> = {}

export const getUserProgressData = (): Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }> => {
  return userProgressData
}

export const setUserProgressData = (data: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>): void => {
  userProgressData = data
}

export const clearUserProgressData = (): void => {
  userProgressData = {}
}

export const saveProgressCache = async (
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

export const loadProgressCache = async (userId: string): Promise<LessonProgressCache | null> => {
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

export const clearProgressCache = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(LESSON_PROGRESS_CACHE_KEY)
  } catch (error) {
    console.error('Failed to clear progress cache:', error)
  }
}

