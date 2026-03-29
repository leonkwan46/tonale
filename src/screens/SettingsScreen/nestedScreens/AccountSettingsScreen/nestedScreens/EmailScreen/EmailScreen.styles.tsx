import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const EmailPill = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  borderWidth: 1,
  borderColor: theme.colors.primary,
  borderRadius: scale(30),
  paddingHorizontal: theme.device.isTablet
    ? scale(theme.spacing.md)
    : scale(theme.spacing.lg),
  paddingVertical: theme.device.isTablet
    ? scale(theme.spacing.xs)
    : scale(theme.spacing.sm),
  gap: theme.device.isTablet ? scale(6) : scale(theme.spacing.sm)
}))

export const EmailPillText = styled(Typography)(() => ({}))

export const ErrorContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  borderWidth: 1,
  borderColor: theme.colors.error,
  paddingHorizontal: theme.device.isTablet
    ? scale(theme.spacing.sm)
    : scale(theme.spacing.md),
  paddingVertical: theme.device.isTablet ? scale(6) : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  gap: theme.device.isTablet ? scale(5) : scale(theme.spacing.sm)
}))

export const ErrorText = styled(Typography)(() => ({
  flex: 1
}))

export const MessageText = styled(Typography)(({ theme }) => ({
  lineHeight: scale(theme.typography.lg)
}))

export const SuccessContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: theme.colors.success,
  paddingHorizontal: theme.device.isTablet
    ? scale(theme.spacing.sm)
    : scale(theme.spacing.md),
  paddingVertical: theme.device.isTablet ? scale(6) : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  gap: theme.device.isTablet ? scale(5) : scale(theme.spacing.sm)
}))

export const SuccessText = styled(Typography)(() => ({
  flex: 1
}))
