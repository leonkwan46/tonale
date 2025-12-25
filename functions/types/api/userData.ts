import type { Timestamp } from 'firebase/firestore'
import type { LessonProgress } from './lessons'

export interface StageProgress {
  isUnlocked: boolean
  isCleared: boolean
  totalStars: number
}

export interface ProgressData {
  lessons: Record<string, LessonProgress>
  stages?: Record<string, StageProgress>
}

export interface UserProfile {
  email: string
  progress?: ProgressData
  streakDay?: number
  lastLoginDate?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface UserDataSuccessResponse {
  success: boolean
  message: string
}

export interface GetUserDataResponse {
  success: boolean
  data: UserProfile
}

