import { applyActionCodeToUser } from '@/config/firebase/auth'
import { Router } from 'expo-router'
import { User } from 'firebase/auth'

import { isFirebaseError } from '@/types/api/errors'
import { AuthActionHandler, AuthActionParams, AuthActionResult, ResultHandlingInstructions } from '../AuthActionScreen.types'
import { getFirebaseErrorMessage } from '../AuthActionScreen.utils'

const REDIRECT_ROUTE = '/(tabs)/settings'
const REDIRECT_DELAY = 3000

export const verifyEmailHandler: AuthActionHandler = {
  mode: 'verifyEmail',

  requiresUser: () => true,

  validate: (params: AuthActionParams, authUser: User | null) => {
    if (!authUser) {
      return {
        valid: false,
        error: 'You must be signed in to verify your email. Please sign in first.'
      }
    }
    if (!params.oobCode) {
      return {
        valid: false,
        error: 'Invalid email verification link. Missing verification code.'
      }
    }
    return { valid: true }
  },

  process: async (params: AuthActionParams, authUser: User | null): Promise<AuthActionResult> => {
    const actionCode = params.oobCode!

    try {
      await applyActionCodeToUser(actionCode)
      await authUser!.reload()

      if (!authUser!.emailVerified) {
        return {
          status: 'error',
          error: 'Email verification failed. The link may have expired or already been used. Please request a new verification email.'
        }
      }

      return {
        status: 'success'
      }
    } catch (err) {
      return {
        status: 'error',
        error: isFirebaseError(err) 
          ? getFirebaseErrorMessage(err)
          : 'Failed to verify email status. Please check your connection and try again, or request a new verification email.'
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

  getSuccessMessage: () => 'Email verified successfully! You can now use all features.',

  getRedirectRoute: () => REDIRECT_ROUTE,

  executeRedirect: (router: Router, instructions: ResultHandlingInstructions) => {
    // Replace to settings screen first, then push to account page
    router.replace('/(tabs)/settings' as Parameters<typeof router.replace>[0])
    setTimeout(() => {
      router.push('/(tabs)/settings/account')
    }, 100)
  }
}

