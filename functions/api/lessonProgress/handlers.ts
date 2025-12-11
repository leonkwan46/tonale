import type {
  AllLessonProgressResponse,
  LessonProgressResponse,
  UpdateLessonProgressPayload,
  UserDataSuccessResponse
} from '@types'
import * as functions from 'firebase-functions/v1'
import {
  deleteLessonProgressService,
  getAllLessonProgressService,
  getLessonProgressService,
  updateLessonProgressService
} from './service'

// ============================================================================
// HTTP HANDLERS LAYER - Thin Orchestration Layer
// ============================================================================

interface GetLessonProgressData {
  lessonId: string
}

/**
 * Update lesson progress HTTP handler
 */
export const updateLessonProgress = functions.https.onCall(
  async (data: UpdateLessonProgressPayload, context) => {
    // Authentication check
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid

    try {
      // Delegate to service layer
      const result = await updateLessonProgressService(userId, data)
      return result as UserDataSuccessResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      // Map business logic errors to HTTP errors
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error updating lesson progress:', error)
      throw new functions.https.HttpsError('internal', 'Failed to update lesson progress')
    }
  }
)

/**
 * Get single lesson progress HTTP handler
 */
export const getLessonProgress = functions.https.onCall(
  async (data: GetLessonProgressData, context) => {
    // Authentication check
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid
    const { lessonId } = data

    try {
      // Delegate to service layer
      return await getLessonProgressService(userId, lessonId) as LessonProgressResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      // Map business logic errors to HTTP errors
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error fetching lesson progress:', error)
      throw new functions.https.HttpsError('internal', 'Failed to fetch lesson progress')
    }
  }
)

/**
 * Get all lesson progress HTTP handler
 */
export const getAllLessonProgress = functions.https.onCall(
  async (data: any, context) => {
    // Authentication check
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid

    try {
      // Delegate to service layer
      return await getAllLessonProgressService(userId) as AllLessonProgressResponse
    } catch (error) {
      console.error('Error fetching all lesson progress:', error)
      throw new functions.https.HttpsError('internal', 'Failed to fetch lesson progress')
    }
  }
)

/**
 * Delete lesson progress HTTP handler
 */
export const deleteLessonProgress = functions.https.onCall(
  async (data: GetLessonProgressData, context) => {
    // Authentication check
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid
    const { lessonId } = data

    try {
      // Delegate to service layer
      const result = await deleteLessonProgressService(userId, lessonId)
      return result as UserDataSuccessResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      // Map business logic errors to HTTP errors
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error deleting lesson progress:', error)
      throw new functions.https.HttpsError('internal', 'Failed to delete lesson progress')
    }
  }
)

