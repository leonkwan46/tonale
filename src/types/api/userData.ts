import type { Timestamp } from 'firebase/firestore'
import type { LessonProgress } from './lessons'

export type UserGender = 'male' | 'female'

export const INSTRUMENT = {
  PIANO: 'piano',
  GUITAR: 'guitar',
  VIOLIN: 'violin',
  VOCAL: 'vocal',
  OTHER: 'other'
} as const
export type UserInstrument = typeof INSTRUMENT[keyof typeof INSTRUMENT]

export interface UserProfile {
  email: string
  onboardingCompleted?: boolean
  gender?: UserGender
  instrument?: UserInstrument | string // Allow custom instrument strings
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

