import { useDevice } from '@/hooks'

import { MessageText } from './LoadingState.styles'

export const LoadingState = () => {
  const { isTablet } = useDevice()

  return <MessageText isTablet={isTablet}>Processing...</MessageText>
}
