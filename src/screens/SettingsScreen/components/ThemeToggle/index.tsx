import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { scale } from 'react-native-size-matters'

import { Thumb, TOGGLE_CONSTANTS, Track, useToggleIconColor } from './ThemeToggle.styles'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: (value: boolean) => void
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  const iconColor = useToggleIconColor(isDark)
  const translateX = useRef(new Animated.Value(isDark ? TOGGLE_CONSTANTS.SLIDE_DISTANCE : 0)).current

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: isDark ? TOGGLE_CONSTANTS.SLIDE_DISTANCE : 0,
      useNativeDriver: true,
      bounciness: 6,
      speed: 16
    }).start()
  }, [isDark, translateX])

  return (
    <Track onPress={() => onToggle(!isDark)}>
      <Thumb style={{ transform: [{ translateX }] }}>
        <Ionicons
          name={isDark ? 'moon' : 'sunny'}
          size={scale(14)}
          color={iconColor}
        />
      </Thumb>
    </Track>
  )
}
