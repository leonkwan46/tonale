import type {
  AllLessonProgressResponse,
  LessonProgress,
  LessonProgressResponse,
  UpdateLessonProgressPayload,
  UserDataSuccessResponse
} from '@types'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

// Export types for convenience
export type {
  AllLessonProgressResponse,
  LessonProgress,
  LessonProgressResponse,
  UpdateLessonProgressPayload
}

// ============================================================================
// CLIENT-SIDE WRAPPERS FOR LESSON PROGRESS CRUD
// ============================================================================

export interface GetLessonProgressPayload {
  lessonId: string
}

// Update lesson progress (CREATE/UPDATE)
export const updateLessonProgressFn = httpsCallable<
  UpdateLessonProgressPayload,
  UserDataSuccessResponse
>(functions, 'updateLessonProgress')

// Get single lesson progress (READ)
export const getLessonProgressFn = httpsCallable<
  GetLessonProgressPayload,
  LessonProgressResponse
>(functions, 'getLessonProgress')

// Get all lesson progress (READ ALL)
export const getAllLessonProgressFn = httpsCallable<
  void,
  AllLessonProgressResponse
>(functions, 'getAllLessonProgress')

// Delete lesson progress (DELETE)
export const deleteLessonProgressFn = httpsCallable<
  GetLessonProgressPayload,
  UserDataSuccessResponse
>(functions, 'deleteLessonProgress')

