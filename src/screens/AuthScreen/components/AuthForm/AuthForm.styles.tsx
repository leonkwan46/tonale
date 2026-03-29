import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { createPressableWithOpacity } from '@/utils/PressableFeedback'

const PressableOpacity07 = createPressableWithOpacity(0.7)

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

export const StatusText = styled.Text<{ variant: 'error' | 'success' }>(
  ({ theme, variant }) => ({
    color: variant === 'error' ? theme.colors.error : theme.colors.success,
    fontSize: theme.device.isTablet
      ? scale(theme.typography.xs)
      : scale(theme.typography.sm),
    flex: 1,
    fontFamily: getSourGummyFontFamily()
  })
)

export const InputsContainer = styled.View(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.device.isTablet
    ? scale(theme.spacing.xs)
    : scale(theme.spacing.sm),
  width: '100%'
}))

export const EyeIcon = styled(PressableOpacity07)(({ theme }) => ({
  padding: scale(theme.spacing.xs)
}))

export const RequirementsText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet
    ? scale(theme.typography.xs)
    : scale(theme.typography.sm),
  textAlign: 'center',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily()
}))

export const ForgotPasswordWrap = styled.View(() => ({
  alignSelf: 'flex-end'
}))
