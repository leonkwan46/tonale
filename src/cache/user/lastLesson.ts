import { STORAGE_KEYS, storage } from '../schema'
import type { LastLesson } from '../schema'

export const setLastLesson = async (lessonId: string): Promise<void> => {
  const accessData: LastLesson = { lessonId, timestamp: Date.now() }
  await storage.setItem(STORAGE_KEYS.LAST_LESSON_ACCESS, accessData)
}

export const getLastLesson = async (): Promise<LastLesson | null> => {
  return storage.getItem(STORAGE_KEYS.LAST_LESSON_ACCESS)
}
