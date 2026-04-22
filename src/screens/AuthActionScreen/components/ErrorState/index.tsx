import { Button } from '@/compLib/Button'
import { Icon } from '@/compLib/Icon'

import { ErrorContainer, ErrorText, ErrorWrapper } from './ErrorState.styles'

interface ErrorStateProps {
  error: string
  onBack: () => void
}

export const ErrorState = ({ error, onBack }: ErrorStateProps) => {
  return (
    <ErrorWrapper>
      <ErrorContainer>
        <Icon name="alert-circle" sizeVariant="lg" colorVariant="error" />
        <ErrorText size="xs" colorVariant="error">
          {error}
        </ErrorText>
      </ErrorContainer>
      <Button variant="link" size="sm" label="Back to sign in" onPress={onBack} />
    </ErrorWrapper>
  )
}
