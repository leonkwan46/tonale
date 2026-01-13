import { useDevice } from '@/hooks'
import { scale } from 'react-native-size-matters'

import {
    ErrorContainer,
    ErrorIcon,
    ErrorText
} from '../AuthActionScreen.styles'

interface ErrorStateProps {
  error: string
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  const { isTablet } = useDevice()

  return (
    <ErrorContainer isTablet={isTablet}>
      <ErrorIcon name="alert-circle" size={isTablet ? scale(20) : scale(24)} />
      <ErrorText isTablet={isTablet}>{error}</ErrorText>
    </ErrorContainer>
  )
}

