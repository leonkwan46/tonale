import type {
  FailedQuestionsResponse,
  StoreFailedQuestionPayload,
  StoreFailedQuestionResponse,
  StoreFailedQuestionsPayload
} from '@types'
import * as functions from 'firebase-functions/v1'
import {
  deleteFailedQuestionService,
  deleteFailedQuestionsByLessonService,
  getFailedQuestionsService,
  storeFailedQuestionService,
  storeFailedQuestionsService
} from './service'

export const storeFailedQuestion = functions.https.onCall(
  async (data: StoreFailedQuestionPayload, context) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid

    try {
      return await storeFailedQuestionService(userId, data) as StoreFailedQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error storing failed question:', error)
      throw new functions.https.HttpsError('internal', 'Failed to store failed question')
    }
  }
)

export const getFailedQuestions = functions.https.onCall(
  async (_data: Record<string, never>, context) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid

    try {
      return await getFailedQuestionsService(userId) as FailedQuestionsResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error fetching failed questions:', error)
      throw new functions.https.HttpsError('internal', 'Failed to fetch failed questions')
    }
  }
)

export const deleteFailedQuestion = functions.https.onCall(
  async (data: { id: string }, context) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid
    const { id } = data

    try {
      return await deleteFailedQuestionService(userId, id) as StoreFailedQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error deleting failed question:', error)
      throw new functions.https.HttpsError('internal', 'Failed to delete failed question')
    }
  }
)

export const deleteFailedQuestionsByLesson = functions.https.onCall(
  async (data: { lessonId: string }, context) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid
    const { lessonId } = data

    try {
      return await deleteFailedQuestionsByLessonService(userId, lessonId) as StoreFailedQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error deleting failed questions by lesson:', error)
      throw new functions.https.HttpsError('internal', 'Failed to delete failed questions')
    }
  }
)

export const storeFailedQuestions = functions.https.onCall(
  async (data: StoreFailedQuestionsPayload, context) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid

    try {
      return await storeFailedQuestionsService(userId, data) as StoreFailedQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error storing failed questions:', error)
      throw new functions.https.HttpsError('internal', 'Failed to store failed questions')
    }
  }
)

