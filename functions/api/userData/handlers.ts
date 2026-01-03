import type { CreateUserDataResponse, GetUserDataResponse, UpdateUserDataResponse, UserDataSuccessResponse } from '@types'
import * as functions from 'firebase-functions/v1'
import {
    createUserDataService,
    deleteUserDataService,
    getUserDataService,
    updateUserDataService
} from './service'

// ============================================================================
// HTTP HANDLERS LAYER - Thin Orchestration Layer
// ============================================================================

/**
 * Create user data HTTP handler
 */
export const createUserData = functions.https.onCall(async (data: any, context) => {
  // Authentication check
  if (!context?.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = context.auth.uid
  const userData = data

  try {
    // Delegate to service layer
    return await createUserDataService(userId, userData) as CreateUserDataResponse
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Map business logic errors to HTTP errors
    if (errorMessage.includes('must be')) {
      throw new functions.https.HttpsError('invalid-argument', errorMessage)
    }
    
    console.error('Error creating user profile:', error)
    throw new functions.https.HttpsError('internal', 'Failed to create user data')
  }
})

/**
 * Get user data HTTP handler
 * Gets user's profile and progress data from Firestore (not Auth account info)
 */
export const getUserData = functions.https.onCall(async (data: any, context) => {
  // Authentication check
  if (!context?.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = context.auth.uid

  try {
    // Delegate to service layer
    return await getUserDataService(userId) as GetUserDataResponse
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Map business logic errors to HTTP errors
    if (errorMessage === 'User data not found') {
      throw new functions.https.HttpsError('not-found', errorMessage)
    }
    
    console.error('Error fetching user profile:', error)
    throw new functions.https.HttpsError('internal', 'Failed to get user data')
  }
})

/**
 * Update user data HTTP handler
 */
export const updateUserData = functions.https.onCall(async (data: any, context) => {
  // Authentication check
  if (!context?.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = context.auth.uid
  const updates = data

  try {
    // Delegate to service layer
    return await updateUserDataService(userId, updates) as UpdateUserDataResponse
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Map business logic errors to HTTP errors
    if (errorMessage.includes('must be')) {
      throw new functions.https.HttpsError('invalid-argument', errorMessage)
    }
    
    console.error('Error updating user data:', error)
    throw new functions.https.HttpsError('internal', 'Failed to update user data')
  }
})

/**
 * Delete user data HTTP handler
 * Deletes user's profile and progress data from Firestore only.
 * NOTE: Does NOT delete the Firebase Auth account - user can still authenticate.
 */
export const deleteUserData = functions.https.onCall(async (data: any, context) => {
  // Authentication check
  if (!context?.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = context.auth.uid

  try {
    // Delegate to service layer (only deletes Firestore data, not Auth account)
    return await deleteUserDataService(userId) as UserDataSuccessResponse
  } catch (error) {
    console.error('Error deleting user data:', error)
    throw new functions.https.HttpsError('internal', 'Failed to delete user data')
  }
})

