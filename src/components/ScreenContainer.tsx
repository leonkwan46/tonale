import { useScreenSafeArea } from '@/hooks/useScreenSafeArea'
import styled from '@emotion/native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ScreenContainerProps {
  children: React.ReactNode
  includeBottomNavPadding?: boolean
  style?: object
}

const StyledContainer = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background
}))

const ContentWrapper = styled.View<{ paddingBottom: number }>(({ paddingBottom }) => ({
  flex: 1,
  paddingBottom: paddingBottom
}))

export function ScreenContainer({ 
  children, 
  includeBottomNavPadding = true,
  style 
}: ScreenContainerProps) {
  const { bottomPadding, bottomWithoutNav } = useScreenSafeArea()
  
  const paddingBottom = includeBottomNavPadding ? bottomPadding : bottomWithoutNav
  
  return (
    <StyledContainer style={style}>
      <ContentWrapper paddingBottom={paddingBottom}>
        {children}
      </ContentWrapper>
    </StyledContainer>
  )
}
