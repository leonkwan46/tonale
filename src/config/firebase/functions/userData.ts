import type { GetUserDataResponse, UserDataSuccessResponse, UserProfile } from '@shared/types'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

export type { UserProfile } from '@shared/types'

// CRUD operations for userData
export const createUserData = httpsCallable<UserProfile, UserDataSuccessResponse>(
  functions,
  'createUserData'
)

export const getUserData = httpsCallable<void, GetUserDataResponse>(
  functions,
  'getUserData'
)

export const updateUserData = httpsCallable<Partial<UserProfile>, UserDataSuccessResponse>(
  functions,
  'updateUserData'
)

export const deleteUserData = httpsCallable<void, UserDataSuccessResponse>(
  functions,
  'deleteUserData'
)

