import type { LessonProgress } from '@types'
import * as admin from 'firebase-admin'
import { DocumentSnapshot, FieldValue } from 'firebase-admin/firestore'

// ============================================================================
// FIRESTORE LAYER - Pure Firestore Operations (Data Access)
// ============================================================================

export interface LessonProgressInput {
  lessonId: string
  stars?: number
  isPassed?: boolean
  attempts: number
}

export interface UserProgressData {
  lessons: Record<string, LessonProgress>
}

/**
 * Get user document from Firestore
 */
export async function getUserDocument(userId: string): Promise<DocumentSnapshot> {
  return await admin.firestore().collection('users').doc(userId).get()
}

/**
 * Get user progress data from Firestore
 */
export async function getUserProgress(userId: string): Promise<UserProgressData | null> {
  const doc = await getUserDocument(userId)
  const userData = doc.data()
  return userData?.progress || null
}

/**
 * Get specific lesson progress from Firestore
 */
export async function getLessonProgressFromFirestore(
  userId: string,
  lessonId: string
): Promise<LessonProgress | null> {
  const progress = await getUserProgress(userId)
  return progress?.lessons?.[lessonId] || null
}

/**
 * Update lesson progress in Firestore
 */
export async function updateLessonProgressInFirestore(
  userId: string,
  lessonId: string,
  lessonProgress: LessonProgressInput
): Promise<void> {
  const userRef = admin.firestore().collection('users').doc(userId)
  
  // Add completedAt timestamp
  const progressWithTimestamp = {
    ...lessonProgress,
    completedAt: FieldValue.serverTimestamp()
  }
  
  await userRef.update({
    [`progress.lessons.${lessonId}`]: progressWithTimestamp,
    updatedAt: FieldValue.serverTimestamp()
  })
}

/**
 * Delete lesson progress from Firestore
 */
export async function deleteLessonProgressFromFirestore(
  userId: string,
  lessonId: string
): Promise<void> {
  const userRef = admin.firestore().collection('users').doc(userId)
  await userRef.update({
    [`progress.lessons.${lessonId}`]: FieldValue.delete(),
    updatedAt: FieldValue.serverTimestamp()
  })
}

