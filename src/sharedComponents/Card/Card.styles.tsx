import type { AppTheme } from '@/config/theme/theme'
import styled from '@emotion/native'
import type { DimensionValue } from 'react-native'
import { scale } from 'react-native-size-matters'

const getDepthOffsets = () => ({
  top: scale(2),
  left: scale(2)
})

const getSquareSize = (size: number, isTablet: boolean): number => {
  return isTablet ? scale(size * 0.8) : scale(size)
}

export type CardColor = 'blue' | 'red' | 'green' | 'yellow' | 'grey'

export type CardVariant = 'filled' | 'outlined'

interface CardCustomStyles {
  width?: DimensionValue
  height?: DimensionValue
  backgroundColor?: string
  depthColor?: string
  borderWidth?: number
  borderColor?: string
}

const getDepthColor = (
  customStyles: CardCustomStyles | undefined,
  color: CardColor | undefined,
  variant: CardVariant,
  theme: AppTheme
): string => {
  if (customStyles?.depthColor) return customStyles.depthColor
  if (variant === 'outlined') return 'transparent'
  return color ? theme.colors.choiceButtonDepth[color] : 'transparent'
}

const hasCustomDimensions = (customStyles: CardCustomStyles | undefined): boolean => {
  return !!(customStyles?.width && customStyles?.height)
}

export const CardContainer = styled.View({
  position: 'relative'
})

export const CardDepth = styled.View<{ 
  color?: CardColor
  variant?: CardVariant
  size?: number
  customStyles?: CardCustomStyles
}>(({ theme, color, variant = 'filled', size, customStyles }) => {
  const depthColor = getDepthColor(customStyles, color, variant, theme)
  const isTablet = theme.device.isTablet
  const depthOffset = getDepthOffsets()
  const baseDepthStyle = {
    position: 'absolute' as const,
    backgroundColor: depthColor,
    borderRadius: scale(theme.borderRadius.lg),
    top: depthOffset.top,
    left: depthOffset.left
  }
  
  if (hasCustomDimensions(customStyles)) {
    return {
      ...baseDepthStyle,
      height: customStyles!.height as DimensionValue,
      width: customStyles!.width as DimensionValue
    }
  }
  
  if (size) {
    const squareSize = getSquareSize(size, isTablet)
    return {
      ...baseDepthStyle,
      height: squareSize,
      width: squareSize
    }
  }
  
  return baseDepthStyle
})

const getContentBackgroundColor = (
  customStyles: CardCustomStyles | undefined,
  color: CardColor | undefined,
  variant: CardVariant,
  theme: AppTheme
): string => {
  if (customStyles?.backgroundColor) return customStyles.backgroundColor
  if (variant === 'outlined') return 'transparent'
  return color ? theme.colors.choiceButton[color] : 'transparent'
}

const getContentBorderColor = (
  customStyles: CardCustomStyles | undefined,
  color: CardColor | undefined,
  variant: CardVariant,
  theme: AppTheme
): string => {
  if (customStyles?.borderColor) return customStyles.borderColor
  if (variant === 'outlined' && color) return theme.colors.choiceButton[color]
  return 'transparent'
}

const getContentBorderWidth = (
  customStyles: CardCustomStyles | undefined,
  variant: CardVariant
): number => {
  return customStyles?.borderWidth ?? (variant === 'outlined' ? scale(1) : 0)
}

export const CardContent = styled.View<{ 
  color?: CardColor
  variant?: CardVariant
  size?: number
  customStyles?: CardCustomStyles
}>(({ theme, color, variant = 'filled', size, customStyles }) => {
  const backgroundColor = getContentBackgroundColor(customStyles, color, variant, theme)
  const borderColor = getContentBorderColor(customStyles, color, variant, theme)
  const borderWidth = getContentBorderWidth(customStyles, variant)
  
  const baseContentStyle = {
    backgroundColor,
    borderRadius: scale(theme.borderRadius.lg),
    borderWidth,
    borderColor,
    position: 'relative' as const,
    zIndex: 1
  }
  
  if (hasCustomDimensions(customStyles)) {
    return {
      ...baseContentStyle,
      justifyContent: 'center',
      alignItems: 'center',
      gap: scale(theme.spacing.sm),
      padding: scale(theme.spacing.sm),
      height: customStyles!.height as DimensionValue,
      width: customStyles!.width as DimensionValue
    }
  }
  
  if (size) {
    const squareSize = getSquareSize(size, theme.device.isTablet)
    return {
      ...baseContentStyle,
      justifyContent: 'center',
      alignItems: 'center',
      gap: scale(theme.spacing.sm),
      padding: scale(theme.spacing.sm),
      height: squareSize,
      width: squareSize
    }
  }
  
  return baseContentStyle
})
