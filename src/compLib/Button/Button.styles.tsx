import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

import type { Depth3DColor } from '@/compLib/Depth3D/Depth3D.styles'
import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { createPressableWithOpacity } from '@/utils/PressableFeedback'
import { createForwardProps } from '@/utils/styledProps'

const PressableOpacity07 = createPressableWithOpacity(0.7)

export type { Depth3DColor } from '@/compLib/Depth3D/Depth3D.styles'

export type ButtonVariant = 'filled' | 'outlined' | 'ghost'
export type ButtonColor = 'primary' | 'error' | Depth3DColor
export type ButtonSize = 'sm' | 'md'

export type ButtonRowLayout = 'pair' | 'solo'

export function resolveButtonPaletteKey(color: ButtonColor): Depth3DColor {
  if (color === 'primary') return 'blue'
  if (color === 'error') return 'red'
  return color
}

function isSemanticColor(color: ButtonColor): color is 'primary' | 'error' {
  return color === 'primary' || color === 'error'
}

type RootProps = {
  variant: ButtonVariant
  color: ButtonColor
  size: ButtonSize
  fullWidth: boolean
  rowLayout?: ButtonRowLayout
  withTopSpacing: boolean
}

export const ButtonRoot = styled(PressableOpacity07)<RootProps & { disabled?: boolean }>(
  ({ theme, variant, color, size, fullWidth, rowLayout, withTopSpacing, disabled }) => {
    const isTablet = theme.device.isTablet

    let backgroundColor = 'transparent'
    if (variant === 'filled') {
      if (isSemanticColor(color)) {
        backgroundColor = color === 'error' ? theme.colors.error : theme.colors.primary
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
        borderColor = color === 'error' ? theme.colors.error : theme.colors.primary
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
      size === 'sm'
        ? scale(theme.borderRadius.sm)
        : scale(theme.borderRadius.md)

    const flexPair = rowLayout === 'solo' ? 0 : rowLayout === 'pair' ? 1 : undefined
    const alignSelf =
      rowLayout === 'solo' ? 'center' : rowLayout === 'pair' ? 'stretch' : undefined

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
  }
)

export const ButtonLabel = styled.Text<{
  variant: ButtonVariant
  color: ButtonColor
  size: ButtonSize
  labelWeight: 'semibold' | 'bold'
  ghostTint?: 'neutral' | 'primary'
}>(({ theme, variant, color, size, labelWeight, ghostTint }) => {
  const isTablet = theme.device.isTablet
  const fontSize =
    size === 'sm'
      ? isTablet
        ? scale(theme.typography.sm)
        : scale(theme.typography.base)
      : isTablet
        ? scale(theme.typography.sm)
        : scale(theme.typography.base)

  let textColor = theme.colors.text
  if (variant === 'filled') {
    if (isSemanticColor(color)) {
      textColor = color === 'error' ? theme.colors.errorContrast : theme.colors.primaryContrast
    } else {
      textColor = theme.components.button[color].text
    }
  } else if (variant === 'outlined') {
    if (isSemanticColor(color)) {
      textColor = color === 'error' ? theme.colors.error : theme.colors.primary
    } else {
      textColor = theme.components.button[color].color
    }
  } else if (variant === 'ghost' && ghostTint === 'primary') {
    textColor = theme.colors.primary
  }

  return {
    color: textColor,
    fontSize,
    fontFamily: getSourGummyFontFamily(
      labelWeight === 'bold' ? theme.fontWeight.bold : theme.fontWeight.semibold
    )
  }
})

export const IconSlot = styled.View<{ edge: 'left' | 'right' }>(({ theme, edge }) => ({
  marginRight: edge === 'left' ? scale(theme.spacing.xs) : 0,
  marginLeft: edge === 'right' ? scale(theme.spacing.xs) : 0
}))

/** Inner row for `Button` when `depth` is true (inside Depth3D content). */
export const DepthButtonInner = styled(View, {
  shouldForwardProp: createForwardProps(['size'])
})<{ size: ButtonSize }>(({ theme, size }) => {
  const isTablet = theme.device.isTablet
  const paddingVertical =
    size === 'sm'
      ? scale(theme.spacing.sm)
      : isTablet
        ? scale(theme.spacing.sm)
        : scale(theme.spacing.md)
  return {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(theme.spacing.sm),
    paddingVertical,
    width: '100%'
  }
})

export const DepthButtonLabel = styled.Text<{
  paletteKey: Depth3DColor
  size: ButtonSize
  labelWeight: 'semibold' | 'bold'
}>(({ theme, paletteKey, size, labelWeight }) => {
  const isTablet = theme.device.isTablet
  const fontSize =
    size === 'sm'
      ? isTablet
        ? scale(theme.typography.sm)
        : scale(theme.typography.base)
      : isTablet
        ? scale(theme.typography.base)
        : scale(theme.typography.lg)

  return {
    color: theme.components.button[paletteKey].text,
    fontSize,
    textAlign: 'center',
    fontFamily: getSourGummyFontFamily(
      labelWeight === 'bold' ? theme.fontWeight.bold : theme.fontWeight.semibold
    )
  }
})
