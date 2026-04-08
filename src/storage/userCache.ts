import { STORAGE_KEYS, storage } from './storage'
import type { LessonProgressCache, LastLessonAccess } from './valueMap'

// Cache is considered stale after 24 hours (in milliseconds)
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000

export const saveProgressCache = async (
  userId: string,
  data: LessonProgressCache['data']
): Promise<void> => {
  const cache: LessonProgressCache = { userId, timestamp: Date.now(), data }
  await storage.setItem(STORAGE_KEYS.LESSON_PROGRESS_CACHE, cache)
}

export const loadProgressCache = async (userId: string): Promise<LessonProgressCache | null> => {
  const cache = await storage.getItem(STORAGE_KEYS.LESSON_PROGRESS_CACHE)
  if (!cache) return null

  if (cache.userId !== userId) {
    await clearProgressCache()
    return null
  }

  const cacheAge = Date.now() - cache.timestamp
  if (!Number.isFinite(cacheAge) || cacheAge > CACHE_MAX_AGE_MS) {
    await clearProgressCache()
    return null
  }

  return cache
}

export const clearProgressCache = async (): Promise<void> => {
  await storage.removeItem(STORAGE_KEYS.LESSON_PROGRESS_CACHE)
}

export const trackLessonAccess = async (lessonId: string): Promise<void> => {
  const accessData: LastLessonAccess = { lessonId, timestamp: Date.now() }
  await storage.setItem(STORAGE_KEYS.LAST_LESSON_ACCESS, accessData)
}

export const getLastLessonAccess = async (): Promise<LastLessonAccess | null> => {
  return await storage.getItem(STORAGE_KEYS.LAST_LESSON_ACCESS)
}

export const setOnboardingCompleted = async (value: boolean): Promise<void> => {
  await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, value)
}

export const getOnboardingCompleted = async (): Promise<boolean | null> => {
  return await storage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED)
}

export const clearUserCache = async (): Promise<void> => {
  await storage.removeItems([
    STORAGE_KEYS.LESSON_PROGRESS_CACHE,
    STORAGE_KEYS.LAST_LESSON_ACCESS,
    STORAGE_KEYS.ONBOARDING_COMPLETED
  ])
}

