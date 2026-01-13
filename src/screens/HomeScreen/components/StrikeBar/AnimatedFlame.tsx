import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

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
    
    // Horizontal movement: flame tip moves left/right (scaled for device size)
    const translateXMax = scale(0.9)  // Maximum rightward movement
    const translateXMin = scale(-0.7)  // Maximum leftward movement
    
    // Vertical movement: flame tip moves up/down (scaled for device size)
    const translateYMax = scale(-0.6) // Maximum upward movement (negative = up)
    const translateYMin = scale(0.3)  // Maximum downward movement
    
    // Rotation: flame tip tilts left/right (scaled for device size)
    const rotationMax = scale(3)      // Maximum clockwise rotation (degrees)
    const rotationMin = scale(-2.5)    // Maximum counter-clockwise rotation (degrees)

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
    <Animated.View 
      style={[
        animatedStyle,
        {
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: size * 0.1
        }
      ]}
    >
      <Ionicons
        name="flame"
        size={size}
        color={color}
      />
    </Animated.View>
  )
}

