import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { Colors } from '@/config/theme/Colors'

export const Bar = styled(Animated.View)<{ colorScheme: 'light' | 'dark' }>(({ colorScheme }) => ({
  width: scale(4),
  borderRadius: scale(2),
  backgroundColor: Colors[colorScheme].primary,
  shadowColor: Colors[colorScheme].primary,
  shadowOffset: { width: 0, height: scale(2) },
  shadowOpacity: 0.3,
  shadowRadius: scale(4),
  elevation: 3
}))

