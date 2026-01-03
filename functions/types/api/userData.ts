import type { Timestamp } from 'firebase/firestore'
import type { LessonProgress } from './lessons'

export type UserGender = 'male' | 'female'

export type UserInstrument = 'piano' | 'guitar' | 'violin' | 'drums' | 'flute' | 'saxophone' | 'trumpet' | 'cello' | 'vocal' | 'other'

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
  onboardingCompleted?: boolean
  gender?: UserGender
  name?: string
  instrument?: UserInstrument | string // Allow custom instrument strings
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

