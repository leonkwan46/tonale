import { useTheme } from '@emotion/react'
import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { PrimaryButton, PrimaryButtonText } from './OnboardingButton.styles'

interface OnboardingButtonProps {
  isEnabled: boolean
  isCompleting: boolean
  onPress: () => void
}

const OnboardingButtonComponent = ({
  isEnabled,
  isCompleting,
  onPress
}: OnboardingButtonProps) => {
  const theme = useTheme()

  return (
    <PrimaryButton
      opacity={isEnabled ? 1 : 0.7}
      disabled={!isEnabled}
      onPress={onPress}
      testID="complete-onboarding-button"
    >
      {isCompleting ? (
        <>
          <ActivityIndicator size="small" color={theme.colors.text} />
          <PrimaryButtonText hasLeftMargin>
            Completing...
          </PrimaryButtonText>
        </>
      ) : (
        <PrimaryButtonText>Start!</PrimaryButtonText>
      )}
    </PrimaryButton>
  )
}

export const OnboardingButton = React.memo(OnboardingButtonComponent)

