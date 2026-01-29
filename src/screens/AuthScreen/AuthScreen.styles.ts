import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const scrollContentContainerStyle = {
  flexGrow: 1
}

export const ContentWrapper = styled(View)(({ theme }) => ({
  width: '100%',
  alignSelf: 'center' as const,
  flexDirection: 'column' as const,
  gap: theme.device.isTablet ? scale(10) : scale(30),
  alignItems: 'center' as const,
  paddingHorizontal: scale(32),
  justifyContent: 'center' as const,
  flex: 1
}))

export const AuthActionsContainer = styled(View)(({ theme }) => ({
  flexDirection: 'column' as const,
  gap: theme.device.isTablet ? scale(8) : scale(16),
  width: theme.device.isTablet ? '80%' : '100%',
  alignSelf: 'center' as const
}))
