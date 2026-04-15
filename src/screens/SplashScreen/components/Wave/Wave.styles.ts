import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

export const useIsTablet = () => useTheme().device.isTablet

export const Bar = styled(Animated.View)(({ theme }) => ({
  width: scale(4),
  borderRadius: scale(2),
  backgroundColor: theme.colors.primary,
  shadowColor: theme.colors.primary,
  shadowOffset: { width: 0, height: scale(2) },
  shadowOpacity: 0.3,
  shadowRadius: scale(4),
  elevation: 3
}))
