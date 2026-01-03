import type { CreateUserDataResponse, GetUserDataResponse, UpdateUserDataResponse, UserDataSuccessResponse, UserProfile } from '@types'
import { createUserDocument, deleteUserDocument, getUserDocument, updateUserDocument } from './firestore'

// ============================================================================
// BUSINESS LOGIC LAYER - Pure Business Logic (No Firebase Dependencies)
// ============================================================================

/**
 * Validate user data for creation
 */
export function validateUserData(userData: any): void {
  // Add any business logic validation here
  // For now, we'll keep it simple and let Firestore handle schema validation
  if (!userData || typeof userData !== 'object') {
    throw new Error('User data must be an object')
  }
}

/**
 * Validate user updates
 */
export function validateUserUpdates(updates: any): void {
  // Add any business logic validation here
  if (!updates || typeof updates !== 'object') {
    throw new Error('Updates must be an object')
  }
}

// ============================================================================
// SERVICE FUNCTIONS - Orchestrate Business Logic + Firestore Layer
// ============================================================================

/**
 * Create user data (business logic + Firestore operations)
 * Reads back the document after creation to ensure Firestore consistency
 */
export async function createUserDataService(
  userId: string,
  userData: Partial<UserProfile>
): Promise<CreateUserDataResponse> {
  validateUserData(userData)

  await createUserDocument(userId, userData)

  // Read back the document to ensure it's consistent and readable
  // This ensures Firestore eventual consistency doesn't cause issues
  // Also return the data to avoid an extra getUserData call
  const doc = await getUserDocument(userId)
  
  if (!doc.exists) {
    console.error('[createUserDataService] ERROR: Document not found after creation!')
    throw new Error('Failed to create user data - document not found after creation')
  }
  return {
    success: true,
    message: 'User data created successfully',
    data: doc.data()!
  }
}

/**
 * Get user data from Firestore (business logic + Firestore operations)
 * NOTE: This gets the user's profile/progress data from Firestore, NOT their Auth account info.
 */
export async function getUserDataService(
  userId: string
): Promise<GetUserDataResponse> {
  const doc = await getUserDocument(userId)

  if (!doc.exists) {
    console.error('[getUserDataService] ERROR: User data not found for userId:', userId)
    throw new Error('User data not found')
  }
  return {
    success: true,
    data: doc.data()!
  }
}

/**
 * Update user data (business logic + Firestore operations)
 * Creates document if it doesn't exist (handles race conditions during signup, e.g., streak sync)
 */
export async function updateUserDataService(
  userId: string,
  updates: Partial<UserProfile>
): Promise<UpdateUserDataResponse> {
  validateUserUpdates(updates)

  // Check if document exists (handles race condition where streak sync happens before createUserData completes)
  const doc = await getUserDocument(userId)
  
  if (!doc.exists) {
    // Document doesn't exist yet (race condition during signup), create it with proper initialization
    await createUserDocument(userId, updates)
  } else {
    await updateUserDocument(userId, updates)
  }

  // Read back the updated document to return the latest data
  // This avoids an extra getUserData call after update
  const updatedDoc = await getUserDocument(userId)
  
  if (!updatedDoc.exists) {
    console.error('[updateUserDataService] ERROR: Document not found after update!')
    throw new Error('Failed to update user data - document not found after update')
  }

  return {
    success: true,
    message: 'User data updated successfully',
    data: updatedDoc.data()!
  }
}

/**
 * Delete user data from Firestore (business logic + Firestore operations)
 * NOTE: This only deletes the Firestore document (profile/progress data).
 * The Firebase Auth account remains intact - user can still log in.
 */
export async function deleteUserDataService(
  userId: string
): Promise<UserDataSuccessResponse> {
  // Delete from Firestore (NOT from Firebase Auth)
  await deleteUserDocument(userId)

  return {
    success: true,
    message: 'User data deleted successfully'
  }
}

