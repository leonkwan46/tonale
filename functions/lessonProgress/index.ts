import type {
    AllLessonProgressResponse,
    LessonProgressResponse,
    UpdateLessonProgressPayload,
    UserDataSuccessResponse
} from '@types'
import * as admin from 'firebase-admin'
import { DocumentSnapshot, FieldValue } from 'firebase-admin/firestore'
import * as functions from 'firebase-functions'
import type { CallableContext } from 'firebase-functions/v1/https'

// ============================================================================
// LESSON PROGRESS CRUD OPERATIONS
// ============================================================================

interface GetLessonProgressData {
  lessonId: string
}

// Update lesson progress (CREATE/UPDATE)
export const updateLessonProgress = functions.https.onCall(
  async (data: UpdateLessonProgressPayload, context: CallableContext) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid
    const { lessonId, lessonType, stars, isPassed, wrongAnswersCount } = data

    // Server-side validation
    if (!lessonId || typeof lessonId !== 'string') {
      throw new functions.https.HttpsError('invalid-argument', 'lessonId is required and must be a string')
    }

    if (!lessonType || !['regular', 'finalTest'].includes(lessonType)) {
      throw new functions.https.HttpsError('invalid-argument', 'lessonType must be "regular" or "finalTest"')
    }

    if (typeof wrongAnswersCount !== 'number' || wrongAnswersCount < 0) {
      throw new functions.https.HttpsError('invalid-argument', 'wrongAnswersCount must be a non-negative number')
    }

    // Type-specific validation
    if (lessonType === 'regular') {
      if (stars === undefined || typeof stars !== 'number' || stars < 0 || stars > 3) {
        throw new functions.https.HttpsError('invalid-argument', 'Regular lessons require stars (0-3)')
      }
    } else if (lessonType === 'finalTest') {
      if (isPassed === undefined || typeof isPassed !== 'boolean') {
        throw new functions.https.HttpsError('invalid-argument', 'Final tests require isPassed (boolean)')
      }
    }

    try {
      const userRef = admin.firestore().collection('users').doc(userId)
      const userDoc = await userRef.get()

      // Get current progress data
      const userData = userDoc.data()
      const currentProgress = userData?.progress || { lessons: {} }
      const currentLessonProgress = currentProgress.lessons?.[lessonId]

      // Build lesson progress object - simple and flexible
      const updatedLessonProgress: any = {
        lessonId,
        wrongAnswersCount,
        attempts: currentLessonProgress?.attempts ? currentLessonProgress.attempts + 1 : 1,
        completedAt: FieldValue.serverTimestamp(),
        lastAttemptAt: FieldValue.serverTimestamp()
      }

      // Add type-specific fields
      if (lessonType === 'regular') {
        updatedLessonProgress.stars = stars!
      } else if (lessonType === 'finalTest') {
        updatedLessonProgress.isPassed = isPassed!
      }

      // Update user document
      await userRef.update({
        [`progress.lessons.${lessonId}`]: updatedLessonProgress,
        updatedAt: FieldValue.serverTimestamp()
      })

      console.log(`✅ Updated ${lessonType} lesson progress for user ${userId}, lesson ${lessonId}`)

      return { 
        success: true, 
        message: 'Lesson progress updated successfully' 
      } as UserDataSuccessResponse
    } catch (error) {
      console.error('Error updating lesson progress:', error)
      throw new functions.https.HttpsError('internal', 'Failed to update lesson progress')
    }
  }
)

// Get single lesson progress (READ)
export const getLessonProgress = functions.https.onCall(
  async (data: GetLessonProgressData, context: CallableContext) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid
    const { lessonId } = data

    if (!lessonId || typeof lessonId !== 'string') {
      throw new functions.https.HttpsError('invalid-argument', 'lessonId is required and must be a string')
    }

    try {
      const doc = await admin.firestore()
        .collection('users')
        .doc(userId)
        .get() as DocumentSnapshot

      const userData = doc.data()
      const lessonProgress = userData?.progress?.lessons?.[lessonId] || {
        lessonId,
        stars: 0,
        isPassed: false,
        attempts: 0
      }

      return { 
        success: true, 
        data: lessonProgress 
      } as LessonProgressResponse
    } catch (error) {
      console.error('Error fetching lesson progress:', error)
      throw new functions.https.HttpsError('internal', 'Failed to fetch lesson progress')
    }
  }
)

// Get all lesson progress (READ ALL)
export const getAllLessonProgress = functions.https.onCall(
  async (data: any, context: CallableContext) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid

    try {
      const doc = await admin.firestore()
        .collection('users')
        .doc(userId)
        .get() as DocumentSnapshot

      const userData = doc.data()
      const allLessonProgress = userData?.progress?.lessons || {}

      console.log(`✅ Retrieved ${Object.keys(allLessonProgress).length} lesson progress records for user ${userId}`)

      return { 
        success: true, 
        data: allLessonProgress 
      } as AllLessonProgressResponse
    } catch (error) {
      console.error('Error fetching all lesson progress:', error)
      throw new functions.https.HttpsError('internal', 'Failed to fetch lesson progress')
    }
  }
)

// Delete lesson progress (DELETE - optional, for admin or reset)
export const deleteLessonProgress = functions.https.onCall(
  async (data: GetLessonProgressData, context: CallableContext) => {
    if (!context?.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    const userId = context.auth.uid
    const { lessonId } = data

    if (!lessonId || typeof lessonId !== 'string') {
      throw new functions.https.HttpsError('invalid-argument', 'lessonId is required and must be a string')
    }

    try {
      await admin.firestore()
        .collection('users')
        .doc(userId)
        .update({
          [`progress.lessons.${lessonId}`]: FieldValue.delete(),
          updatedAt: FieldValue.serverTimestamp()
        })

      console.log(`✅ Deleted lesson progress for user ${userId}, lesson ${lessonId}`)

      return { 
        success: true, 
        message: 'Lesson progress deleted successfully' 
      } as UserDataSuccessResponse
    } catch (error) {
      console.error('Error deleting lesson progress:', error)
      throw new functions.https.HttpsError('internal', 'Failed to delete lesson progress')
    }
  }
)

