import { useEffect } from 'react'
import { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'
import { SkeletonBase, SkeletonContainer, SkeletonGradient } from './Skeleton.styles'

interface SkeletonProps {
  variant?: 'square' | 'rectangle'
  width?: number | string
  height?: number | string
}

export const Skeleton = ({ variant = 'rectangle', width, height }: SkeletonProps) => {
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
          width: width ?? scale(100),
          height: height ?? scale(100),
          borderRadius: scale(12)
        }
      case 'rectangle':
        return {
          width: width ?? '100%',
          height: height ?? scale(24),
          borderRadius: scale(4)
        }
      default:
        return {}
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
