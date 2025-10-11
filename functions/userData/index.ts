import type { GetUserDataResponse, UserDataSuccessResponse, UserProfile } from '@shared/types'
import * as admin from 'firebase-admin'
import { DocumentSnapshot, FieldValue } from 'firebase-admin/firestore'
import * as functions from 'firebase-functions'
import type { CallableContext } from 'firebase-functions/v1/https'

// Create user data
export const createUserData = functions.https.onCall(async (data: any, context: CallableContext) => {
  if (!context?.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = context.auth.uid
  const userData = data

  try {
    await admin.firestore().collection('users').doc(userId).set({
      ...userData,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    })

    return { success: true, message: 'User data created successfully' } as UserDataSuccessResponse
  } catch (error) {
    console.error('Error creating user profile:', error)
    throw new functions.https.HttpsError('internal', 'Failed to create user data')
  }
})

// Read user data
export const getUserData = functions.https.onCall(async (data: any, context: CallableContext) => {
  if (!context?.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = context.auth.uid

  try {
    const doc = await admin.firestore().collection('users').doc(userId).get() as DocumentSnapshot<UserProfile>
    
    if (!doc.exists) {
      throw new functions.https.HttpsError('not-found', 'User data not found')
    }

    return { success: true, data: doc.data() } as GetUserDataResponse
  } catch (error) {
    if ((error as any).code === 'not-found') {
      throw error
    }
    console.error('Error fetching user profile:', error)
    throw new functions.https.HttpsError('internal', 'Failed to get user data')
  }
})

// Update user data
export const updateUserData = functions.https.onCall(async (data: any, context: CallableContext) => {
  if (!context?.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = context.auth.uid
  const updates = data

  try {
    await admin.firestore().collection('users').doc(userId).update({
      ...updates,
      updatedAt: FieldValue.serverTimestamp()
    })

    return { success: true, message: 'User data updated successfully' } as UserDataSuccessResponse
  } catch {
    throw new functions.https.HttpsError('internal', 'Failed to update user data')
  }
})

// Delete user data
export const deleteUserData = functions.https.onCall(async (data: any, context: CallableContext) => {
  if (!context?.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const userId = context.auth.uid

  try {
    await admin.firestore().collection('users').doc(userId).delete()
    return { success: true, message: 'User data deleted successfully' } as UserDataSuccessResponse
  } catch {
    throw new functions.https.HttpsError('internal', 'Failed to delete user data')
  }
})


