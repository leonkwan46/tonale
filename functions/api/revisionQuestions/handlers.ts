import type {
    RevisionQuestionsResponse,
    StoreRevisionQuestionPayload,
    StoreRevisionQuestionResponse,
    StoreRevisionQuestionsPayload
} from '@types'
import { onCall, HttpsError } from 'firebase-functions/v2/https'
import {
    deleteRevisionQuestionService,
    deleteRevisionQuestionsByLessonService,
    deleteRevisionQuestionsService,
    getRevisionQuestionsService,
    storeRevisionQuestionService,
    storeRevisionQuestionsService
} from './service'

export const storeRevisionQuestionV2 = onCall(
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = request.auth.uid
    const data = request.data as StoreRevisionQuestionPayload

    try {
      return await storeRevisionQuestionService(userId, data) as StoreRevisionQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error storing revision question:', error)
      throw new HttpsError('internal', 'Failed to store revision question')
    }
  }
)

export const getRevisionQuestionsV2 = onCall(
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = request.auth.uid

    try {
      return await getRevisionQuestionsService(userId) as RevisionQuestionsResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('must be')) {
        throw new HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error fetching revision questions:', error)
      throw new HttpsError('internal', 'Failed to fetch revision questions')
    }
  }
)

export const deleteRevisionQuestionV2 = onCall(
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = request.auth.uid
    const data = request.data as { id: string }
    const { id } = data

    try {
      return await deleteRevisionQuestionService(userId, id) as StoreRevisionQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error deleting revision question:', error)
      throw new HttpsError('internal', 'Failed to delete revision question')
    }
  }
)

export const deleteRevisionQuestionsV2 = onCall(
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = request.auth.uid
    const data = request.data as { ids: string[] }
    const { ids } = data

    try {
      return await deleteRevisionQuestionsService(userId, ids) as StoreRevisionQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error deleting revision questions:', error)
      throw new HttpsError('internal', 'Failed to delete revision questions')
    }
  }
)

export const deleteRevisionQuestionsByLessonV2 = onCall(
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = request.auth.uid
    const data = request.data as { lessonId: string }
    const { lessonId } = data

    try {
      return await deleteRevisionQuestionsByLessonService(userId, lessonId) as StoreRevisionQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error deleting revision questions by lesson:', error)
      throw new HttpsError('internal', 'Failed to delete revision questions')
    }
  }
)

export const storeRevisionQuestionsV2 = onCall(
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = request.auth.uid
    const data = request.data as StoreRevisionQuestionsPayload

    try {
      return await storeRevisionQuestionsService(userId, data) as StoreRevisionQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error storing revision questions:', error)
      // Include the actual error message for debugging
      const detailedMessage = error instanceof Error 
        ? `Failed to store revision questions: ${error.message}` 
        : 'Failed to store revision questions'
      throw new HttpsError('internal', detailedMessage)
    }
  }
)

