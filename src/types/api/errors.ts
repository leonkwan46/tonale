export interface FirebaseError extends Error {
  code: string
  customData?: Record<string, unknown>
}

export const isFirebaseError = (error: unknown): error is FirebaseError =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  typeof (error as FirebaseError).code === 'string'

