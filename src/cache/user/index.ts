import { STORAGE_KEYS, storage } from '../schema'

export * from './progress'
export * from './lastLesson'
export * from './onboarding'

export const clearAll = async (): Promise<void> => {
  await storage.removeItems([
    STORAGE_KEYS.LESSON_PROGRESS_CACHE,
    STORAGE_KEYS.LAST_LESSON_ACCESS,
    STORAGE_KEYS.ONBOARDING_COMPLETED
  ])
}
