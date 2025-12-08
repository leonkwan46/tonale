import type { Timestamp } from 'firebase/firestore'
import type { Question } from '../curriculum/types'

export type VisualComponentData = Record<string, unknown>

export interface FailedQuestion extends Question {
  lessonId: string
  failedAt: Timestamp
}

export interface StoreFailedQuestionPayload extends Omit<Question, 'visualComponent'> {
  lessonId: string
  visualComponent?: VisualComponentData
}

export interface StoreFailedQuestionsPayload {
  questions: StoreFailedQuestionPayload[]
}

export interface FailedQuestionsResponse {
  success: boolean
  data: FailedQuestion[]
}

export interface StoreFailedQuestionResponse {
  success: boolean
  message: string
}

