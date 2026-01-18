import { Router } from 'expo-router'
import { User } from 'firebase/auth'

export type AuthActionMode = 'verifyEmail' | 'resetPassword'

export type AuthActionStatus = 'loading' | 'success' | 'error' | 'password-reset-form'

export interface AuthActionParams {
  mode?: string
  oobCode?: string
  error?: string
  email?: string
}

export interface AuthActionResult {
  status: AuthActionStatus
  error?: string
  redirectRoute?: string
  email?: string
  code?: string
  redirectDelay?: number
}

export interface ResultHandlingInstructions {
  shouldRedirect?: boolean
  redirectRoute?: string
  redirectDelay?: number
  shouldClearCache?: boolean
  customData?: Record<string, unknown>
}

export interface AuthActionHandler {
  mode: AuthActionMode
  validate(params: AuthActionParams, authUser: User | null): { valid: boolean, error?: string }
  process(params: AuthActionParams, authUser: User | null): Promise<AuthActionResult>
  handleResult(result: AuthActionResult): ResultHandlingInstructions
  getSuccessMessage(): string
  getRedirectRoute(): string
  executeRedirect(router: Router, instructions: ResultHandlingInstructions): void
  requiresUser(): boolean
  getCustomStatuses?(): string[]
  handleCustomStatusCompletion?(status: string, data: Record<string, unknown>): Promise<AuthActionResult>
}

