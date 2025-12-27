import type { CreateUserDataResponse, GetUserDataResponse, UpdateUserDataResponse, UserDataSuccessResponse, UserProfile } from '@types'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

export type { UserProfile } from '@types'

// CRUD operations for userData
export const createUserData = httpsCallable<Partial<UserProfile>, CreateUserDataResponse>(
  functions,
  'createUserData'
)

export const getUserData = httpsCallable<void, GetUserDataResponse>(
  functions,
  'getUserData'
)

export const updateUserData = httpsCallable<Partial<UserProfile>, UpdateUserDataResponse>(
  functions,
  'updateUserData'
)

export const deleteUserData = httpsCallable<void, UserDataSuccessResponse>(
  functions,
  'deleteUserData'
)

