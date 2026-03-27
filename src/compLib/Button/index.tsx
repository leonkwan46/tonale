import { useTheme } from '@emotion/react'
import { ActivityIndicator } from 'react-native'

import { Depth3D, type LayoutType } from '@/compLib/Depth3D'
import { Icon, type IconName } from '@/compLib/Icon'
import type { AppTheme, IconColorVariant } from '@/config/theme/theme'

import {
  ButtonLabel,
  ButtonRoot,
  DepthButtonInner,
  DepthButtonLabel,
  IconSlot,
  isMultiWordLabel,
  resolveButtonPaletteKey,
  type ButtonColor,
  type ButtonRowLayout,
  type ButtonSize,
  type ButtonVariant
} from './Button.styles'

export type ButtonProps = {
  variant: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Modal row: two buttons share width (`pair`) or single centered (`solo`). */
  rowLayout?: ButtonRowLayout;
  /** Adds top margin (auth form primary). */
  withTopSpacing?: boolean;
  /** Destructive confirm uses bold label. */
  labelWeight?: 'semibold' | 'bold';
  /** Ghost only: `primary` matches link-style text (e.g. Forgot password). */
  ghostTint?: 'neutral' | 'primary';
  /** Renders with 3D depth (see `Depth3D`). Ignores flat `variant` chrome. */
  depth?: boolean;
  /** When `depth` is true: forwarded to `Depth3D` (`row` for full-width bars). */
  depthLayout?: LayoutType;
  /** When `depth` is true: forwarded to `Depth3D`. */
  depthWidth?: number;
  depthHeight?: number;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  testID?: string;
  label: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
};

function isSemanticColor(color: ButtonColor): color is 'primary' | 'error' {
  return color === 'primary' || color === 'error'
}

function iconColorVariant(
  variant: ButtonVariant,
  color: ButtonColor
): IconColorVariant {
  if (variant === 'filled') {
    if (isSemanticColor(color)) {
      return color === 'error' ? 'errorContrast' : 'primaryContrast'
    }
    return 'text'
  }
  if (variant === 'outlined') {
    if (isSemanticColor(color)) {
      return color === 'error' ? 'error' : 'primary'
    }
    return 'text'
  }
  return 'text'
}

function getIconProps(
  variant: ButtonVariant,
  color: ButtonColor,
  theme: AppTheme
): { colorVariant?: IconColorVariant; color?: string } {
  if (!isSemanticColor(color)) {
    const pk = resolveButtonPaletteKey(color)
    if (variant === 'filled') {
      return { color: theme.components.button[pk].text }
    }
    if (variant === 'outlined') {
      return { color: theme.components.button[pk].color }
    }
    return { colorVariant: 'text' }
  }
  return { colorVariant: iconColorVariant(variant, color) }
}

function getSpinnerColor(
  variant: ButtonVariant,
  color: ButtonColor,
  theme: AppTheme
): string {
  if (!isSemanticColor(color)) {
    const pk = resolveButtonPaletteKey(color)
    if (variant === 'filled') {
      return theme.components.button[pk].text
    }
    return theme.components.button[pk].color
  }
  if (variant === 'filled' && color === 'error') {
    return theme.colors.errorContrast
  }
  if (variant === 'filled') {
    return theme.colors.primaryContrast
  }
  return theme.colors.primary
}

export const Button = ({
  variant,
  color = 'primary',
  size = 'md',
  fullWidth = false,
  rowLayout,
  withTopSpacing = false,
  labelWeight = 'semibold',
  ghostTint = 'neutral',
  depth = false,
  depthLayout,
  depthWidth,
  depthHeight,
  disabled = false,
  loading = false,
  onPress,
  testID,
  label,
  leftIcon,
  rightIcon
}: ButtonProps) => {
  const theme = useTheme()
  const isDisabled = disabled || loading
  const paletteKey = resolveButtonPaletteKey(color)
  const iconProps = getIconProps(variant, color, theme)
  const multiWordLabel = isMultiWordLabel(label)
  const iconSizeVariant = multiWordLabel || size === 'sm' ? 'sm' : 'md'

  const spinnerColor = getSpinnerColor(variant, color, theme)

  if (depth) {
    return (
      <Depth3D
        testID={testID}
        color={paletteKey}
        layoutType={depthLayout}
        fullWidth={fullWidth}
        width={depthWidth}
        height={depthHeight}
        disabled={isDisabled}
        onPress={onPress}
      >
        {() => (
          <DepthButtonInner>
            {loading && (
              <ActivityIndicator
                size="small"
                color={theme.components.button[paletteKey].text}
              />
            )}
            {!loading && leftIcon && (
              <IconSlot edge="left">
                <Icon
                  name={leftIcon}
                  sizeVariant={iconSizeVariant}
                  color={theme.components.button[paletteKey].text}
                />
              </IconSlot>
            )}
            <DepthButtonLabel
              paletteKey={paletteKey}
              size={size}
              multiWordLabel={multiWordLabel}
              labelWeight={labelWeight}
            >
              {label}
            </DepthButtonLabel>
            {!loading && rightIcon && (
              <IconSlot edge="right">
                <Icon
                  name={rightIcon}
                  sizeVariant={iconSizeVariant}
                  color={theme.components.button[paletteKey].text}
                />
              </IconSlot>
            )}
          </DepthButtonInner>
        )}
      </Depth3D>
    )
  }

  return (
    <ButtonRoot
      testID={testID}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      rowLayout={rowLayout}
      withTopSpacing={withTopSpacing}
      disabled={isDisabled}
      onPress={onPress}
    >
      {loading && <ActivityIndicator size="small" color={spinnerColor} />}
      {!loading && leftIcon && (
        <IconSlot edge="left">
          <Icon name={leftIcon} sizeVariant={iconSizeVariant} {...iconProps} />
        </IconSlot>
      )}
      <ButtonLabel
        variant={variant}
        color={color}
        size={size}
        multiWordLabel={multiWordLabel}
        labelWeight={labelWeight}
        ghostTint={ghostTint}
      >
        {label}
      </ButtonLabel>
      {!loading && rightIcon && (
        <IconSlot edge="right">
          <Icon name={rightIcon} sizeVariant={iconSizeVariant} {...iconProps} />
        </IconSlot>
      )}
    </ButtonRoot>
  )
}
