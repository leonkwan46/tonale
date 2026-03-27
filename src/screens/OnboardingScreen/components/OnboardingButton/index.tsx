import { Button } from '@/compLib/Button'
import * as React from 'react'
import { OnboardingButtonContainer } from './OnboardingButton.styles'

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
  return (
    <OnboardingButtonContainer>
      <Button
        variant="filled"
        color="primary"
        depth
        depthLayout="row"
        fullWidth
        disabled={!isEnabled}
        loading={isCompleting}
        onPress={onPress}
        testID="complete-onboarding-button"
        label={isCompleting ? 'Finishing setup…' : 'Start!'}
      />
    </OnboardingButtonContainer>
  )
}

export const OnboardingButton = React.memo(OnboardingButtonComponent)
