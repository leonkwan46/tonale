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
}

const getDepthColor = (
  customStyles: Button3DCustomStyles | undefined,
  color: ButtonColor | undefined,
  theme: AppTheme
): string => {
  if (customStyles?.depthColor) return customStyles.depthColor
  return color ? theme.colors.choiceButtonDepth[color] : 'transparent'
}

const getBackgroundColor = (
  customStyles: Button3DCustomStyles | undefined,
  color: ButtonColor | undefined,
  theme: AppTheme
): string => {
  if (customStyles?.backgroundColor) return customStyles.backgroundColor
  return color ? theme.colors.choiceButton[color] : 'transparent'
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
  customStyles?: Button3DCustomStyles
}>(({ theme, color, customStyles }) => {
  const depthColor = getDepthColor(customStyles, color, theme)
  const isTablet = theme.device.isTablet
  const offsets = getFlexibleDepthOffsets(isTablet)
  const borderRadius = color === 'finalTest' 
    ? scale(theme.borderRadius['2xl'])
    : scale(theme.borderRadius.lg)

  return {
    position: 'absolute' as const,
    backgroundColor: depthColor,
    borderRadius,
    top: offsets.top,
    left: offsets.left,
    right: offsets.right,
    bottom: offsets.bottom
  }
})

export const Button3DContent = styled.View<{
  color?: ButtonColor
  layoutType?: LayoutType
  fullWidth?: boolean
  height?: number
  customStyles?: Button3DCustomStyles
  isPressed?: boolean
}>(({ theme, color, layoutType, fullWidth, height, customStyles, isPressed }) => {
  const backgroundColor = getBackgroundColor(customStyles, color, theme)
  const borderRadius = color === 'finalTest'
    ? scale(theme.borderRadius['2xl'])
    : scale(theme.borderRadius.lg)
  const opacity = color === 'finalTest' && isPressed ? 0.8 : 1

  return {
    backgroundColor,
    borderRadius,
    opacity,
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
