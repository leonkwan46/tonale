import type { Timestamp } from 'firebase/firestore'
import type { Question } from '../lesson'

export interface RevisionQuestion extends Question {
  lessonId: string
  failedAt: Timestamp
  correctCount?: number
}

export interface StoreRevisionQuestionPayload extends Question {
  lessonId: string
  correctCount?: number
}

export interface StoreRevisionQuestionsPayload {
  questions: StoreRevisionQuestionPayload[]
}

export interface RevisionQuestionsResponse {
  success: boolean
  data: RevisionQuestion[]
}

export interface StoreRevisionQuestionResponse {
  success: boolean
  message: string
}

