import { STORAGE_KEYS, storage } from '../schema'
import type { LessonProgress } from '../schema'

const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000

export const saveProgress = async (
  userId: string,
  data: LessonProgress['data']
): Promise<void> => {
  const cache: LessonProgress = { userId, timestamp: Date.now(), data }
  await storage.setItem(STORAGE_KEYS.LESSON_PROGRESS_CACHE, cache)
}

export const loadProgress = async (
  userId: string
): Promise<LessonProgress | null> => {
  const cache = await storage.getItem(STORAGE_KEYS.LESSON_PROGRESS_CACHE)
  if (!cache) return null

  if (cache.userId !== userId) {
    await clearProgress()
    return null
  }

  const cacheAge = Date.now() - cache.timestamp

  if (!Number.isFinite(cacheAge) || cacheAge > CACHE_MAX_AGE_MS) {
    await clearProgress()
    return null
  }

  return cache
}

export const clearProgress = async (): Promise<void> => {
  await storage.removeItem(STORAGE_KEYS.LESSON_PROGRESS_CACHE)
}
