import type { CreateUserDataResponse, GetUserDataResponse, UpdateUserDataResponse, UserDataSuccessResponse } from '@types'
import { onCall, HttpsError } from 'firebase-functions/v2/https'
import {
    createUserDataService,
    deleteUserDataService,
    getUserDataService,
    updateUserDataService
} from './service'

// ============================================================================
// HTTP HANDLERS LAYER - Thin Orchestration Layer (2nd Gen)
// ============================================================================

/**
 * Create user data HTTP handler (2nd Gen)
 */
export const createUserDataV2 = onCall(async (request) => {
  // Authentication check
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = request.auth.uid
  const userData = request.data

  try {
    // Delegate to service layer
    return await createUserDataService(userId, userData) as CreateUserDataResponse
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Map business logic errors to HTTP errors
    if (errorMessage.includes('must be')) {
      throw new HttpsError('invalid-argument', errorMessage)
    }
    
    console.error('Error creating user profile:', error)
    throw new HttpsError('internal', 'Failed to create user data')
  }
})

/**
 * Get user data HTTP handler (2nd Gen)
 * Gets user's profile and progress data from Firestore (not Auth account info)
 */
export const getUserDataV2 = onCall(async (request) => {
  // Authentication check
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = request.auth.uid

  try {
    // Delegate to service layer
    return await getUserDataService(userId) as GetUserDataResponse
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Map business logic errors to HTTP errors
    if (errorMessage === 'User data not found') {
      throw new HttpsError('not-found', errorMessage)
    }
    
    console.error('Error fetching user profile:', error)
    throw new HttpsError('internal', 'Failed to get user data')
  }
})

/**
 * Update user data HTTP handler (2nd Gen)
 */
export const updateUserDataV2 = onCall(async (request) => {
  // Authentication check
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = request.auth.uid
  const updates = request.data

  try {
    // Delegate to service layer
    return await updateUserDataService(userId, updates) as UpdateUserDataResponse
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Map business logic errors to HTTP errors
    if (errorMessage.includes('must be')) {
      throw new HttpsError('invalid-argument', errorMessage)
    }
    
    console.error('Error updating user data:', error)
    throw new HttpsError('internal', 'Failed to update user data')
  }
})

/**
 * Delete user data HTTP handler (2nd Gen)
 * Deletes user's profile and progress data from Firestore only.
 * NOTE: Does NOT delete the Firebase Auth account - user can still authenticate.
 */
export const deleteUserDataV2 = onCall(async (request) => {
  // Authentication check
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = request.auth.uid

  try {
    // Delegate to service layer (only deletes Firestore data, not Auth account)
    return await deleteUserDataService(userId) as UserDataSuccessResponse
  } catch (error) {
    console.error('Error deleting user data:', error)
    throw new HttpsError('internal', 'Failed to delete user data')
  }
})

