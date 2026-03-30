import { isFirebaseError } from '@/types/api/errors'

const GENERIC_MESSAGE = 'Something went wrong. Please try again.'

const FIREBASE_CODE_TO_MESSAGE: Record<string, string> = {
  // Auth (sign-in / sign-up)
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/email-already-in-use': 'This email is already registered. Try signing in instead.',
  'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/user-disabled': 'This account has been disabled.',

  // Auth actions (deep links)
  'auth/expired-action-code': 'This link has expired. Please request a new one.',
  'auth/invalid-action-code': 'This link is invalid or has already been used.',

  // Account management
  'auth/requires-recent-login': 'Please sign in again and try.',
  'auth/operation-not-allowed': GENERIC_MESSAGE
}

export const getUserFacingErrorMessage = (
  error: unknown,
  fallbackMessage: string = GENERIC_MESSAGE
): string => {
  if (isFirebaseError(error)) {
    return FIREBASE_CODE_TO_MESSAGE[error.code] ?? GENERIC_MESSAGE
  }

  return fallbackMessage
}
