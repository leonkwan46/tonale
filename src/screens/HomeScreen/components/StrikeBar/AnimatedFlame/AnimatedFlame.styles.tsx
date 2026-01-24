import styled from '@emotion/native'
import Animated from 'react-native-reanimated'

export const AnimatedFlameContainer = styled(Animated.View)<{ size: number }>(({ size }) => ({
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingBottom: size * 0.1
}))
