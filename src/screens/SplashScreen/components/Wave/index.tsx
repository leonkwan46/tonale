import { ColorScheme } from '@/constants/Colors'
import { useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { Bar } from './Wave.styles'

interface WaveProps {
  delay: number
  colorScheme: ColorScheme
  isTransitioning: boolean
  isTablet: boolean
}

export function Wave({ delay, colorScheme, isTransitioning, isTablet }: WaveProps) {
  const height = useSharedValue(4)
  const opacity = useSharedValue(0)

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease)
      })
      
      animateHeight()
    }, delay * 1000)

    const animateHeight = () => {
      const heightRange = isTablet ? 40 : 24
      const minHeight = isTablet ? 12 : 8
      const newHeight = Math.random() * heightRange + minHeight
      height.value = withTiming(newHeight, {
        duration: 600,
        easing: Easing.inOut(Easing.ease)
      })
    }

    const interval = setInterval(() => {
      if (!isTransitioning) {
        animateHeight()
      }
    }, 800)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [delay, isTransitioning, height, opacity, isTablet])

  const barStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: isTransitioning ? withTiming(0, { duration: 500 }) : opacity.value
  }))

  return (
    <Bar
      colorScheme={colorScheme}
      isTablet={isTablet}
      style={barStyle}
    />
  )
}

