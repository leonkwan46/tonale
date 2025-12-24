import type { Timestamp } from 'firebase/firestore'

export type LessonType = 'regular' | 'finalTest'

export interface LessonProgress {
  lessonId: string
  attempts: number
  completedAt: Timestamp
  stars?: number
  isPassed?: boolean
}

export interface UpdateLessonProgressPayload {
  lessonId: string
  lessonType: LessonType
  stars?: number
  isPassed?: boolean
}

export interface LessonProgressResponse {
  success: boolean
  data: LessonProgress
}

export interface AllLessonProgressResponse {
  success: boolean
  data: Record<string, LessonProgress>
}

