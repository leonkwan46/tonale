import type { Depth3DColor } from '@/compLib/Depth3D/Depth3D.styles'
import { Typography, type TypographyColorVariant, type TypographySize } from '@/compLib/Typography'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import type { ReactNode } from 'react'
import { ActivityIndicator } from 'react-native'
import { scale } from 'react-native-size-matters'

import { PressableFeedback } from '@/utils/PressableFeedback'

export type { Depth3DColor } from '@/compLib/Depth3D/Depth3D.styles'

export type ButtonVariant = 'filled' | 'outlined' | 'ghost' | 'link';
export type ButtonColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'
  | 'finalTest';
export type ButtonSize = 'sm' | 'md';

export type ButtonRowLayout = 'pair' | 'solo'

const DEPTH_COLOR_MAP: Record<ButtonColor, Depth3DColor> = {
  primary: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
  neutral: 'grey',
  finalTest: 'finalTest'
}

export const getDepthColor = (color: ButtonColor): Depth3DColor =>
  DEPTH_COLOR_MAP[color]

export const isMultiWordLabel = (label: string): boolean =>
  label.trim().split(/\s+/).filter(Boolean).length > 1

const OUTLINED_BUTTON_LABEL_COLOR: Record<ButtonColor, TypographyColorVariant> = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  neutral: 'border',
  finalTest: 'warning'
}

const FILLED_BUTTON_LABEL_COLOR: Record<ButtonColor, TypographyColorVariant> = {
  primary: 'primaryContrast',
  success: 'successContrast',
  warning: 'warningContrast',
  error: 'errorContrast',
  neutral: 'text',
  finalTest: 'warningContrast'
}

export const getButtonLabelColorVariant = (
  variant: ButtonVariant,
  color: ButtonColor,
  ghostTint?: TypographyColorVariant
): TypographyColorVariant => {
  if (variant === 'link') return 'primary'
  if (variant === 'ghost') return ghostTint ?? 'primary'
  if (variant === 'outlined') return OUTLINED_BUTTON_LABEL_COLOR[color]
  return FILLED_BUTTON_LABEL_COLOR[color]
}

export const getButtonIconColorVariant = getButtonLabelColorVariant

export const ButtonSpinner = ({
  size,
  variant,
  color,
  ghostTint
}: {
  size: 'small' | 'large';
  variant: ButtonVariant;
  color: ButtonColor;
  ghostTint?: TypographyColorVariant;
}) => {
  const theme = useTheme()
  return (
    <ActivityIndicator
      size={size}
      color={theme.colors[getButtonIconColorVariant(variant, color, ghostTint)]}
    />
  )
}

export const DepthButtonSpinner = ({
  size,
  color
}: {
  size: 'small' | 'large';
  color: ButtonColor;
}) => {
  const theme = useTheme()
  return (
    <ActivityIndicator
      size={size}
      color={theme.colors[getButtonIconColorVariant('filled', color)]}
    />
  )
}

type RootProps = {
  variant: ButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
  block?: boolean;
  fullWidth?: boolean;
  rowLayout?: ButtonRowLayout;
  withTopSpacing?: boolean;
};

export const ButtonRoot = styled(PressableFeedback)<
  RootProps & { disabled?: boolean }
>(({
  theme,
  variant,
  color,
  size,
  block,
  fullWidth,
  rowLayout,
  withTopSpacing,
  disabled
}) => {
  const isTablet = theme.device.isTablet

  let backgroundColor = 'transparent'
  if (variant === 'filled') {
    if (color === 'finalTest') {
      backgroundColor = theme.components.button.finalTest.color
    } else if (color === 'neutral') {
      backgroundColor = theme.colors.surface
    } else {
      backgroundColor = theme.colors[color]
    }
  }

  const isThickOutlined = variant === 'outlined' && size === 'md'
  let borderWidth = 0
  let borderColor = 'transparent'
  if (variant === 'outlined') {
    borderWidth = isThickOutlined ? 2 : 1
    if (color === 'finalTest') {
      borderColor = theme.colors.warning
    } else if (color === 'neutral') {
      borderColor = theme.colors.border
    } else {
      borderColor = theme.colors[color]
    }
  }

  const paddingV =
    size === 'sm'
      ? scale(theme.spacing.sm)
      : isTablet
        ? scale(theme.spacing.sm)
        : scale(theme.spacing.md)

  const radius =
    size === 'sm' ? scale(theme.borderRadius.sm) : scale(theme.borderRadius.md)

  const effectiveFullWidth = fullWidth ?? block ?? false
  const flexPair =
    rowLayout === 'solo' ? 0 : rowLayout === 'pair' ? 1 : undefined
  const alignSelf =
    rowLayout === 'solo'
      ? 'center'
      : rowLayout === 'pair'
        ? 'stretch'
        : undefined

  return {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(theme.spacing.sm),
    width: effectiveFullWidth ? '100%' : undefined,
    alignSelf: effectiveFullWidth ? 'stretch' : alignSelf,
    flex: flexPair,
    paddingVertical: paddingV,
    paddingHorizontal:
      variant === 'link' || variant === 'ghost'
        ? scale(theme.spacing.xs)
        : scale(theme.spacing.md),
    borderRadius: radius,
    backgroundColor,
    borderWidth,
    borderColor,
    opacity: disabled ? 0.7 : 1,
    marginTop:
      withTopSpacing && size === 'md'
        ? isTablet
          ? scale(theme.spacing.sm)
          : scale(theme.spacing.md)
        : 0
  }
})

export type ButtonLabelProps = {
  variant: ButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
  isMultiWord: boolean;
  ghostTint?: TypographyColorVariant;
  children: ReactNode;
};

export const ButtonLabel = ({
  variant,
  color,
  size: _buttonSize,
  isMultiWord,
  ghostTint,
  children
}: ButtonLabelProps) => {
  const theme = useTheme()
  const isTablet = theme.device.isTablet
  const typographySize: TypographySize = isMultiWord
    ? 'sm'
    : isTablet
      ? 'sm'
      : 'md'

  const colorVariant = getButtonLabelColorVariant(variant, color, ghostTint)

  return (
    <Typography
      size={typographySize}
      weight="semibold"
      colorVariant={colorVariant}
      align={isMultiWord ? 'center' : undefined}
      style={isMultiWord ? { flexShrink: 1 } : undefined}
    >
      {children}
    </Typography>
  )
}

export const IconSlot = styled.View<{ edge: 'left' | 'right' }>(
  ({ theme, edge }) => ({
    marginRight: edge === 'left' ? scale(theme.spacing.xs) : 0,
    marginLeft: edge === 'right' ? scale(theme.spacing.xs) : 0
  })
)

export const DepthButtonInner = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: scale(theme.spacing.sm),
  paddingVertical: theme.device.isTablet
    ? scale(theme.spacing.sm)
    : scale(theme.spacing.md),
  width: '100%'
}))

export type DepthButtonLabelProps = {
  paletteKey: Depth3DColor;
  size: ButtonSize;
  isMultiWord: boolean;
  children: ReactNode;
};

const DEPTH_BUTTON_LABEL_COLOR: Record<Depth3DColor, TypographyColorVariant> = {
  blue: 'primaryContrast',
  red: 'errorContrast',
  green: 'successContrast',
  yellow: 'warningContrast',
  grey: 'text',
  finalTest: 'warningContrast'
}

const getDepthButtonLabelColorVariant = (
  paletteKey: Depth3DColor
): TypographyColorVariant => DEPTH_BUTTON_LABEL_COLOR[paletteKey]

export const DepthButtonLabel = ({
  paletteKey,
  size,
  isMultiWord,
  children
}: DepthButtonLabelProps) => {
  const theme = useTheme()
  const isTablet = theme.device.isTablet
  const typographySize: TypographySize =
    size === 'sm' ? (isTablet ? 'sm' : 'md') : 'lg'
  const colorVariant = getDepthButtonLabelColorVariant(paletteKey)

  return (
    <Typography
      size={typographySize}
      weight="semibold"
      colorVariant={colorVariant}
      align="center"
      style={isMultiWord ? { flexShrink: 1 } : undefined}
    >
      {children}
    </Typography>
  )
}
