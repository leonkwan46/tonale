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

// Update lesson progress (CREATE/UPDATE) - 2nd Gen (V2 suffix for migration)
export const updateLessonProgressFn = httpsCallable<
  UpdateLessonProgressPayload,
  UserDataSuccessResponse
>(functions, 'updateLessonProgressV2')

// Get single lesson progress (READ) - 2nd Gen (V2 suffix for migration)
export const getLessonProgressFn = httpsCallable<
  GetLessonProgressPayload,
  LessonProgressResponse
>(functions, 'getLessonProgressV2')

// Get all lesson progress (READ ALL) - 2nd Gen (V2 suffix for migration)
export const getAllLessonProgressFn = httpsCallable<
  void,
  AllLessonProgressResponse
>(functions, 'getAllLessonProgressV2')

// Delete lesson progress (DELETE) - 2nd Gen (V2 suffix for migration)
export const deleteLessonProgressFn = httpsCallable<
  GetLessonProgressPayload,
  UserDataSuccessResponse
>(functions, 'deleteLessonProgressV2')

