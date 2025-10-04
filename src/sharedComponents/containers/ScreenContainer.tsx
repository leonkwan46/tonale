import styled from '@emotion/native'
import * as React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ScreenContainerProps {
  children: React.ReactNode
  style?: object
}

const StyledContainer = styled(View)<{ paddingTop: number }>(({ theme, paddingTop }) => ({
  flex: 1,
  backgroundColor: theme?.colors?.background || 'transparent',
  paddingTop: paddingTop
}))

export function ScreenContainer({ 
  children 
}: ScreenContainerProps) {    
  const insets = useSafeAreaInsets()
  
  return (
    <StyledContainer paddingTop={insets.top}>
      {children}
    </StyledContainer>
  )
}
