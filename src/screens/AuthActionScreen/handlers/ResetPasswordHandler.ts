import { confirmPasswordResetForUser, signOutUser, verifyPasswordResetCodeForUser } from '@/config/firebase/auth'
import { clearAllUserCache } from '@/utils/cache'
import { Router } from 'expo-router'
import { User } from 'firebase/auth'

import { isFirebaseError } from '@/types/api/errors'
import { AuthActionHandler, AuthActionParams, AuthActionResult, ResultHandlingInstructions } from '../AuthActionScreen.types'
import { getFirebaseErrorMessage } from '../AuthActionScreen.utils'

const REDIRECT_ROUTE = '/(auth)'
const REDIRECT_DELAY = 3000

export const resetPasswordHandler: AuthActionHandler = {
  mode: 'resetPassword',

  requiresUser: () => false,

  validate: (params: AuthActionParams, authUser: User | null) => {
    if (!params.oobCode) {
      return {
        valid: false,
        error: 'Invalid password reset link. Missing verification code.'
      }
    }
    return { valid: true }
  },

  process: async (params: AuthActionParams, authUser: User | null): Promise<AuthActionResult> => {
    const actionCode = params.oobCode!

    try {
      const resetEmail = await verifyPasswordResetCodeForUser(actionCode)
      return {
        status: 'password-reset-form',
        email: resetEmail,
        code: actionCode
      }
    } catch (err) {
      return {
        status: 'error',
        error: isFirebaseError(err)
          ? getFirebaseErrorMessage(err)
          : 'Failed to verify password reset code. Please try again.'
      }
    }
  },

  handleResult: (result: AuthActionResult): ResultHandlingInstructions => {
    if (result.status === 'password-reset-form') {
      return {
        shouldRedirect: false,
        customData: {
          email: result.email,
          code: result.code
        }
      }
    }
    if (result.status === 'success') {
      return {
        shouldRedirect: true,
        redirectRoute: REDIRECT_ROUTE,
        redirectDelay: REDIRECT_DELAY,
        shouldClearCache: true
      }
    }
    // Error status: no redirect, no custom data
    return {}
  },

  getSuccessMessage: () => 'Password reset successfully! You can now sign in with your new password.',

  getRedirectRoute: () => REDIRECT_ROUTE,

  executeRedirect: (router: Router, instructions: ResultHandlingInstructions) => {
    router.replace(instructions.redirectRoute! as Parameters<typeof router.replace>[0])
  },

  getCustomStatuses: () => ['password-reset-form'],

  handleCustomStatusCompletion: async (status: string, data: Record<string, unknown>): Promise<AuthActionResult> => {
    if (status !== 'password-reset-form') {
      return {
        status: 'error',
        error: 'Invalid status for completion'
      }
    }

    const code = data.code as string
    const newPassword = data.newPassword as string

    try {
      await confirmPasswordResetForUser(code, newPassword)
      await signOutUser()
      await clearAllUserCache()

      return {
        status: 'success'
      }
    } catch (err) {
      return {
        status: 'error',
        error: isFirebaseError(err)
          ? getFirebaseErrorMessage(err)
          : 'Failed to reset password. Please try again.'
      }
    }
  }
}

