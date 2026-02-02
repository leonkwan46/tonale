import type { AppTheme } from '@/config/theme/theme'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

const getFlexibleDepthOffsets = (isTablet: boolean) => ({
  top: scale(2),
  left: isTablet ? scale(2) : scale(1),
  right: isTablet ? scale(-2) : scale(-3),
  bottom: isTablet ? scale(-3) : scale(-4)
})

export type ButtonColor = 'blue' | 'red' | 'green' | 'yellow' | 'grey' | 'finalTest'
export type LayoutType = 'grid' | 'row'

export interface Button3DCustomStyles {
  backgroundColor?: string
  depthColor?: string
  borderWidth?: number
  borderColor?: string
}

const getDepthColor = (
  customStyles: Button3DCustomStyles | undefined,
  color: ButtonColor | undefined,
  variant: 'filled' | 'outlined',
  theme: AppTheme
): string => {
  if (customStyles?.depthColor) return customStyles.depthColor
  if (variant === 'outlined') return 'transparent'
  return color ? theme.colors.choiceButtonDepth[color] : 'transparent'
}

const getBackgroundColor = (
  customStyles: Button3DCustomStyles | undefined,
  color: ButtonColor | undefined,
  variant: 'filled' | 'outlined',
  theme: AppTheme
): string => {
  if (customStyles?.backgroundColor) return customStyles.backgroundColor
  if (variant === 'outlined') return 'transparent'
  return color ? theme.colors.choiceButton[color] : 'transparent'
}

const getBorderColor = (
  customStyles: Button3DCustomStyles | undefined,
  color: ButtonColor | undefined,
  variant: 'filled' | 'outlined',
  theme: AppTheme
): string => {
  if (customStyles?.borderColor) return customStyles.borderColor
  if (variant === 'outlined' && color) return theme.colors.choiceButton[color]
  return 'transparent'
}

const getBorderWidth = (
  customStyles: Button3DCustomStyles | undefined,
  variant: 'filled' | 'outlined'
): number => {
  return customStyles?.borderWidth ?? (variant === 'outlined' ? scale(1) : 0)
}

const getContentWidth = (
  layoutType: LayoutType | undefined,
  fullWidth: boolean | undefined
): '100%' | undefined => {
  return (layoutType === 'row' || layoutType === 'grid' || fullWidth) ? '100%' : undefined
}

export const Button3DContainer = styled.TouchableOpacity<{ isPressed: boolean; layoutType?: LayoutType; fullWidth?: boolean; width?: number; height?: number }>(({ isPressed, layoutType, fullWidth, width, height }) => {
  const getWidth = () => {
    if (width !== undefined) return width
    if (fullWidth) return '100%'
    if (layoutType === 'row') return '100%'
    if (layoutType === 'grid') return '50%'
    return 'auto'
  }

  return {
    position: 'relative',
    alignSelf: (layoutType === 'row' || fullWidth) ? 'stretch' : 'center',
    width: getWidth(),
    height,
    transform: [{ scale: isPressed ? 0.95 : 1 }],
    activeOpacity: 1
  }
})

export const Button3DDepth = styled.View<{
  color?: ButtonColor
  variant?: 'filled' | 'outlined'
  customStyles?: Button3DCustomStyles
}>(({ theme, color, variant = 'filled', customStyles }) => {
  const depthColor = getDepthColor(customStyles, color, variant, theme)
  const isTablet = theme.device.isTablet
  const offsets = getFlexibleDepthOffsets(isTablet)

  return {
    position: 'absolute' as const,
    backgroundColor: depthColor,
    borderRadius: scale(theme.borderRadius.lg),
    top: offsets.top,
    left: offsets.left,
    right: offsets.right,
    bottom: offsets.bottom
  }
})

export const Button3DContent = styled.View<{
  color?: ButtonColor
  variant?: 'filled' | 'outlined'
  layoutType?: LayoutType
  fullWidth?: boolean
  height?: number
  customStyles?: Button3DCustomStyles
}>(({ theme, color, variant = 'filled', layoutType, fullWidth, height, customStyles }) => {
  const backgroundColor = getBackgroundColor(customStyles, color, variant, theme)
  const borderColor = getBorderColor(customStyles, color, variant, theme)
  const borderWidth = getBorderWidth(customStyles, variant)

  return {
    backgroundColor,
    borderRadius: scale(theme.borderRadius.lg),
    borderWidth,
    borderColor,
    position: 'relative' as const,
    zIndex: 1,
    width: getContentWidth(layoutType, fullWidth),
    height,
    ...(height && {
      justifyContent: 'center',
      alignItems: 'center'
    })
  }
})
