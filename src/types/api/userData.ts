import type { Timestamp } from 'firebase/firestore'
import type { LessonProgress } from './lessons'

export type UserGender = 'male' | 'female'

export type UserInstrument = 'piano' | 'guitar' | 'violin' | 'drums' | 'flute' | 'saxophone' | 'trumpet' | 'cello' | 'other'

export interface UserProfile {
  email: string
  onboardingCompleted?: boolean
  gender?: UserGender
  instrument?: UserInstrument
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

export interface CreateUserDataResponse {
  success: boolean
  message: string
  data: UserProfile
}

export interface UpdateUserDataResponse {
  success: boolean
  message: string
  data: UserProfile
}

export interface GetUserDataResponse {
  success: boolean
  data: UserProfile
}

