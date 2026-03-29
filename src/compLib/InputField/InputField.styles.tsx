import { getInputTypographyStyle } from '@/compLib/Typography'
import { useTheme } from '@emotion/react'
import styled from '@emotion/native'
import { forwardRef } from 'react'
import { TextInput, type TextInputProps } from 'react-native'
import { scale } from 'react-native-size-matters'

const forwardAllNativeInputProps = () => true

const StyledTextInput = styled(TextInput, {
  shouldForwardProp: forwardAllNativeInputProps
})(({ theme }) => {
  const typo = getInputTypographyStyle(theme)
  return {
    flex: 1,
    ...typo,
    height: '100%',
    color: theme.components.input.text
  }
})

const StyledMultilineInput = styled(TextInput, {
  shouldForwardProp: forwardAllNativeInputProps
})(({ theme }) => {
  const typo = getInputTypographyStyle(theme, { multiline: true })
  return {
    flex: 1,
    ...typo,
    minHeight: theme.device.isTablet ? scale(100) : scale(130),
    color: theme.components.input.text
  }
})

export const InputFieldText = forwardRef<TextInput, TextInputProps>((props, ref) => {
  const theme = useTheme()
  return (
    <StyledTextInput
      ref={ref}
      placeholderTextColor={theme.components.input.placeholder}
      {...props}
    />
  )
})

export const InputFieldMultiline = forwardRef<TextInput, TextInputProps>((props, ref) => {
  const theme = useTheme()
  return (
    <StyledMultilineInput
      ref={ref}
      placeholderTextColor={theme.components.input.placeholder}
      {...props}
    />
  )
})

export const InputFieldRoot = styled.View<{
  focused: boolean
  multiline: boolean
  disabled: boolean
}>(({ theme, focused, multiline, disabled }) => {
  const isTablet = theme.device.isTablet
  const showFocusRing = focused && !disabled
  return {
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    borderWidth: showFocusRing ? scale(1.5) : scale(1),
    borderRadius: scale(theme.borderRadius.md),
    paddingHorizontal: isTablet
      ? scale(theme.spacing.sm)
      : scale(theme.spacing.md),
    ...(multiline
      ? {
          paddingVertical: isTablet
            ? scale(theme.spacing.sm)
            : scale(theme.spacing.md),
          minHeight: isTablet ? scale(120) : scale(160)
        }
      : {
          height: isTablet ? scale(40) : scale(56)
        }),
    backgroundColor: theme.components.input.background,
    borderColor: showFocusRing
      ? theme.colors.primary
      : theme.components.input.border,
    opacity: disabled ? 0.6 : 1,
    gap: isTablet ? scale(theme.spacing.xs) : scale(theme.spacing.sm)
  }
})

export const RightSlot = styled.View({
  justifyContent: 'center',
  alignItems: 'center'
})
