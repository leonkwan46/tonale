import { useDevice } from '@/hooks'

import { MessageText } from '../AuthActionScreen.styles'

export function LoadingState() {
  const { isTablet } = useDevice()

  return <MessageText isTablet={isTablet}>Processing...</MessageText>
}

