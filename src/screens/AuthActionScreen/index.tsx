import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    let redirectTimer: ReturnType<typeof setTimeout> | null = null

    const actionParams: AuthActionParams = {
      mode: params.mode,
      oobCode: params.oobCode,
      error: params.error,
      email: params.email
    }

    const processAction = async () => {
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
      
      if (instructions.shouldRedirect) {
        redirectTimer = setTimeout(() => {
          handler.executeRedirect(router, instructions)
        }, instructions.redirectDelay!)
      }

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
      if (redirectTimer) {
        clearTimeout(redirectTimer)
      }
    }
    // authUser is intentionally excluded from dependencies to prevent re-processing
    // when it changes (e.g., after password reset signs out the user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.mode, params.oobCode, params.error, params.email, router])

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
      if (instructions.shouldRedirect) {
        setTimeout(() => {
          handler.executeRedirect(router, instructions)
        }, instructions.redirectDelay!)
      }
    }
  }

  return (
    <ScreenContainer>
      {status === 'loading' && (
        <Card>
          <LoadingState />
        </Card>
      )}
      {status === 'error' && (
        <Card>
          <ErrorState error={error} />
        </Card>
      )}
      {status === 'success' && (
        <Card>
          <SuccessState mode={mode!} />
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
