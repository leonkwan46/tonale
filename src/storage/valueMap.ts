import type { StorageKey, STORAGE_KEYS } from './keys'

export interface LessonProgressCache {
  userId: string
  timestamp: number
  data: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
}

export interface LastLessonAccess {
  lessonId: string
  timestamp: number
}

export interface StorageValueMap extends Record<StorageKey, unknown> {
  [STORAGE_KEYS.LESSON_PROGRESS_CACHE]: LessonProgressCache
  [STORAGE_KEYS.LAST_LESSON_ACCESS]: LastLessonAccess

  [STORAGE_KEYS.THEME_MODE]: boolean
  [STORAGE_KEYS.DONATION_ANIMATION_PLAYED]: boolean
  [STORAGE_KEYS.ONBOARDING_COMPLETED]: boolean
}
