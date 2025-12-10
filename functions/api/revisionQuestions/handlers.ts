import type {
  RevisionQuestionsResponse,
  StoreRevisionQuestionPayload,
  StoreRevisionQuestionResponse,
  StoreRevisionQuestionsPayload
} from '@types'
import * as functions from 'firebase-functions/v1'
import {
  deleteRevisionQuestionService,
  deleteRevisionQuestionsByLessonService,
  getRevisionQuestionsService,
  storeRevisionQuestionService,
  storeRevisionQuestionsService
} from './service'

export const storeRevisionQuestion = functions.https.onCall(
  async (data: StoreRevisionQuestionPayload, context) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid

    try {
      return await storeRevisionQuestionService(userId, data) as StoreRevisionQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error storing revision question:', error)
      throw new functions.https.HttpsError('internal', 'Failed to store revision question')
    }
  }
)

export const getRevisionQuestions = functions.https.onCall(
  async (_data: Record<string, never>, context) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid

    try {
      return await getRevisionQuestionsService(userId) as RevisionQuestionsResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error fetching revision questions:', error)
      throw new functions.https.HttpsError('internal', 'Failed to fetch revision questions')
    }
  }
)

export const deleteRevisionQuestion = functions.https.onCall(
  async (data: { id: string }, context) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid
    const { id } = data

    try {
      return await deleteRevisionQuestionService(userId, id) as StoreRevisionQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error deleting revision question:', error)
      throw new functions.https.HttpsError('internal', 'Failed to delete revision question')
    }
  }
)

export const deleteRevisionQuestionsByLesson = functions.https.onCall(
  async (data: { lessonId: string }, context) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid
    const { lessonId } = data

    try {
      return await deleteRevisionQuestionsByLessonService(userId, lessonId) as StoreRevisionQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error deleting revision questions by lesson:', error)
      throw new functions.https.HttpsError('internal', 'Failed to delete revision questions')
    }
  }
)

export const storeRevisionQuestions = functions.https.onCall(
  async (data: StoreRevisionQuestionsPayload, context) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid

    try {
      return await storeRevisionQuestionsService(userId, data) as StoreRevisionQuestionResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      if (errorMessage.includes('required') || errorMessage.includes('must be')) {
        throw new functions.https.HttpsError('invalid-argument', errorMessage)
      }
      
      console.error('Error storing revision questions:', error)
      throw new functions.https.HttpsError('internal', 'Failed to store revision questions')
    }
  }
)

