import { LESSON_PROGRESS_CACHE_KEY } from '@/constants/cache'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LessonProgressCache } from '@types'

let userProgressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }> = {}
let progressInitialized = false

export const getUserProgressData = (): Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }> => {
  return userProgressData
}

export const setUserProgressData = (data: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>): void => {
  userProgressData = data
}

export const clearUserProgressData = (): void => {
  userProgressData = {}
  progressInitialized = false
}

export const markProgressInitialized = (): void => {
  progressInitialized = true
}

export const isProgressInitialized = (): boolean => {
  return progressInitialized
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

// Cache is considered stale after 24 hours (in milliseconds)
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000

export const loadProgressCache = async (userId: string): Promise<LessonProgressCache | null> => {
  try {
    const cached = await AsyncStorage.getItem(LESSON_PROGRESS_CACHE_KEY)
    if (!cached) return null
    
    const cache: LessonProgressCache = JSON.parse(cached)
    
    // Validate user ID matches
    if (cache.userId !== userId) {
      await clearProgressCache()
      return null
    }
    
    // Validate cache freshness
    if (cache.timestamp) {
      const cacheAge = Date.now() - cache.timestamp
      if (cacheAge > CACHE_MAX_AGE_MS) {
        // Cache is stale, clear it and return null
        console.log('Cache is stale, clearing it')
        await clearProgressCache()
        return null
      }
    } else {
      // Cache has no timestamp, consider it invalid
      console.log('Cache has no timestamp, clearing it')
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

