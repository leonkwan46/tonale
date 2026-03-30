import { useDevice } from '@/hooks'

import { MessageText } from './LoadingState.styles'

export const LoadingState = () => {
  const { isTablet } = useDevice()
  return (
    <MessageText size={isTablet ? 'sm' : 'md'} align="center">
      Processing...
    </MessageText>
  )
}
