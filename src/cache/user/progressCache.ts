import { STORAGE_KEYS, storage } from '../schema'
import type { LessonProgressCache } from '../schema'

const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000

export const saveProgressCache = async (
  userId: string,
  data: LessonProgressCache['data']
): Promise<void> => {
  const cache: LessonProgressCache = { userId, timestamp: Date.now(), data }
  await storage.setItem(STORAGE_KEYS.LESSON_PROGRESS_CACHE, cache)
}

export const loadProgressCache = async (
  userId: string
): Promise<LessonProgressCache | null> => {
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
