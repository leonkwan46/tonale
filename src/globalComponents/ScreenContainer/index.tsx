import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyledContainer } from './ScreenContainer.styles'

interface ScreenContainerProps {
  children: React.ReactNode
  style?: object
  includeBottomPadding?: boolean
}

export const ScreenContainer = ({ 
  children,
  includeBottomPadding = false
}: ScreenContainerProps) => {    
  const insets = useSafeAreaInsets()
  
  return (
    <StyledContainer 
      paddingTop={insets.top} 
      paddingBottom={includeBottomPadding ? insets.bottom : 0}
    >
      {children}
    </StyledContainer>
  )
}
