import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { scale } from 'react-native-size-matters'
import { PrimaryButton, PrimaryButtonText } from './OnboardingButton.styles'

interface OnboardingButtonProps {
  isEnabled: boolean
  isCompleting: boolean
  onPress: () => void
}

const OnboardingButtonComponent: React.FC<OnboardingButtonProps> = ({
  isEnabled,
  isCompleting,
  onPress
}) => {
  return (
    <PrimaryButton
      opacity={isEnabled ? 1 : 0.7}
      disabled={!isEnabled}
      onPress={onPress}
      testID="complete-onboarding-button"
    >
      {isCompleting ? (
        <>
          <ActivityIndicator size="small" color="#000" />
          <PrimaryButtonText style={{ marginLeft: scale(8) }}>
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

