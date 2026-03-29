import { forwardRef, useCallback, useState, type ReactNode } from 'react'
import type { TextInput, TextInputProps } from 'react-native'

import { Icon, type IconName } from '@/compLib/Icon'

import {
  InputFieldMultiline,
  InputFieldRoot,
  InputFieldText,
  RightSlot
} from './InputField.styles'

export type InputFieldProps = Omit<TextInputProps, 'placeholderTextColor'> & {
  leftIcon?: IconName
  rightSlot?: ReactNode
  disabled?: boolean
}

export const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      leftIcon,
      rightSlot,
      disabled = false,
      multiline = false,
      editable,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...textInputProps
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false)
    const isEditable = editable ?? !disabled

    const onFocus = useCallback(
      (e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
        setFocused(true)
        onFocusProp?.(e)
      },
      [onFocusProp]
    )

    const onBlur = useCallback(
      (e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
        setFocused(false)
        onBlurProp?.(e)
      },
      [onBlurProp]
    )

    const inputProps = {
      ref,
      editable: isEditable,
      onFocus,
      onBlur,
      ...textInputProps
    }

    return (
      <InputFieldRoot focused={focused} multiline={multiline} disabled={disabled}>
        {leftIcon && (
          <Icon name={leftIcon} sizeVariant="sm" colorVariant="primary" />
        )}

        {multiline ? (
          <InputFieldMultiline
            {...inputProps}
            multiline
            textAlignVertical={textInputProps.textAlignVertical ?? 'top'}
          />
        ) : (
          <InputFieldText {...inputProps} />
        )}

        {rightSlot && <RightSlot>{rightSlot}</RightSlot>}
      </InputFieldRoot>
    )
  }
)
