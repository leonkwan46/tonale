import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'
import { PressableFeedback } from '@/utils/PressableFeedback'

export const FormSection = styled(Animated.View)(({ theme }) => ({
  minHeight: theme.device.isTablet ? scale(100) : scale(200),
  width: '100%',
  flexDirection: 'column',
  gap: scale(theme.spacing.sm)
}))

export const StatusContainer = styled.View<{ variant: 'error' | 'success' }>(
  ({ theme, variant }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor:
      variant === 'error' ? theme.colors.error : theme.colors.success,
    paddingHorizontal: theme.device.isTablet
      ? scale(theme.spacing.sm)
      : scale(theme.spacing.md),
    paddingVertical: theme.device.isTablet
      ? scale(theme.spacing.xs)
      : scale(theme.spacing.sm),
    borderRadius: scale(theme.borderRadius.sm),
    gap: theme.device.isTablet
      ? scale(theme.spacing.xs)
      : scale(theme.spacing.sm)
  })
)

export const StatusText = styled(Typography)(() => ({
  flex: 1
}))

export const InputsContainer = styled(Animated.View)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.device.isTablet
    ? scale(theme.spacing.xs)
    : scale(theme.spacing.sm),
  width: '100%'
}))

export const EyeIcon = styled(PressableFeedback)(({ theme }) => ({
  padding: scale(theme.spacing.xs)
}))

export const RequirementsText = styled(Typography)(() => ({}))

export const ForgotPasswordWrap = styled.View(() => ({
  alignSelf: 'flex-end',
  alignItems: 'flex-end',
  flexDirection: 'column'
}))

export const ForgotPasswordHint = styled(Typography)(({ theme }) => ({
  color: theme.colors.icon
}))
