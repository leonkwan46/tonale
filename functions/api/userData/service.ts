import type { CreateUserDataResponse, GetUserDataResponse, UpdateUserDataResponse, UserData, UserDataSuccessResponse } from '@types'
import { createUserDocument, deleteUserDocument, getUserDocument, updateUserDocument } from './firestore'

export function validateUserData(userData: any): void {
  if (!userData || typeof userData !== 'object') {
    throw new Error('User data must be an object')
  }
}

export function validateUserUpdates(updates: any): void {
  if (!updates || typeof updates !== 'object') {
    throw new Error('Updates must be an object')
  }
}

const DEFAULT_USER_DATA: Pick<UserData, 'onboardingCompleted'> = {
  onboardingCompleted: false
}

export async function createUserDataService(
  firebaseUid: string,
  userData: Partial<UserData>
): Promise<CreateUserDataResponse> {
  validateUserData(userData)
  await createUserDocument(firebaseUid, {
    firebaseUid,
    ...DEFAULT_USER_DATA,
    ...userData
  })

  const doc = await getUserDocument(firebaseUid)
  
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

export async function getUserDataService(
  firebaseUid: string
): Promise<GetUserDataResponse> {
  const doc = await getUserDocument(firebaseUid)

  if (!doc.exists) {
    console.error('[getUserDataService] ERROR: User data not found for firebaseUid:', firebaseUid)
    throw new Error('User data not found')
  }
  return {
    success: true,
    data: doc.data()!
  }
}

export async function updateUserDataService(
  firebaseUid: string,
  updates: Partial<UserData>
): Promise<UpdateUserDataResponse> {
  validateUserUpdates(updates)

  const doc = await getUserDocument(firebaseUid)
  
  if (!doc.exists) {
    await createUserDocument(firebaseUid, updates)
  } else {
    await updateUserDocument(firebaseUid, updates)
  }

  const updatedDoc = await getUserDocument(firebaseUid)
  
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

export async function deleteUserDataService(
  firebaseUid: string
): Promise<UserDataSuccessResponse> {
  await deleteUserDocument(firebaseUid)

  return {
    success: true,
    message: 'User data deleted successfully'
  }
}

