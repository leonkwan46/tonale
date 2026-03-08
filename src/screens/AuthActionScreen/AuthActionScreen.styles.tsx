import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Card = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: scale(theme.spacing.lg),
  justifyContent: 'center',
  gap: scale(theme.spacing.lg)
}))

export const RefreshButton = styled(TouchableOpacity)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.md),
  borderWidth: 1,
  borderColor: theme.colors.primary,
  backgroundColor: 'transparent',
  marginTop: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.sm)
}))

export const RefreshButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  fontFamily: getSourGummyFontFamily('600')
}))

export const DebugText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.xs) : scale(theme.typography.xs),
  color: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400'),
  textAlign: 'center',
  marginBottom: scale(theme.spacing.sm),
  padding: scale(theme.spacing.sm),
  backgroundColor: theme.colors.surface,
  borderRadius: scale(theme.borderRadius.xs)
}))

