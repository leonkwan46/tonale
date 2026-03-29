import styled from '@emotion/native'
import { TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { createForwardProps } from '@/utils/styledProps'

export type InputFieldVariant = 'default' | 'primary';

export const InputFieldRoot = styled.View<{
  variant: InputFieldVariant;
  multiline: boolean;
  disabled: boolean;
}>(({ theme, variant, multiline, disabled }) => {
  const isTablet = theme.device.isTablet
  return {
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    borderWidth: 1,
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
    borderColor:
      variant === 'primary'
        ? theme.colors.primary
        : theme.components.input.border,
    opacity: disabled ? 0.6 : 1,
    gap: isTablet ? scale(theme.spacing.xs) : scale(theme.spacing.sm)
  }
})

export const StyledTextInput = styled(TextInput, {
  shouldForwardProp: createForwardProps(['inputVariant'])
})<{ inputVariant: InputFieldVariant }>(({ theme }) => {
  const isTablet = theme.device.isTablet
  return {
    flex: 1,
    fontSize: isTablet
      ? scale(theme.typography.sm)
      : scale(theme.typography.base),
    height: '100%',
    color: theme.components.input.text,
    fontFamily: getSourGummyFontFamily()
  }
})

export const StyledMultilineInput = styled(TextInput, {
  shouldForwardProp: createForwardProps(['inputVariant'])
})<{ inputVariant: InputFieldVariant }>(({ theme }) => {
  const isTablet = theme.device.isTablet
  return {
    flex: 1,
    fontSize: isTablet
      ? scale(theme.typography.sm)
      : scale(theme.typography.base),
    minHeight: isTablet ? scale(100) : scale(130),
    color: theme.components.input.text,
    fontFamily: getSourGummyFontFamily(),
    lineHeight: isTablet ? scale(18) : scale(20)
  }
})

export const RightSlot = styled.View({
  justifyContent: 'center',
  alignItems: 'center'
})
