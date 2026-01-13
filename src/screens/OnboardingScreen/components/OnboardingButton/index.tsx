import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { scale } from 'react-native-size-matters'
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
          <ActivityIndicator size="small" color="#000" />
          <PrimaryButtonText isTablet={isTablet} style={{ marginLeft: scale(8) }}>
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

