import styled from '@emotion/native'
import { ScrollView, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const KeyboardContainer = styled.KeyboardAvoidingView(() => ({
  flex: 1
}))

export const ScrollContainer = styled(ScrollView)(() => ({
  flexGrow: 1
}))

export const ContentWrapper = styled(View)<{ isTablet: boolean }>(({ isTablet }) => ({
  width: '100%',
  alignSelf: 'center' as const,
  flexDirection: 'column' as const,
  gap: isTablet ? scale(10) : scale(30),
  alignItems: 'center' as const,
  paddingHorizontal: scale(32),
  paddingVertical: isTablet ? scale(12) : scale(40),
  justifyContent: 'center' as const,
  flex: 1
}))

export const AuthActionsContainer = styled(View)<{ isTablet: boolean }>(({ isTablet }) => ({
  flexDirection: 'column' as const,
  gap: isTablet ? scale(8) : scale(16),
  width: '100%'
}))
