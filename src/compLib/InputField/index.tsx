import { useTheme } from '@emotion/react'
import { forwardRef, type ReactNode } from 'react'
import type { TextInput, TextInputProps } from 'react-native'

import { Icon, type IconName } from '@/compLib/Icon'

import {
    InputFieldRoot,
    RightSlot,
    StyledMultilineInput,
    StyledTextInput,
    type InputFieldVariant
} from './InputField.styles'

/**
 * Wraps RN `TextInput` with shared chrome (border, typography, placeholder color).
 * All standard `TextInput` props are supported except `placeholderTextColor`, which
 * comes from the theme. Add only compLib-specific props below.
 */
export type InputFieldProps = Omit<TextInputProps, 'placeholderTextColor'> & {
  leftIcon?: IconName;
  rightSlot?: ReactNode;
  variant?: InputFieldVariant;
  /** Dims the container; editing is off unless you also pass `editable`. */
  disabled?: boolean;
};

export const InputField = forwardRef<TextInput, InputFieldProps>(
  function InputField(
    {
      leftIcon,
      rightSlot,
      variant = 'default',
      disabled = false,
      multiline = false,
      editable,
      ...textInputProps
    },
    ref
  ) {
    const theme = useTheme()
    const isEditable = editable ?? !disabled

    const inputProps = {
      ref,
      inputVariant: variant,
      placeholderTextColor: theme.components.input.placeholder,
      editable: isEditable,
      ...textInputProps
    }

    return (
      <InputFieldRoot
        variant={variant}
        multiline={multiline}
        disabled={disabled}
      >
        {leftIcon && (
          <Icon name={leftIcon} sizeVariant="sm" colorVariant="primary" />
        )}

        {multiline ? (
          <StyledMultilineInput
            {...inputProps}
            multiline
            textAlignVertical={textInputProps.textAlignVertical ?? 'top'}
          />
        ) : (
          <StyledTextInput {...inputProps} />
        )}

        {rightSlot && <RightSlot>{rightSlot}</RightSlot>}
      </InputFieldRoot>
    )
  }
)
