import { scale } from 'react-native-size-matters'
import styled from '@emotion/native'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ErrorContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.error,
  paddingHorizontal: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  paddingVertical: theme.device.isTablet ? scale(6) : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  gap: theme.device.isTablet ? scale(5) : scale(theme.spacing.sm)
}))

export const ErrorText = styled.Text(({ theme }) => ({
  color: theme.colors.error,
  fontSize: theme.device.isTablet ? scale(theme.typography.xs) : scale(theme.typography.sm),
  flex: 1,
  fontFamily: getSourGummyFontFamily()
}))

export const ScrollContentContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  flexGrow: 1,
  padding: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.lg),
  gap: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.xl)
}))
