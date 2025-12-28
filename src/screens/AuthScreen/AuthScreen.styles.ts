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
  gap: scale(30),
  alignItems: 'center' as const,
  paddingHorizontal: scale(32),
  paddingVertical: scale(40)
}))

export const AuthActionsContainer = styled(View)(() => ({
  flexDirection: 'column' as const,
  gap: scale(16),
  width: '100%'
}))
