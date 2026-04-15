import { darkSemanticColors, lightSemanticColors } from '@/config/theme/semantic'
import { useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

const TRANSITION_DURATION = 300

interface ThemeTransitionOverlayProps {
  isDark: boolean
}

export const ThemeTransitionOverlay = ({ isDark }: ThemeTransitionOverlayProps) => {
  const isFirstRender = useRef(true)
  const prevIsDark = useRef(isDark)
  const overlayOpacity = useSharedValue(0)
  const overlayColorRef = useRef(
    isDark ? lightSemanticColors.background : darkSemanticColors.background
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    overlayColorRef.current = prevIsDark.current
      ? darkSemanticColors.background
      : lightSemanticColors.background
    prevIsDark.current = isDark

    overlayOpacity.value = 1
    overlayOpacity.value = withTiming(0, { duration: TRANSITION_DURATION })
  }, [isDark, overlayOpacity])

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: overlayColorRef.current },
        overlayStyle
      ]}
    />
  )
}
