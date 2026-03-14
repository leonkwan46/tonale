import styled from '@emotion/native'
import Animated from 'react-native-reanimated'

export const WaterArea = styled(Animated.View)<{ isTablet: boolean }>(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.colors.playback.rippleWater,
  alignSelf: 'center',
  zIndex: 1
}))

export const RippleCircle = styled(Animated.View)<{ isTablet: boolean }>(({ theme }) => ({
  position: 'absolute',
  borderColor: theme.colors.playback.rippleCircleBorder,
  backgroundColor: 'transparent',
  alignSelf: 'center',
  zIndex: 2
}))
