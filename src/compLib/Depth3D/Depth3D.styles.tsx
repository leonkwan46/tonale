import type { AppTheme } from '@/config/theme/theme'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'
import type { DimensionValue } from 'react-native'

import { PressableFeedback } from '@/utils/PressableFeedback'

const getFlexibleDepthOffsets = (isTablet: boolean) => ({
  top: scale(2),
  left: isTablet ? scale(2) : scale(1),
  right: isTablet ? scale(-2) : scale(-3),
  bottom: isTablet ? scale(-3) : scale(-4)
})

export type Depth3DColor = 'blue' | 'red' | 'green' | 'yellow' | 'grey' | 'finalTest'
export type LayoutType = 'grid' | 'row'
export type Depth3DSizeVariant = 'auto' | 'tile' | 'pad' | 'bar'

export interface Depth3DCustomStyles {
  backgroundColor?: string
  depthColor?: string
}

const getDepthColor = (
  customStyles: Depth3DCustomStyles | undefined,
  color: Depth3DColor | undefined,
  theme: AppTheme
): string => {
  if (customStyles?.depthColor) return customStyles.depthColor
  return color ? theme.components.button[color].depth : 'transparent'
}

const getBackgroundColor = (
  customStyles: Depth3DCustomStyles | undefined,
  color: Depth3DColor | undefined,
  theme: AppTheme
): string => {
  if (customStyles?.backgroundColor) return customStyles.backgroundColor
  return color ? theme.components.button[color].color : 'transparent'
}

const getContentWidth = (
  layoutType: LayoutType | undefined
): '100%' | undefined => {
  return layoutType === 'row' || layoutType === 'grid' ? '100%' : undefined
}

const getSizeDimensions = (
  isTablet: boolean,
  sizeVariant: Depth3DSizeVariant | undefined
): { width?: DimensionValue; height?: number } => {
  if (!sizeVariant || sizeVariant === 'auto') return {}
  if (sizeVariant === 'bar') {
    return { width: '100%', height: isTablet ? scale(60) : scale(70) }
  }
  if (sizeVariant === 'tile') {
    return { height: isTablet ? scale(80) : scale(90) }
  }
  // pad
  return {
    width: isTablet ? scale(240) : scale(280),
    height: isTablet ? scale(120) : scale(160)
  }
}

export const Depth3DContainer = styled(PressableFeedback)<{
  isPressed: boolean
  layoutType?: LayoutType
  sizeVariant?: Depth3DSizeVariant
  gridColumns?: number
  fullWidth?: boolean
  width?: DimensionValue
  height?: number
}>(({ theme, isPressed, layoutType, sizeVariant, gridColumns, fullWidth, width, height }) => {
  const isTablet = theme.device.isTablet
  const dims = getSizeDimensions(isTablet, sizeVariant)
  const gridWidth =
    layoutType === 'grid' && typeof gridColumns === 'number' && gridColumns > 0
      ? (gridColumns === 1
          ? ('100%' as const)
          : (`${Math.max(0, 100 / gridColumns - 2)}%` as const))
      : undefined

  const getWidth = (): DimensionValue | undefined => {
    if (fullWidth) return '100%'
    if (width !== undefined) return width
    if (dims.width !== undefined) return dims.width
    if (gridWidth) return gridWidth
    if (layoutType === 'row') return '100%'
    if (layoutType === 'grid') return '50%'
    return undefined
  }

  return {
    position: 'relative',
    alignSelf: layoutType === 'row' ? 'stretch' : 'center',
    width: getWidth(),
    height: height ?? dims.height,
    transform: [{ scale: isPressed ? 0.95 : 1 }]
  }
})

export const Depth3DDepth = styled.View<{
  color?: Depth3DColor
  customStyles?: Depth3DCustomStyles
}>(({ theme, color, customStyles }) => {
  const depthColor = getDepthColor(customStyles, color, theme)
  const isTablet = theme.device.isTablet
  const offsets = getFlexibleDepthOffsets(isTablet)
  const borderRadius =
    color === 'finalTest' ? scale(theme.borderRadius['2xl']) : scale(theme.borderRadius.lg)

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

export const Depth3DContent = styled.View<{
  color?: Depth3DColor
  layoutType?: LayoutType
  sizeVariant?: Depth3DSizeVariant
  customStyles?: Depth3DCustomStyles
  isPressed?: boolean
  gridColumns?: number
  fullWidth?: boolean
  height?: number
}>(({ theme, color, layoutType, sizeVariant, customStyles, isPressed, fullWidth, height }) => {
  const backgroundColor = getBackgroundColor(customStyles, color, theme)
  const isTablet = theme.device.isTablet
  const dims = getSizeDimensions(isTablet, sizeVariant)
  const borderRadius =
    color === 'finalTest' ? scale(theme.borderRadius['2xl']) : scale(theme.borderRadius.lg)
  const opacity = color === 'finalTest' && isPressed ? 0.8 : 1

  return {
    backgroundColor,
    borderRadius,
    opacity,
    position: 'relative' as const,
    zIndex: 1,
    width: fullWidth ? '100%' : getContentWidth(layoutType),
    height: height ?? dims.height,
    ...((height ?? dims.height) && {
      justifyContent: 'center',
      alignItems: 'center'
    })
  }
})
