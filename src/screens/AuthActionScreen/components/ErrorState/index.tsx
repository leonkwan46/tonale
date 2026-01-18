import { Icon } from '@/sharedComponents/Icon/Icon'

import { ErrorContainer, ErrorText } from './ErrorState.styles'

interface ErrorStateProps {
  error: string
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <ErrorContainer>
      <Icon name="alert-circle" sizeVariant="lg" colorVariant="error" />
      <ErrorText>{error}</ErrorText>
    </ErrorContainer>
  )
}
