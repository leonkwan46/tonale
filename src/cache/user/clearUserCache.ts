import { STORAGE_KEYS, storage } from '../schema'

export const clearUserCache = async (): Promise<void> => {
  await storage.removeItems([
    STORAGE_KEYS.LESSON_PROGRESS_CACHE,
    STORAGE_KEYS.LAST_LESSON_ACCESS,
    STORAGE_KEYS.ONBOARDING_COMPLETED
  ])
}
