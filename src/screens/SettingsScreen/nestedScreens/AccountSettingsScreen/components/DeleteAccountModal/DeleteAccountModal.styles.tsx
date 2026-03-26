import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { forwardRef } from 'react'
import type { TextInputProps } from 'react-native'
import { Modal, TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'

export const ModalMask = styled(Modal)({})

export const ModalMaskContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.components.modal.mask,
  justifyContent: 'center',
  padding: scale(theme.spacing.lg)
}))

export const ModalCard = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(theme.borderRadius.md),
  padding: scale(theme.spacing.lg),
  gap: scale(theme.spacing.md)
}))

export const TitleText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: scale(theme.typography.lg),
  fontWeight: theme.fontWeight.semibold,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

export const BodyText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: scale(theme.typography.base),
  fontFamily: getSourGummyFontFamily()
}))

export const InputField = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.components.input.background,
  borderWidth: scale(1),
  borderColor: theme.components.input.border,
  borderRadius: scale(theme.borderRadius.md),
  paddingHorizontal: scale(theme.spacing.md),
  height: theme.device.isTablet ? scale(40) : scale(56),
  gap: theme.device.isTablet ? scale(theme.spacing.xs) : scale(theme.spacing.sm)
}))

const BaseInput = styled(TextInput)(({ theme }) => ({
  flex: 1,
  fontSize: scale(theme.typography.sm),
  height: '100%',
  color: theme.components.input.text,
  fontFamily: getSourGummyFontFamily()
}))

export const Input = forwardRef<TextInput, TextInputProps>(
  function DeleteAccountPasswordInput(props, ref) {
    const theme = useTheme()
    return (
      <BaseInput
        ref={ref}
        placeholderTextColor={theme.components.input.placeholder}
        {...props}
      />
    )
  }
)

export const EyeButton = styled.Pressable(({ theme }) => ({
  paddingVertical: scale(theme.spacing.xs),
  paddingHorizontal: scale(theme.spacing.xs)
}))

export const StatusContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: scale(1),
  borderColor: theme.colors.error,
  paddingHorizontal: scale(theme.spacing.md),
  paddingVertical: scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  gap: scale(theme.spacing.sm)
}))

export const StatusText = styled.Text(({ theme }) => ({
  color: theme.colors.error,
  fontSize: scale(theme.typography.sm),
  flex: 1,
  fontFamily: getSourGummyFontFamily()
}))

export const ActionsRow = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: scale(theme.spacing.md),
  alignItems: 'center'
}))

export const CancelButton = styled.Pressable(({ theme }) => ({
  paddingVertical: scale(theme.spacing.sm),
  paddingHorizontal: scale(theme.spacing.md)
}))

export const CancelButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: scale(theme.typography.base),
  fontWeight: theme.fontWeight.semibold,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

export const ConfirmButton = styled.Pressable(({ theme }) => ({
  paddingVertical: scale(theme.spacing.sm),
  paddingHorizontal: scale(theme.spacing.md),
  backgroundColor: theme.colors.error,
  borderRadius: scale(theme.borderRadius.sm),
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(theme.spacing.sm)
}))

export const ConfirmButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.errorContrast,
  fontSize: scale(theme.typography.base),
  fontWeight: theme.fontWeight.bold,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold)
}))

