import type {
  AllLessonProgressResponse,
  LessonProgress,
  LessonProgressResponse,
  UpdateLessonProgressPayload,
  UserDataSuccessResponse
} from '@types'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

export type {
  AllLessonProgressResponse,
  LessonProgress,
  LessonProgressResponse,
  UpdateLessonProgressPayload
}

export interface GetLessonProgressPayload {
  lessonId: string
}

export const updateLessonProgressFn = httpsCallable<
  UpdateLessonProgressPayload,
  UserDataSuccessResponse
>(functions, 'updateLessonProgress')

export const getLessonProgressFn = httpsCallable<
  GetLessonProgressPayload,
  LessonProgressResponse
>(functions, 'getLessonProgress')

export const getAllLessonProgressFn = httpsCallable<
  void,
  AllLessonProgressResponse
>(functions, 'getAllLessonProgress')

export const deleteLessonProgressFn = httpsCallable<
  GetLessonProgressPayload,
  UserDataSuccessResponse
>(functions, 'deleteLessonProgress')
