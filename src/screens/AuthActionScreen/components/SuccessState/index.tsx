import { Icon } from '@/sharedComponents/Icon'
import { useRouter } from 'expo-router'

import { AuthActionMode } from '../../AuthActionScreen.types'
import { getHandler } from '../../handlers/AuthActionHandlerRegistry'
import {
  PrimaryButton,
  PrimaryButtonText,
  SuccessContainer,
  SuccessText
} from './SuccessState.styles'

interface SuccessStateProps {
  mode: AuthActionMode
}

export const SuccessState = ({ mode }: SuccessStateProps) => {
  const router = useRouter()

  const handler = getHandler(mode)
  const message = handler.getSuccessMessage()
  const route = handler.getRedirectRoute()

  const handleContinue = () => {
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
        <SuccessText>{message}</SuccessText>
      </SuccessContainer>
      <PrimaryButton onPress={handleContinue} activeOpacity={0.7}>
        <PrimaryButtonText>
          {mode === 'resetPassword' ? 'Go to Sign In' : 'Continue'}
        </PrimaryButtonText>
      </PrimaryButton>
    </>
  )
}
