import { FirebaseError } from '@/types/api/errors'

/**
 * Get user-friendly error message from Firebase error
 */
export const getFirebaseErrorMessage = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/expired-action-code':
      return 'This link has expired. Please request a new one.'
    case 'auth/invalid-action-code':
      return 'This link is invalid or has already been used.'
    case 'auth/user-disabled':
      return 'This account has been disabled.'
    default:
      return error.message || 'An error occurred'
  }
}
