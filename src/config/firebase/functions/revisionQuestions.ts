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

// 2nd Gen functions (V2 suffix for migration)
export const storeRevisionQuestionFn = httpsCallable<
  StoreRevisionQuestionPayload,
  StoreRevisionQuestionResponse
>(functions, 'storeRevisionQuestionV2')

export const storeRevisionQuestionsFn = httpsCallable<
  StoreRevisionQuestionsPayload,
  StoreRevisionQuestionResponse
>(functions, 'storeRevisionQuestionsV2')

export const getRevisionQuestionsFn = httpsCallable<
  Record<string, never>,
  RevisionQuestionsResponse
>(functions, 'getRevisionQuestionsV2')

export const deleteRevisionQuestionFn = httpsCallable<
  { id: string },
  StoreRevisionQuestionResponse
>(functions, 'deleteRevisionQuestionV2')

export const deleteRevisionQuestionsFn = httpsCallable<
  { ids: string[] },
  StoreRevisionQuestionResponse
>(functions, 'deleteRevisionQuestionsV2')

export const deleteRevisionQuestionsByLessonFn = httpsCallable<
  { lessonId: string },
  StoreRevisionQuestionResponse
>(functions, 'deleteRevisionQuestionsByLessonV2')
