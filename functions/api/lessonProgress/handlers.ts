import type {
  AllLessonProgressResponse,
  LessonProgressResponse,
  UpdateLessonProgressPayload,
  UserDataSuccessResponse
} from '@types'
import { HttpsError, onCall } from 'firebase-functions/v2/https'
import {
  deleteLessonProgressService,
  getAllLessonProgressService,
  getLessonProgressService,
  updateLessonProgressService
} from './service'

// ============================================================================
// HTTP HANDLERS LAYER - Thin Orchestration Layer (2nd Gen)
// ============================================================================

interface GetLessonProgressData {
  lessonId: string
}

/**
 * Update lesson progress HTTP handler (2nd Gen)
 */
export const updateLessonProgressV2 = onCall(
  async (request) => {
    // Authentication check
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = request.auth.uid
    const data = request.data as UpdateLessonProgressPayload

    try {
      // Delegate to service layer
      const result = await updateLessonProgressService(userId, data)
      return result as UserDataSuccessResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      // Map business logic errors to HTTP errors
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error updating lesson progress:', error)
      throw new HttpsError('internal', 'Failed to update lesson progress')
    }
  }
)

/**
 * Get single lesson progress HTTP handler (2nd Gen)
 */
export const getLessonProgressV2 = onCall(
  async (request) => {
    // Authentication check
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = request.auth.uid
    const data = request.data as GetLessonProgressData
    const { lessonId } = data

    try {
      // Delegate to service layer
      return await getLessonProgressService(userId, lessonId) as LessonProgressResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      // Map business logic errors to HTTP errors
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error fetching lesson progress:', error)
      throw new HttpsError('internal', 'Failed to fetch lesson progress')
    }
  }
)

/**
 * Get all lesson progress HTTP handler (2nd Gen)
 */
export const getAllLessonProgressV2 = onCall(
  async (request) => {
    // Authentication check
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = request.auth.uid

    try {
      // Delegate to service layer
      return await getAllLessonProgressService(userId) as AllLessonProgressResponse
    } catch (error) {
      console.error('Error fetching all lesson progress:', error)
      throw new HttpsError('internal', 'Failed to fetch lesson progress')
    }
  }
)

/**
 * Delete lesson progress HTTP handler (2nd Gen)
 */
export const deleteLessonProgressV2 = onCall(
  async (request) => {
    // Authentication check
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = request.auth.uid
    const data = request.data as GetLessonProgressData
    const { lessonId } = data

    try {
      // Delegate to service layer
      const result = await deleteLessonProgressService(userId, lessonId)
      return result as UserDataSuccessResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      // Map business logic errors to HTTP errors
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error deleting lesson progress:', error)
      throw new HttpsError('internal', 'Failed to delete lesson progress')
    }
  }
)

