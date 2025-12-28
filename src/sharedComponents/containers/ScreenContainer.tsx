import styled from '@emotion/native'
import * as React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ScreenContainerProps {
  children: React.ReactNode
  style?: object
  includeBottomPadding?: boolean
}

const StyledContainer = styled(View)<{ paddingTop: number; paddingBottom: number }>(({ theme, paddingTop, paddingBottom }) => ({
  flex: 1,
  backgroundColor: theme?.colors?.background || 'transparent',
  paddingTop: paddingTop,
  paddingBottom: paddingBottom
}))

export function ScreenContainer({ 
  children,
  includeBottomPadding = false
}: ScreenContainerProps) {    
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
