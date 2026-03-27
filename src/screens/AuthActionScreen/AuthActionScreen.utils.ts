import { FirebaseError } from '@/types/api/errors'
import { getUserFacingErrorMessage } from '@/utils/errorMessages'

/**
 * Get user-friendly error message from Firebase error
 */
export const getFirebaseErrorMessage = (error: FirebaseError): string => {
  return getUserFacingErrorMessage(error)
}
