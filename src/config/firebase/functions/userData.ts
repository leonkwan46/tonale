import type { CreateUserDataResponse, GetUserDataResponse, UpdateUserDataResponse, UserData, UserDataSuccessResponse } from '@types'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

export type { UserData } from '@types'

// CRUD operations for userData (2nd Gen - V2 suffix for migration)
export const createUserData = httpsCallable<Partial<UserData>, CreateUserDataResponse>(
  functions,
  'createUserDataV2'
)

export const getUserData = httpsCallable<void, GetUserDataResponse>(
  functions,
  'getUserDataV2'
)

export const updateUserData = httpsCallable<Partial<UserData>, UpdateUserDataResponse>(
  functions,
  'updateUserDataV2'
)

export const deleteUserData = httpsCallable<void, UserDataSuccessResponse>(
  functions,
  'deleteUserDataV2'
)

