import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const ScrollContentContainer = styled.View(() => ({
  flexGrow: 1
}))

export const ContentWrapper = styled(View)(({ theme }) => ({
  width: '100%',
  alignSelf: 'center' as const,
  flexDirection: 'column' as const,
  gap: theme.device.isTablet ? scale(theme.spacing.sm) : scale(30),
  alignItems: 'center' as const,
  paddingHorizontal: scale(theme.spacing.xl),
  justifyContent: 'center' as const,
  flex: 1
}))

export const AuthActionsContainer = styled(View)(({ theme }) => ({
  flexDirection: 'column' as const,
  gap: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  width: theme.device.isTablet ? '80%' : '100%',
  alignSelf: 'center' as const
}))
