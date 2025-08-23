import { Colors, ColorScheme } from '@/constants/Colors'
import styled from '@emotion/native'
import React, { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

interface MusicBarProps {
  delay: number
  colorScheme: ColorScheme
  isTransitioning: boolean
}

export function MusicBar({ delay, colorScheme, isTransitioning }: MusicBarProps) {
  
  // Animation values
  const height = useSharedValue(4)
  const opacity = useSharedValue(0)

  useEffect(() => {
    // Initial fade in with delay
    const initialTimeout = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease)
      })
      
      // Start height animation
      animateHeight()
    }, delay * 1000)

    // Function to animate height changes
    const animateHeight = () => {
      const newHeight = Math.random() * 24 + 8 // Random height between 8-32
      height.value = withTiming(newHeight, {
        duration: 600,
        easing: Easing.inOut(Easing.ease)
      })
    }

    // Continue animating height every 800ms
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

// Styled Components
const Bar = styled(Animated.View)<{ colorScheme: ColorScheme }>`
  width: 4px;
  border-radius: 2px;
  background-color: ${props => Colors[props.colorScheme].primary};
  shadow-color: ${props => Colors[props.colorScheme].primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 3;
`
