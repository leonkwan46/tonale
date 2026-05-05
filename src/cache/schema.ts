import { createTypedStorage } from './adapter'

export const STORAGE_KEYS = {
  LESSON_PROGRESS_CACHE: 'lesson_progress_cache',
  LAST_LESSON_ACCESS: 'last_lesson_access',
  THEME_MODE: 'theme_mode',
  DONATION_ANIMATION_PLAYED: 'donation_animation_played',
  ONBOARDING_COMPLETED: 'onboarding_completed'
} as const

export interface LessonProgressCache {
  userId: string
  timestamp: number
  data: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
}

export interface LastLessonAccess {
  lessonId: string
  timestamp: number
}

interface StorageValueMap extends Record<string, unknown> {
  [STORAGE_KEYS.LESSON_PROGRESS_CACHE]: LessonProgressCache
  [STORAGE_KEYS.LAST_LESSON_ACCESS]: LastLessonAccess
  [STORAGE_KEYS.THEME_MODE]: boolean
  [STORAGE_KEYS.DONATION_ANIMATION_PLAYED]: boolean
  [STORAGE_KEYS.ONBOARDING_COMPLETED]: boolean
}

export const storage = createTypedStorage<StorageValueMap>()
