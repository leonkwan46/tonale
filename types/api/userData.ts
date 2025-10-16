// ============================================================================
// USER DATA TYPES (Backend/API)
// User profile and progress data structures
// ============================================================================

// Note: LessonProgress is exported from lessons.ts, no need to re-export here

// Stage progress data model
export interface StageProgress {
  isUnlocked: boolean
  isCleared: boolean
  totalStars: number
}

// Structured progress data
export interface ProgressData {
  lessons: Record<string, import('./lessons').LessonProgress>  // lessonId -> progress
  stages?: Record<string, StageProgress>   // stageId -> progress
}

// User profile data model
export interface UserProfile {
  email: string
  progress?: ProgressData
  createdAt?: any // Firestore Timestamp
  updatedAt?: any // Firestore Timestamp
}

// Response types for user data operations
export interface UserDataSuccessResponse {
  success: boolean
  message: string
}

export interface GetUserDataResponse {
  success: boolean
  data: UserProfile
}

// Note: Lesson progress response types are exported from lessons.ts
// Access via: import { LessonProgressResponse } from '@types'

