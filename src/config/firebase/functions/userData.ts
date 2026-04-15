import type { CreateUserDataResponse, GetUserDataResponse, UpdateUserDataResponse, UserData, UserDataSuccessResponse } from '@types'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

export type { UserData } from '@types'

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

