import { STORAGE_KEYS, storage } from '../schema'
import type { LastLessonAccess } from '../schema'

export const trackLessonAccess = async (lessonId: string): Promise<void> => {
  const accessData: LastLessonAccess = { lessonId, timestamp: Date.now() }
  await storage.setItem(STORAGE_KEYS.LAST_LESSON_ACCESS, accessData)
}

export const getLastLessonAccess = async (): Promise<LastLessonAccess | null> => {
  return storage.getItem(STORAGE_KEYS.LAST_LESSON_ACCESS)
}
