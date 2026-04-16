import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyledContainer } from './ScreenContainer.styles'

interface ScreenContainerProps {
  children: React.ReactNode
  style?: object
  includeTopPadding?: boolean
  includeBottomPadding?: boolean
}

export const ScreenContainer = ({
  children,
  includeTopPadding = true,
  includeBottomPadding = false
}: ScreenContainerProps) => {
  const insets = useSafeAreaInsets()

  return (
    <StyledContainer
      paddingTop={includeTopPadding ? insets.top : 0}
      paddingBottom={includeBottomPadding ? insets.bottom : 0}
    >
      {children}
    </StyledContainer>
  )
}
