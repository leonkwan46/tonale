import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { Colors } from '@/config/theme/Colors'

export const Container = styled(Animated.View)<{ colorScheme: 'light' | 'dark' }>(({ colorScheme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors[colorScheme].background
}))

export const MusicLogoContainer = styled.View(() => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: scale(20)
}))

export const WavesContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  position: 'absolute',
  bottom: isTablet ? '20%' : '30%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: scale(8)
}))

