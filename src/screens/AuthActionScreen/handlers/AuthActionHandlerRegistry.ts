import { AuthActionHandler, AuthActionMode } from '../AuthActionScreen.types'
import { resetPasswordHandler } from './ResetPasswordHandler'
import { verifyEmailHandler } from './VerifyEmailHandler'

const handlers = new Map<AuthActionMode, AuthActionHandler>()

export const registerHandler = (handler: AuthActionHandler): void => {
  handlers.set(handler.mode, handler)
}

export const getHandler = (mode: string): AuthActionHandler => {
  const handler = handlers.get(mode as AuthActionMode)
  if (!handler) throw new Error(`No handler registered for mode: ${mode}`)

  return handler
}

// Auto-register all handlers
registerHandler(verifyEmailHandler)
registerHandler(resetPasswordHandler)
