import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { AnimatedFlameContainer } from './AnimatedFlame.styles'

interface AnimatedFlameProps {
  color: string
  size: number
  isActive: boolean
}

export const AnimatedFlame = ({ color, size, isActive }: AnimatedFlameProps) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotation = useSharedValue(0)

  useEffect(() => {
    if (!isActive) {
      translateX.value = 0
      translateY.value = 0
      rotation.value = 0
      return
    }

    const duration = 800
    
    const translateXMax = scale(0.9)
    const translateXMin = scale(-0.7)
    
    const translateYMax = scale(-0.6)
    const translateYMin = scale(0.3)
    
    const rotationMax = scale(3)
    const rotationMin = scale(-2.5)

    translateX.value = withRepeat(
      withSequence(
        withTiming(translateXMax, {
          duration: duration * 0.4,
          easing: Easing.out(Easing.quad)
        }),
        withTiming(translateXMin, {
          duration: duration * 0.35,
          easing: Easing.inOut(Easing.quad)
        }),
        withTiming(0, {
          duration: duration * 0.25,
          easing: Easing.in(Easing.quad)
        })
      ),
      -1,
      false
    )

    translateY.value = withRepeat(
      withSequence(
        withTiming(translateYMax, {
          duration: duration * 0.4,
          easing: Easing.out(Easing.quad)
        }),
        withTiming(translateYMin, {
          duration: duration * 0.35,
          easing: Easing.inOut(Easing.quad)
        }),
        withTiming(0, {
          duration: duration * 0.25,
          easing: Easing.in(Easing.quad)
        })
      ),
      -1,
      false
    )

    rotation.value = withRepeat(
      withSequence(
        withTiming(rotationMax, {
          duration: duration * 0.4,
          easing: Easing.out(Easing.quad)
        }),
        withTiming(rotationMin, {
          duration: duration * 0.35,
          easing: Easing.inOut(Easing.quad)
        }),
        withTiming(0, {
          duration: duration * 0.25,
          easing: Easing.in(Easing.quad)
        })
      ),
      -1,
      false
    )
  }, [isActive, translateX, translateY, rotation])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` }
    ]
  }))

  return (
    <AnimatedFlameContainer size={size} style={animatedStyle}>
      <Ionicons
        name="flame"
        size={size}
        color={color}
      />
    </AnimatedFlameContainer>
  )
}
