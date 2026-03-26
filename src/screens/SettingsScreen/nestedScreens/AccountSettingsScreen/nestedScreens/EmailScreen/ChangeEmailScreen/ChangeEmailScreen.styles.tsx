import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import type { TextInputProps } from 'react-native'
import { TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const FormCard = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.settingSection,
  borderRadius: scale(theme.borderRadius.md),
  padding: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.lg),
  gap: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md)
}))

export const InputField = styled.View<{ disabled?: boolean }>(({ theme, disabled }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: scale(theme.borderRadius.md),
  paddingHorizontal: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  height: theme.device.isTablet ? scale(theme.spacing.xxl) : scale(theme.spacing.xxxl),
  backgroundColor: theme.components.input.background,
  borderColor: theme.components.input.border,
  opacity: disabled ? 0.6 : 1,
  gap: theme.device.isTablet ? scale(6) : scale(theme.spacing.sm)
}))

const BaseInput = styled(TextInput)(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  height: '100%',
  color: theme.components.input.text,
  fontFamily: getSourGummyFontFamily()
}))

export const Input = (props: TextInputProps) => {
  const theme = useTheme()
  return (
    <BaseInput
      {...props}
      placeholderTextColor={theme.components.input.placeholder}
    />
  )
}

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

export const PrimaryButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.primaryContrast,
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

export const SaveButtonContent = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  width: '100%'
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

