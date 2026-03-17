import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'

import { Card } from './AuthActionScreen.styles'
import { AuthActionMode, AuthActionParams, AuthActionStatus } from './AuthActionScreen.types'
import { ErrorState } from './components/ErrorState'
import { LoadingState } from './components/LoadingState'
import { PasswordResetForm } from './components/PasswordResetForm'
import { SuccessState } from './components/SuccessState'
import { getHandler } from './handlers/AuthActionHandlerRegistry'

export const AuthActionScreen = () => {
  const router = useRouter()
  const { authUser } = useUser()
  const params = useGlobalSearchParams<{ 
    mode?: string
    oobCode?: string
    error?: string
    email?: string
  }>()

  const [status, setStatus] = useState<AuthActionStatus>('loading')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<AuthActionMode | null>(null)
  const [code, setCode] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isResetting, setIsResetting] = useState(false)
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasProcessedRef = useRef(false)

  const scheduleRedirect = (
    handler: ReturnType<typeof getHandler>,
    instructions: ReturnType<typeof handler.handleResult>
  ) => {
    if (!instructions.shouldRedirect) return

    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current)
    }

    redirectTimerRef.current = setTimeout(() => {
      handler.executeRedirect(router, instructions)
    }, instructions.redirectDelay!)
  }

  useEffect(() => {
    const actionParams: AuthActionParams = {
      mode: params.mode,
      oobCode: params.oobCode,
      error: params.error,
      email: params.email
    }

    const processAction = async () => {
      if (hasProcessedRef.current) return

      if (actionParams.error) {
        setError(decodeURIComponent(actionParams.error))
        setStatus('error')
        return
      }

      if (!actionParams.mode) {
        setError('Invalid link. Missing action mode.')
        setStatus('error')
        return
      }

      // We have a valid action mode now – clear any previous errors
      // (e.g. a prior "missing action mode" from an earlier navigation).
      setError('')

      const actionMode = actionParams.mode as AuthActionMode
      setMode(actionMode)

      const handler = getHandler(actionMode)
      const validation = handler.validate(actionParams, authUser)
      if (!validation.valid) {
        setError(validation.error!)
        setStatus('error')
        return
      }

      const result = await handler.process(actionParams, authUser)
      setStatus(result.status)
      
      if (result.error) {
        setError(result.error)
      }

      const instructions = handler.handleResult(result)
      hasProcessedRef.current = true

      scheduleRedirect(handler, instructions)

      if (instructions.customData) {
        if (instructions.customData.email) setEmail(instructions.customData.email as string)
        if (instructions.customData.code) setCode(instructions.customData.code as string)
      }
    }

    processAction().catch(() => {
      setError('An error occurred while processing the action')
      setStatus('error')
    })

    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current)
        redirectTimerRef.current = null
      }
    }
    // authUser is intentionally excluded from dependencies to prevent re-processing
    // when it changes (e.g., after password reset signs out the user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.mode, params.oobCode, router])

  const handlePasswordReset = async (resetCode: string, newPassword: string) => {
    setError('')
    setIsResetting(true)

    const handler = getHandler(mode!)
    const result = await handler.handleCustomStatusCompletion!('password-reset-form', {
      code: resetCode,
      newPassword
    })

    setIsResetting(false)
    setStatus(result.status)
    if (result.error) {
      setError(result.error)
      return
    }

    if (result.status === 'success') {
      const instructions = handler.handleResult(result)
      scheduleRedirect(handler, instructions)
    }
  }

  const handleSuccessContinue = () => {
    if (!mode) return
    const handler = getHandler(mode)
    const instructions = handler.handleResult({ status: 'success' })

    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current)
      redirectTimerRef.current = null
    }

    if (instructions.shouldRedirect) {
      handler.executeRedirect(router, instructions)
    }
  }

  return (
    <ScreenContainer>
      {status === 'loading' && (
        <Card>
          <LoadingState />
        </Card>
      )}
      {status === 'error' && !hasProcessedRef.current && (
        <Card>
          <ErrorState error={error} />
        </Card>
      )}
      {status === 'success' && (
        <Card>
          <SuccessState mode={mode!} onContinue={handleSuccessContinue} />
        </Card>
      )}
      {status === 'password-reset-form' && (
        <PasswordResetForm
          email={email}
          code={code}
          onReset={handlePasswordReset}
          isLoading={isResetting}
          error={error}
        />
      )}
    </ScreenContainer>
  )
}
