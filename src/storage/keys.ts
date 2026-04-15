export const STORAGE_KEYS = {
  LESSON_PROGRESS_CACHE: 'lesson_progress_cache',
  LAST_LESSON_ACCESS: 'last_lesson_access',

  // App preferences
  THEME_MODE: 'theme_mode',
  DONATION_ANIMATION_PLAYED: 'donation_animation_played',

  // User cache
  ONBOARDING_COMPLETED: 'onboarding_completed'
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]
