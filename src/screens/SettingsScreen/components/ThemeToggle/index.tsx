import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@emotion/react'
import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { scale } from 'react-native-size-matters'

import { Thumb, TOGGLE_CONSTANTS, Track } from './ThemeToggle.styles'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: (value: boolean) => void
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  const theme = useTheme()
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
          color={isDark ? theme.colors.primary : theme.colors.warning}
        />
      </Thumb>
    </Track>
  )
}
