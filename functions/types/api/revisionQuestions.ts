import type { Timestamp } from 'firebase/firestore'
import type { VisualComponent } from './visual'

export interface Question {
  id: string
  question: string
  correctAnswer: string
  choices: string[]
  explanation?: string
  type: 'multipleChoice' | 'trueFalse' | 'keyPress'
  visualComponent?: VisualComponent
}

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

