import type { CreateUserDataResponse, GetUserDataResponse, UpdateUserDataResponse, UserDataSuccessResponse, UserData } from '@types'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

export type { UserData } from '@types'

// CRUD operations for userData
export const createUserData = httpsCallable<Partial<UserData>, CreateUserDataResponse>(
  functions,
  'createUserData'
)

export const getUserData = httpsCallable<void, GetUserDataResponse>(
  functions,
  'getUserData'
)

export const updateUserData = httpsCallable<Partial<UserData>, UpdateUserDataResponse>(
  functions,
  'updateUserData'
)

export const deleteUserData = httpsCallable<void, UserDataSuccessResponse>(
  functions,
  'deleteUserData'
)

