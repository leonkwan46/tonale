import styled from '@emotion/native'
import { Animated } from 'react-native'
import { scale } from 'react-native-size-matters'

export const StarContainer = styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: scale(8)
}))

export const AnimatedStarContainer = styled(Animated.View)(() => ({
  width: scale(50),
  height: scale(50),
  justifyContent: 'center',
  alignItems: 'center'
}))
