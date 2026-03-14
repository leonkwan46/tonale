import styled from '@emotion/native'
import { TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const EmailPill = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  borderWidth: 1,
  borderColor: theme.colors.primary,
  borderRadius: scale(30),
  paddingHorizontal: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.lg),
  paddingVertical: theme.device.isTablet ? scale(theme.spacing.xs) : scale(theme.spacing.sm),
  gap: theme.device.isTablet ? scale(6) : scale(theme.spacing.sm)
}))

export const EmailPillText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const InputField = styled.View<{ disabled?: boolean }>(({ theme, disabled }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: scale(theme.borderRadius.md),
  paddingHorizontal: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  height: theme.device.isTablet ? scale(40) : scale(56),
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  opacity: disabled ? 0.6 : 1,
  gap: theme.device.isTablet ? scale(6) : scale(theme.spacing.sm)
}))

export const Input = styled(TextInput)(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  height: '100%',
  color: theme.colors.text,
  placeholderTextColor: theme.colors.placeholderText,
  fontFamily: getSourGummyFontFamily('400')
}))

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
  fontFamily: getSourGummyFontFamily('400')
}))

export const PrimaryButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  fontFamily: getSourGummyFontFamily('600')
}))

export const SaveButtonContent = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  width: '100%'
}))

export const MessageText = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.base),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: scale(theme.typography.lg),
  textAlign: 'center'
}))

export const SuccessContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: theme.colors.success,
  paddingHorizontal: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md),
  paddingVertical: theme.device.isTablet ? scale(6) : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  gap: theme.device.isTablet ? scale(5) : scale(theme.spacing.sm)
}))

export const SuccessText = styled.Text(({ theme }) => ({
  color: theme.colors.success,
  fontSize: theme.device.isTablet ? scale(theme.typography.xs) : scale(theme.typography.sm),
  flex: 1,
  fontFamily: getSourGummyFontFamily('400')
}))
