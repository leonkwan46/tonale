import { useEffect } from 'react'
import type { ViewStyle } from 'react-native'
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated'

import type { AuthMode } from '../index'

export const useAuthScreenAnimations = (mode: AuthMode) => {
  const logoScale = useSharedValue(0.8)
  const modeTransition = useSharedValue(0)

  useEffect(() => {
    logoScale.value = withTiming(1.0, { duration: 1000, easing: Easing.out(Easing.ease) })
    modeTransition.value = mode === 'login' ? 0 : 1
  }, [mode, logoScale, modeTransition])

  useEffect(() => {
    modeTransition.value = withSpring(mode === 'login' ? 0 : 1, {
      damping: 20,
      stiffness: 100
    })
  }, [mode, modeTransition])

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }]
  }))

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1
  }))

  return {
    logoAnimatedStyle: logoAnimatedStyle as ViewStyle,
    formAnimatedStyle: formAnimatedStyle as ViewStyle
  }
}

