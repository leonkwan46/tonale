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
}

export function Wave({ delay, colorScheme, isTransitioning }: WaveProps) {
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
      const newHeight = Math.random() * 24 + 8
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
  }, [delay, isTransitioning, height, opacity])

  const barStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: isTransitioning ? withTiming(0, { duration: 500 }) : opacity.value
  }))

  return (
    <Bar
      colorScheme={colorScheme}
      style={barStyle}
    />
  )
}

