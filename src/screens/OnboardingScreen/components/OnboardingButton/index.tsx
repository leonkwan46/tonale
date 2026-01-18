import { useTheme } from '@emotion/react'
import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { PrimaryButton, PrimaryButtonText } from './OnboardingButton.styles'

interface OnboardingButtonProps {
  isEnabled: boolean
  isCompleting: boolean
  onPress: () => void
  isTablet: boolean
}

const OnboardingButtonComponent = ({
  isEnabled,
  isCompleting,
  onPress,
  isTablet
}: OnboardingButtonProps) => {
  const theme = useTheme()

  return (
    <PrimaryButton
      opacity={isEnabled ? 1 : 0.7}
      disabled={!isEnabled}
      onPress={onPress}
      testID="complete-onboarding-button"
      isTablet={isTablet}
    >
      {isCompleting ? (
        <>
          <ActivityIndicator size="small" color={theme.colors.text} />
          <PrimaryButtonText isTablet={isTablet} hasLeftMargin>
            Completing...
          </PrimaryButtonText>
        </>
      ) : (
        <PrimaryButtonText isTablet={isTablet}>Start!</PrimaryButtonText>
      )}
    </PrimaryButton>
  )
}

export const OnboardingButton = React.memo(OnboardingButtonComponent)

