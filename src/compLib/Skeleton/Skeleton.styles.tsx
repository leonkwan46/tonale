import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

interface SkeletonDimensionsProps {
  width?: number | string
  height?: number | string
  borderRadius?: number
}

export const SkeletonContainer = styled(View)<SkeletonDimensionsProps>(({ width, height, borderRadius }) => {
  const style: Record<string, unknown> = {
    overflow: 'hidden',
    position: 'relative'
  }
  
  if (width !== undefined) {
    style.width = typeof width === 'number' ? scale(width) : width
  }
  if (height !== undefined) {
    style.height = typeof height === 'number' ? scale(height) : height
  }
  if (borderRadius !== undefined) {
    style.borderRadius = borderRadius
  }
  
  return style
})

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export const SkeletonGradient = styled(AnimatedLinearGradient)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  zIndex: 2
})

export const SkeletonBase = styled(View)<SkeletonDimensionsProps>(({ theme, width, height, borderRadius }) => {
  const style: Record<string, unknown> = {
    backgroundColor: theme.colors.border,
    opacity: 0.3
  }
  
  if (width !== undefined) {
    style.width = typeof width === 'number' ? scale(width) : width
  }
  if (height !== undefined) {
    style.height = typeof height === 'number' ? scale(height) : height
  }
  if (borderRadius !== undefined) {
    style.borderRadius = borderRadius
  }
  
  return style
})
