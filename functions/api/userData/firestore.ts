import type { UserProfile } from '@types'
import * as admin from 'firebase-admin'
import { DocumentSnapshot, FieldValue } from 'firebase-admin/firestore'

// ============================================================================
// FIRESTORE LAYER - Pure Firestore Operations (Data Access)
// ============================================================================

/**
 * Get user document from Firestore
 */
export async function getUserDocument(userId: string): Promise<DocumentSnapshot<UserProfile>> {
  return await admin.firestore().collection('users').doc(userId).get() as DocumentSnapshot<UserProfile>
}

/**
 * Create user document in Firestore
 * Idempotent: if document already exists, does nothing (prevents double creation)
 */
export async function createUserDocument(
  userId: string,
  userData: Partial<UserProfile>
): Promise<void> {
  const userRef = admin.firestore().collection('users').doc(userId)
  const doc = await userRef.get()
  
  if (doc.exists) {
    // Document already exists, don't overwrite it
    return
  }
  
  // Document doesn't exist, create it with proper initialization
  await userRef.set({
    ...userData,
    progress: {
      lessons: {},  // Initialize empty lesson progress
      stages: {}    // Initialize empty stage progress
    },
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  })
}

/**
 * Update user document in Firestore
 */
export async function updateUserDocument(
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> {
  await admin.firestore().collection('users').doc(userId).update({
    ...updates,
    updatedAt: FieldValue.serverTimestamp()
  })
}

/**
 * Delete user document from Firestore
 * NOTE: This only deletes the Firestore document, NOT the Firebase Auth account.
 * The user can still authenticate - only their profile/progress data is removed.
 */
export async function deleteUserDocument(userId: string): Promise<void> {
  await admin.firestore().collection('users').doc(userId).delete()
}

