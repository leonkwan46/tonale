// Firebase error types
export interface FirebaseError extends Error {
  code: string
  customData?: Record<string, unknown>
}

export function isFirebaseError(error: unknown): error is FirebaseError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as FirebaseError).code === 'string'
  )
}

