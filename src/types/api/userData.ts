import type { Timestamp } from 'firebase/firestore'
import type { LessonProgress } from './lessons'

export interface UserProfile {
  email: string
  progress?: {
    lessons: Record<string, LessonProgress>
    stages?: Record<string, {
      isUnlocked: boolean
      isCleared: boolean
      totalStars: number
    }>
  }
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

