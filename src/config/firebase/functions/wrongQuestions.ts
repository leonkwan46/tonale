import type {
    FailedQuestion,
    FailedQuestionsResponse,
    StoreFailedQuestionPayload,
    StoreFailedQuestionsPayload,
    StoreFailedQuestionResponse
} from '@types'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

export type {
    FailedQuestion, FailedQuestionsResponse,
    StoreFailedQuestionPayload,
    StoreFailedQuestionsPayload,
    StoreFailedQuestionResponse
}

export const storeFailedQuestionFn = httpsCallable<
  StoreFailedQuestionPayload,
  StoreFailedQuestionResponse
>(functions, 'storeFailedQuestion')

export const storeFailedQuestionsFn = httpsCallable<
  StoreFailedQuestionsPayload,
  StoreFailedQuestionResponse
>(functions, 'storeFailedQuestions')

export const getFailedQuestionsFn = httpsCallable<
  Record<string, never>,
  FailedQuestionsResponse
>(functions, 'getFailedQuestions')

export const deleteFailedQuestionFn = httpsCallable<
  { id: string },
  StoreFailedQuestionResponse
>(functions, 'deleteFailedQuestion')

export const deleteFailedQuestionsByLessonFn = httpsCallable<
  { lessonId: string },
  StoreFailedQuestionResponse
>(functions, 'deleteFailedQuestionsByLesson')
