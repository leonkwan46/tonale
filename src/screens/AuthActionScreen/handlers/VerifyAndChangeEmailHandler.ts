import { applyActionCodeToUser, signOutUser } from '@/config/firebase/auth'
import { isFirebaseError } from '@/types/api/errors'
import { Router } from 'expo-router'

import { AuthActionHandler, AuthActionParams, AuthActionResult, ResultHandlingInstructions } from '../AuthActionScreen.types'
import { getFirebaseErrorMessage } from '../AuthActionScreen.utils'

const REDIRECT_ROUTE = '/(auth)'
const REDIRECT_DELAY = 3000

export const verifyAndChangeEmailHandler: AuthActionHandler = {
  mode: 'verifyAndChangeEmail',

  requiresUser: () => false,

  validate: (params: AuthActionParams) => {
    if (!params.oobCode) {
      return {
        valid: false,
        error: 'Invalid email change link. Missing verification code.'
      }
    }
    return { valid: true }
  },

  process: async (params: AuthActionParams): Promise<AuthActionResult> => {
    try {
      await applyActionCodeToUser(params.oobCode!)

      try {
        await signOutUser()
      } catch {
        // Token may already be invalidated after email change
      }

      return {
        status: 'success'
      }
    } catch (err) {
      return {
        status: 'error',
        error: isFirebaseError(err)
          ? getFirebaseErrorMessage(err)
          : 'Failed to change email. The link may have expired or already been used. Please request a new one.'
      }
    }
  },

  handleResult: (result: AuthActionResult): ResultHandlingInstructions => {
    if (result.status === 'success') {
      return {
        shouldRedirect: true,
        redirectRoute: REDIRECT_ROUTE,
        redirectDelay: REDIRECT_DELAY
      }
    }
    return {}
  },

  getSuccessMessage: () => 'Email changed successfully! Please sign in with your new email.',

  getRedirectRoute: () => REDIRECT_ROUTE,

  executeRedirect: (router: Router) => {
    router.replace('/(auth)' as Parameters<typeof router.replace>[0])
  }
}
