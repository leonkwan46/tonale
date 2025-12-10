import type {
    RevisionQuestion,
    RevisionQuestionsResponse,
    StoreRevisionQuestionPayload,
    StoreRevisionQuestionResponse,
    StoreRevisionQuestionsPayload
} from '@types'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

export type {
    RevisionQuestion, RevisionQuestionsResponse,
    StoreRevisionQuestionPayload, StoreRevisionQuestionResponse, StoreRevisionQuestionsPayload
}

export const storeRevisionQuestionFn = httpsCallable<
  StoreRevisionQuestionPayload,
  StoreRevisionQuestionResponse
>(functions, 'storeRevisionQuestion')

export const storeRevisionQuestionsFn = httpsCallable<
  StoreRevisionQuestionsPayload,
  StoreRevisionQuestionResponse
>(functions, 'storeRevisionQuestions')

export const getRevisionQuestionsFn = httpsCallable<
  Record<string, never>,
  RevisionQuestionsResponse
>(functions, 'getRevisionQuestions')

export const deleteRevisionQuestionFn = httpsCallable<
  { id: string },
  StoreRevisionQuestionResponse
>(functions, 'deleteRevisionQuestion')

export const deleteRevisionQuestionsByLessonFn = httpsCallable<
  { lessonId: string },
  StoreRevisionQuestionResponse
>(functions, 'deleteRevisionQuestionsByLesson')
