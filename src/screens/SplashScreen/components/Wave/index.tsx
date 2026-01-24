import { useTheme } from '@emotion/react'
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
  isTransitioning: boolean
}

export const Wave = ({ delay, isTransitioning }: WaveProps) => {
  const theme = useTheme()
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
      const heightRange = theme.device.isTablet ? 40 : 24
      const minHeight = theme.device.isTablet ? 12 : 8
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
  }, [delay, isTransitioning, height, opacity, theme.device.isTablet])

  const barStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: isTransitioning ? withTiming(0, { duration: 500 }) : opacity.value
  }))

  return (
    <Bar style={barStyle} />
  )
}

