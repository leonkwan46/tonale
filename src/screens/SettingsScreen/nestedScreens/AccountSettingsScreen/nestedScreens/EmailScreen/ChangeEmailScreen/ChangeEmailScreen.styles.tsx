import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const FormCard = styled.View(({ theme }) => ({
  backgroundColor: theme.components.settings.sectionBackground,
  borderRadius: scale(theme.borderRadius.md),
  padding: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.lg),
  gap: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md)
}))

export const ErrorContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.error,
  paddingHorizontal: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  paddingVertical: theme.device.isTablet ? scale(theme.spacing.xs) : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  gap: theme.device.isTablet ? scale(5) : scale(theme.spacing.sm)
}))

export const ErrorText = styled.Text(({ theme }) => ({
  color: theme.colors.error,
  fontSize: theme.device.isTablet ? scale(theme.typography.xs) : scale(theme.typography.sm),
  flex: 1,
  fontFamily: getSourGummyFontFamily()
}))

export const SuccessContainer = styled.View(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: scale(theme.borderRadius.md),
  borderWidth: 1,
  borderColor: theme.colors.success,
  padding: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.lg),
  gap: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md)
}))

export const SuccessText = styled.Text(({ theme }) => ({
  color: theme.colors.success,
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily()
}))

