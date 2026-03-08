import { Button3D } from '@/sharedComponents/Button3D'
import { useTheme } from '@emotion/react'
import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { ButtonContent, ButtonText, OnboardingButtonContainer } from './OnboardingButton.styles'

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
    <OnboardingButtonContainer>
      <Button3D
        disabled={!isEnabled}
        onPress={onPress}
        testID="complete-onboarding-button"
        color="blue"
        layoutType="row"
        fullWidth
      >
        {() => (
          <ButtonContent>
            {isCompleting ? (
              <>
                <ActivityIndicator size="small" color={theme.colors.text} />
                <ButtonText hasLeftMargin>
                  Completing...
                </ButtonText>
              </>
            ) : (
              <ButtonText>Start!</ButtonText>
            )}
          </ButtonContent>
        )}
      </Button3D>
    </OnboardingButtonContainer>
  )
}

export const OnboardingButton = React.memo(OnboardingButtonComponent)

