import type { Depth3DColor } from '@/compLib/Depth3D/Depth3D.styles'
import { Typography, type TypographySize } from '@/compLib/Typography'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import type { ReactNode } from 'react'
import { scale } from 'react-native-size-matters'

import { createPressableWithOpacity } from '@/utils/PressableFeedback'

const PressableOpacity07 = createPressableWithOpacity(0.7)

export type { Depth3DColor } from '@/compLib/Depth3D/Depth3D.styles'

export type ButtonVariant = 'filled' | 'outlined' | 'ghost';
export type ButtonColor = 'primary' | 'error' | Depth3DColor;
export type ButtonSize = 'sm' | 'md';

export type ButtonRowLayout = 'pair' | 'solo';

export const resolveButtonPaletteKey = (color: ButtonColor): Depth3DColor => {
  if (color === 'primary') return 'blue'
  if (color === 'error') return 'red'
  return color
}

/** More than one word → use compact label typography (not the large md depth track). */
export const isMultiWordLabel = (label: string): boolean =>
  label.trim().split(/\s+/).filter(Boolean).length > 1

const isSemanticColor = (color: ButtonColor): color is 'primary' | 'error' =>
  color === 'primary' || color === 'error'

type RootProps = {
  variant: ButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
  fullWidth: boolean;
  rowLayout?: ButtonRowLayout;
  withTopSpacing: boolean;
};

export const ButtonRoot = styled(PressableOpacity07)<
  RootProps & { disabled?: boolean }
>(({
  theme,
  variant,
  color,
  size,
  fullWidth,
  rowLayout,
  withTopSpacing,
  disabled
}) => {
  const isTablet = theme.device.isTablet

  let backgroundColor = 'transparent'
  if (variant === 'filled') {
    if (isSemanticColor(color)) {
      backgroundColor =
        color === 'error' ? theme.colors.error : theme.colors.primary
    } else {
      backgroundColor = theme.components.button[color].color
    }
  }

  const isThickOutlined = variant === 'outlined' && size === 'md'
  let borderWidth = 0
  let borderColor = 'transparent'
  if (variant === 'outlined') {
    borderWidth = isThickOutlined ? 2 : 1
    if (isSemanticColor(color)) {
      borderColor =
        color === 'error' ? theme.colors.error : theme.colors.primary
    } else {
      borderColor = theme.components.button[color].color
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
    width: fullWidth ? '100%' : undefined,
    alignSelf: fullWidth ? 'stretch' : alignSelf,
    flex: flexPair,
    paddingVertical: paddingV,
    paddingHorizontal:
      variant === 'ghost' ? scale(theme.spacing.xs) : scale(theme.spacing.md),
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
  multiWordLabel: boolean;
  labelWeight: 'semibold' | 'bold';
  ghostTint?: 'neutral' | 'primary';
  children: ReactNode;
};

export const ButtonLabel = ({
  variant,
  color,
  size: _buttonSize,
  multiWordLabel,
  labelWeight,
  ghostTint = 'neutral',
  children
}: ButtonLabelProps) => {
  const theme = useTheme()
  const isTablet = theme.device.isTablet
  const typographySize: TypographySize = multiWordLabel
    ? 'sm'
    : isTablet
      ? 'sm'
      : 'md'

  let textColor = theme.colors.text
  if (variant === 'filled') {
    if (isSemanticColor(color)) {
      textColor =
        color === 'error'
          ? theme.colors.errorContrast
          : theme.colors.primaryContrast
    } else {
      const pk = resolveButtonPaletteKey(color)
      textColor = theme.components.button[pk].text
    }
  } else if (variant === 'outlined') {
    if (isSemanticColor(color)) {
      textColor = color === 'error' ? theme.colors.error : theme.colors.primary
    } else {
      const pk = resolveButtonPaletteKey(color)
      textColor = theme.components.button[pk].color
    }
  } else if (variant === 'ghost' && ghostTint === 'primary') {
    textColor = theme.colors.primary
  }

  return (
    <Typography
      size={typographySize}
      weight={labelWeight}
      color={textColor}
      align={multiWordLabel ? 'center' : undefined}
      style={multiWordLabel ? { flexShrink: 1 } : undefined}
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

/** Inner row for `Button` when `depth` is true (inside Depth3D content). */
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
  multiWordLabel: boolean;
  labelWeight: 'semibold' | 'bold';
  children: ReactNode;
};

export const DepthButtonLabel = ({
  paletteKey,
  size,
  multiWordLabel,
  labelWeight,
  children
}: DepthButtonLabelProps) => {
  const theme = useTheme()
  const isTablet = theme.device.isTablet
  const depthSize: ButtonSize = multiWordLabel ? 'sm' : size
  const typographySize: TypographySize =
    depthSize === 'sm' ? (isTablet ? 'sm' : 'md') : 'lg'
  const textColor = theme.components.button[paletteKey].text

  return (
    <Typography
      size={typographySize}
      weight={labelWeight}
      color={textColor}
      align="center"
      style={multiWordLabel ? { flexShrink: 1 } : undefined}
    >
      {children}
    </Typography>
  )
}
