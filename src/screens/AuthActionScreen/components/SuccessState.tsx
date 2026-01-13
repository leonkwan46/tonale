import { useDevice } from '@/hooks'
import { useRouter } from 'expo-router'
import { scale } from 'react-native-size-matters'

import {
  PrimaryButton,
  PrimaryButtonText,
  SuccessContainer,
  SuccessIcon,
  SuccessText
} from '../AuthActionScreen.styles'
import { AuthActionMode } from '../AuthActionScreen.types'
import { getHandler } from '../handlers/AuthActionHandlerRegistry'

interface SuccessStateProps {
  mode: AuthActionMode
}

export const SuccessState = ({ mode }: SuccessStateProps) => {
  const router = useRouter()
  const { isTablet } = useDevice()

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
      <SuccessContainer isTablet={isTablet}>
        <SuccessIcon name="checkmark-circle" size={isTablet ? scale(20) : scale(24)} />
        <SuccessText isTablet={isTablet}>{message}</SuccessText>
      </SuccessContainer>
      <PrimaryButton isTablet={isTablet} onPress={handleContinue} activeOpacity={0.7}>
        <PrimaryButtonText isTablet={isTablet}>
          {mode === 'resetPassword' ? 'Go to Sign In' : 'Continue'}
        </PrimaryButtonText>
      </PrimaryButton>
    </>
  )
}

