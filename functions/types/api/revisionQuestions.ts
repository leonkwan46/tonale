import type { Timestamp } from 'firebase/firestore'
import type { VisualComponent } from './visual'

export interface QuestionInterface {
  type: 'playback'
  audioFile?: string | number
  rhythm?: number[]
  tempo?: number
}

export interface Question {
  id: string
  question: string
  correctAnswer: string | number[]
  choices: string[]
  explanation?: string
  type: 'multipleChoice' | 'trueFalse' | 'keyPress' | 'rhythmTap'
  visualComponent?: VisualComponent
  questionInterface?: QuestionInterface
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

