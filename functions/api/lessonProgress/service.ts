import type {
  AllLessonProgressResponse,
  LessonProgress,
  LessonProgressResponse,
  UpdateLessonProgressPayload
} from '@types'
import type { LessonProgressInput } from './firestore'
import {
  deleteLessonProgressFromFirestore,
  getLessonProgressFromFirestore,
  getUserProgress,
  updateLessonProgressInFirestore
} from './firestore'

// ============================================================================
// BUSINESS LOGIC LAYER - Pure Business Logic (No Firebase Dependencies)
// ============================================================================

/**
 * Validate lesson progress update payload
 */
export function validateUpdateLessonProgressPayload(
  data: UpdateLessonProgressPayload
): void {
  const { lessonId, lessonType, stars, isPassed } = data

  if (!lessonId || typeof lessonId !== 'string') {
    throw new Error('lessonId is required and must be a string')
  }

  if (!lessonType || !['regular', 'finalTest'].includes(lessonType)) {
    throw new Error('lessonType must be "regular" or "finalTest"')
  }

  // Type-specific validation
  if (lessonType === 'regular') {
    if (stars === undefined || typeof stars !== 'number' || stars < 0 || stars > 3) {
      throw new Error('Regular lessons require stars (0-3)')
    }
  } else if (lessonType === 'finalTest') {
    if (isPassed === undefined || typeof isPassed !== 'boolean') {
      throw new Error('Final tests require isPassed (boolean)')
    }
  }
}

/**
 * Validate lesson ID
 */
export function validateLessonId(lessonId: any): void {
  if (!lessonId || typeof lessonId !== 'string') {
    throw new Error('lessonId is required and must be a string')
  }
}

/**
 * Build lesson progress object from payload (pure business logic, no Firebase)
 */
export function buildLessonProgress(
  payload: UpdateLessonProgressPayload,
  currentProgress: LessonProgress | null
): LessonProgressInput {
  const { lessonId, lessonType, stars, isPassed } = payload

  const updatedLessonProgress: LessonProgressInput = {
    lessonId,
    attempts: currentProgress?.attempts ? currentProgress.attempts + 1 : 1
  }

  // Add type-specific fields
  if (lessonType === 'regular') {
    updatedLessonProgress.stars = stars!
  } else if (lessonType === 'finalTest') {
    updatedLessonProgress.isPassed = isPassed!
  }

  return updatedLessonProgress
}

/**
 * Get default lesson progress (when none exists)
 * Note: completedAt will be set when progress is first saved
 */
export function getDefaultLessonProgress(lessonId: string): Partial<LessonProgress> {
  return {
    lessonId,
    stars: 0,
    isPassed: false,
    attempts: 0
    // completedAt will be null/undefined until first save
  }
}

// ============================================================================
// SERVICE FUNCTIONS - Orchestrate Business Logic + Firestore Layer
// ============================================================================

/**
 * Update lesson progress (business logic + Firestore operations)
 */
export async function updateLessonProgressService(
  userId: string,
  payload: UpdateLessonProgressPayload
): Promise<{ success: true; message: string }> {
  // Validate input
  validateUpdateLessonProgressPayload(payload)

  // Get current progress
  const currentProgress = await getLessonProgressFromFirestore(userId, payload.lessonId)

  // Build updated progress
  const updatedProgress = buildLessonProgress(payload, currentProgress)

  // Save to Firestore
  await updateLessonProgressInFirestore(userId, payload.lessonId, updatedProgress)

  return {
    success: true,
    message: 'Lesson progress updated successfully'
  }
}

/**
 * Get single lesson progress (business logic + Firestore operations)
 */
export async function getLessonProgressService(
  userId: string,
  lessonId: string
): Promise<LessonProgressResponse> {
  // Validate input
  validateLessonId(lessonId)

  // Get from Firestore
  const lessonProgress = await getLessonProgressFromFirestore(userId, lessonId)

  // Return with default if not found
  // Type assertion needed because default doesn't have timestamps yet
  const progress = lessonProgress || (getDefaultLessonProgress(lessonId) as LessonProgress)

  return {
    success: true,
    data: progress
  }
}

/**
 * Get all lesson progress (business logic + Firestore operations)
 */
export async function getAllLessonProgressService(
  userId: string
): Promise<AllLessonProgressResponse> {
  // Get from Firestore
  const userProgress = await getUserProgress(userId)
  const allLessonProgress = userProgress?.lessons || {}

  return {
    success: true,
    data: allLessonProgress
  }
}

/**
 * Delete lesson progress (business logic + Firestore operations)
 */
export async function deleteLessonProgressService(
  userId: string,
  lessonId: string
): Promise<{ success: true; message: string }> {
  // Validate input
  validateLessonId(lessonId)

  // Delete from Firestore
  await deleteLessonProgressFromFirestore(userId, lessonId)

  return {
    success: true,
    message: 'Lesson progress deleted successfully'
  }
}

