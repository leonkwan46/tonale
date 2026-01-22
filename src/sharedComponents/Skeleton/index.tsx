import { useEffect } from 'react'
import { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'
import { SkeletonBase, SkeletonContainer, SkeletonGradient } from './Skeleton.styles'
import { useTheme } from '@emotion/react'

interface SkeletonProps {
  variant: 'square' | 'rectangle'
  width?: number
  height?: number
}

export const Skeleton = ({ variant, width, height }: SkeletonProps) => {
  const theme = useTheme()
  const translateX = useSharedValue(-400)

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(400, {
        duration: 1500,
        easing: Easing.linear
      }),
      -1,
      false
    )
  }, [translateX])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))

  const getVariantStyles = () => {
    switch (variant) {
      case 'square':
        return {
          width: scale(width ?? width !== undefined ? width : theme.device.isTablet ? 35 : 100),
          height: scale(height ?? height !== undefined ? height : theme.device.isTablet ? 35 : 100),
          borderRadius: scale(15)
        }
      case 'rectangle':
        return {
          width: width !== undefined ? scale(width) : '100%',
          height: height !== undefined ? scale(height) : theme.device.isTablet ? scale(10) : scale(40),
          borderRadius: scale(15)
        }
      default:
        throw new Error(`Invalid variant: ${variant}`)
    }
  }

  const variantStyles = getVariantStyles()

  return (
    <SkeletonContainer
      width={variantStyles.width}
      height={variantStyles.height}
      borderRadius={variantStyles.borderRadius}
    >
      <SkeletonBase
        width={variantStyles.width}
        height={variantStyles.height}
        borderRadius={variantStyles.borderRadius}
      />
      <SkeletonGradient
        colors={['transparent', 'rgba(255, 255, 255, 0.3)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        pointerEvents="none"
        style={animatedStyle}
      />
    </SkeletonContainer>
  )
}
