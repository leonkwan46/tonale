import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { forwardRef } from 'react'
import type { TextInputProps } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

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
    fontFamily: getSourGummyFontFamily('400')
  })
)

export const InputsContainer = styled.View(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.device.isTablet
    ? scale(theme.spacing.xs)
    : scale(theme.spacing.sm),
  width: '100%'
}))

export const InputField = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: scale(theme.borderRadius.md),
  paddingHorizontal: theme.device.isTablet
    ? scale(theme.spacing.sm)
    : scale(theme.spacing.md),
  height: theme.device.isTablet ? scale(40) : scale(56),
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  gap: theme.device.isTablet
    ? scale(theme.spacing.xs)
    : scale(theme.spacing.sm)
}))

const BaseInput = styled(TextInput)(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet
    ? scale(theme.typography.sm)
    : scale(theme.typography.sm),
  height: '100%',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const Input = forwardRef<TextInput, TextInputProps>(
  function AuthInput(props, ref) {
    const theme = useTheme()
    return (
      <BaseInput
        ref={ref}
        placeholderTextColor={theme.colors.placeholderText}
        {...props}
      />
    )
  }
)

export const EyeIcon = styled(TouchableOpacity)(({ theme }) => ({
  padding: scale(theme.spacing.xs)
}))

export const RequirementsText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet
    ? scale(theme.typography.xs)
    : scale(theme.typography.sm),
  textAlign: 'center',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const ForgotPasswordTouchable = styled(TouchableOpacity)(
  ({ theme }) => ({
    alignSelf: 'flex-end',
    paddingVertical: scale(theme.spacing.xs),
    paddingHorizontal: scale(theme.spacing.xs)
  })
)

export const ForgotPasswordText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet
    ? scale(theme.typography.xs)
    : scale(theme.typography.sm),
  color: theme.colors.primary,
  fontFamily: getSourGummyFontFamily('600')
}))

export const PrimaryButton = styled(TouchableOpacity)<{ disabled?: boolean }>(
  ({ theme, disabled }) => ({
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.device.isTablet
      ? scale(theme.spacing.sm)
      : scale(theme.spacing.md),
    borderRadius: scale(theme.borderRadius.md),
    opacity: disabled ? 0.7 : 1,
    marginTop: theme.device.isTablet
      ? scale(theme.spacing.sm)
      : scale(theme.spacing.md)
  })
)

export const PrimaryButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.device.isTablet
    ? scale(theme.typography.sm)
    : scale(theme.typography.base),
  marginRight: theme.device.isTablet
    ? scale(theme.spacing.xs)
    : scale(theme.spacing.sm),
  fontFamily: getSourGummyFontFamily('600')
}))
