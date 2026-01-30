import type { AppTheme } from '@/config/theme/theme'
import type { ButtonColor, LayoutType } from '@/sharedComponents/Button3D/Button3D.styles'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'
import type { Card3DCustomStyles, Card3DVariant } from './index'

// 3D depth effect constants (component-specific)
const DEPTH_OFFSET = scale(3)
const DEPTH_OFFSET_LEFT_FLEXIBLE = scale(2)
const DEPTH_OFFSET_RIGHT = scale(-5)
const DEPTH_OFFSET_BOTTOM = scale(-6)
const OUTLINED_BORDER_WIDTH = scale(2)

// FinalTest-specific 3D depth constants
const FINAL_TEST_DEPTH_OFFSET_TOP = scale(6)
const FINAL_TEST_DEPTH_OFFSET_LEFT = scale(6)
const FINAL_TEST_DEPTH_OFFSET_RIGHT = scale(-2)
const FINAL_TEST_DEPTH_OPACITY = 0.8

// Helper functions
const getDepthColor = (
  customStyles: Card3DCustomStyles | undefined,
  color: ButtonColor | undefined,
  variant: Card3DVariant,
  theme: AppTheme
): string => {
  if (customStyles?.depthColor) return customStyles.depthColor
  if (variant === 'outlined') return 'transparent'
  return color ? theme.colors.choiceButtonDepth[color] : 'transparent'
}

const getSquareSize = (size: number, isTablet: boolean): number => {
  return isTablet ? scale(size * 0.8) : scale(size)
}

const hasCustomDimensions = (customStyles: Card3DCustomStyles | undefined): boolean => {
  return !!(customStyles?.width && customStyles?.height)
}

const hasCustomHeightWithFullWidth = (
  customStyles: Card3DCustomStyles | undefined,
  fullWidth: boolean | undefined
): boolean => {
  return !!(customStyles?.height && !customStyles?.width && fullWidth)
}

export const Card3DViewContainer = styled.View({
  position: 'relative'
})

export const Card3DDepth = styled.View<{ 
  color?: ButtonColor
  variant?: Card3DVariant
  size?: number
  fullWidth?: boolean
  customStyles?: Card3DCustomStyles
}>(({ theme, color, variant = 'filled', size, fullWidth, customStyles }) => {
  const depthColor = getDepthColor(customStyles, color, variant, theme)
  const baseDepthStyle = {
    position: 'absolute' as const,
    backgroundColor: depthColor,
    borderRadius: scale(theme.borderRadius.lg)
  }
  
  // Custom dimensions (for StrikeCard)
  if (hasCustomDimensions(customStyles)) {
    return {
      ...baseDepthStyle,
      top: DEPTH_OFFSET,
      left: DEPTH_OFFSET,
      height: customStyles!.height,
      width: customStyles!.width
    }
  }
  
  // Custom height with full width (for FinalTest)
  if (hasCustomHeightWithFullWidth(customStyles, fullWidth)) {
    return {
      ...baseDepthStyle,
      top: FINAL_TEST_DEPTH_OFFSET_TOP,
      left: FINAL_TEST_DEPTH_OFFSET_LEFT,
      right: FINAL_TEST_DEPTH_OFFSET_RIGHT,
      height: customStyles!.height,
      borderRadius: scale(theme.borderRadius['2xl']),
      opacity: FINAL_TEST_DEPTH_OPACITY
    }
  }
  
  // Fixed square size (for lesson cards, revision cards, etc.)
  if (size) {
    const squareSize = getSquareSize(size, theme.device.isTablet)
    return {
      ...baseDepthStyle,
      top: DEPTH_OFFSET,
      left: DEPTH_OFFSET,
      height: squareSize,
      width: squareSize
    }
  }
  
  // Flexible width (for Button3D)
  return {
    ...baseDepthStyle,
    top: DEPTH_OFFSET,
    left: DEPTH_OFFSET_LEFT_FLEXIBLE,
    right: DEPTH_OFFSET_RIGHT,
    bottom: DEPTH_OFFSET_BOTTOM
  }
})

// Helper functions for content styling
const getContentBackgroundColor = (
  customStyles: Card3DCustomStyles | undefined,
  color: ButtonColor | undefined,
  variant: Card3DVariant,
  theme: AppTheme
): string => {
  if (customStyles?.backgroundColor) return customStyles.backgroundColor
  if (variant === 'outlined') return 'transparent'
  return color ? theme.colors.choiceButton[color] : 'transparent'
}

const getContentBorderColor = (
  customStyles: Card3DCustomStyles | undefined,
  color: ButtonColor | undefined,
  variant: Card3DVariant,
  theme: AppTheme
): string => {
  if (customStyles?.borderColor) return customStyles.borderColor
  if (variant === 'outlined' && color) return theme.colors.choiceButton[color]
  return 'transparent'
}

const getContentBorderWidth = (
  customStyles: Card3DCustomStyles | undefined,
  variant: Card3DVariant
): number => {
  return customStyles?.borderWidth ?? (variant === 'outlined' ? OUTLINED_BORDER_WIDTH : 0)
}

const getContentWidth = (
  layoutType: LayoutType | undefined,
  fullWidth: boolean | undefined
): '100%' | undefined => {
  return (layoutType === 'row' || layoutType === 'grid' || fullWidth) ? '100%' : undefined
}

export const Card3DContent = styled.View<{ 
  color?: ButtonColor
  variant?: Card3DVariant
  size?: number
  layoutType?: LayoutType
  fullWidth?: boolean
  customStyles?: Card3DCustomStyles
}>(({ theme, color, variant = 'filled', size, layoutType, fullWidth, customStyles }) => {
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
  
  // Custom dimensions (for StrikeCard)
  if (hasCustomDimensions(customStyles)) {
    return {
      ...baseContentStyle,
      justifyContent: 'center',
      alignItems: 'center',
      gap: scale(theme.spacing.sm),
      padding: scale(theme.spacing.sm),
      height: customStyles!.height,
      width: customStyles!.width
    }
  }
  
  // Custom height with full width (for FinalTest)
  if (hasCustomHeightWithFullWidth(customStyles, fullWidth)) {
    return {
      ...baseContentStyle,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scale(theme.spacing.xl),
      height: customStyles!.height,
      width: '100%',
      borderRadius: scale(theme.borderRadius['2xl']),
      overflow: 'hidden'
    }
  }
  
  // Fixed square size (for lesson cards, revision cards, etc.)
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
  
  // Flexible width (for Button3D)
  return {
    ...baseContentStyle,
    width: getContentWidth(layoutType, fullWidth)
  }
})
