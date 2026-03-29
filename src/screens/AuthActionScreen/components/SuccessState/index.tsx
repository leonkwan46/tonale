import { Button } from '@/compLib/Button'
import { Icon } from '@/compLib/Icon'
import { useRouter } from 'expo-router'

import { AuthActionMode } from '../../AuthActionScreen.types'
import { getHandler } from '../../handlers/AuthActionHandlerRegistry'
import { SuccessContainer, SuccessText } from './SuccessState.styles'

interface SuccessStateProps {
  mode: AuthActionMode
  onContinue?: () => void
}

export const SuccessState = ({ mode, onContinue }: SuccessStateProps) => {
  const router = useRouter()

  const handler = getHandler(mode)
  const message = handler.getSuccessMessage()
  const route = handler.getRedirectRoute()

  const handleContinue = () => {
    if (onContinue) {
      onContinue()
      return
    }

    const instructions = handler.handleResult({ status: 'success' })
    if (handler.executeRedirect) {
      handler.executeRedirect(router, instructions)
    } else {
      router.replace(route as Parameters<typeof router.replace>[0])
    }
  }

  return (
    <>
      <SuccessContainer>
        <Icon name="checkmark-circle" sizeVariant="lg" colorVariant="success" />
        <SuccessText size="xs" colorVariant="primary">
          {message}
        </SuccessText>
      </SuccessContainer>
      <Button
        variant="filled"
        size="md"
        fullWidth
        withTopSpacing
        onPress={handleContinue}
        label={mode === 'verifyEmail' ? 'Continue' : 'Go to Sign In'}
      />
    </>
  )
}
