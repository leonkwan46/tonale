import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

export const Container = styled(Animated.View)(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.background
}))

export const MusicLogoContainer = styled.View(() => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: scale(20)
}))

export const WavesContainer = styled.View(({ theme }) => ({
  position: 'absolute',
  bottom: theme.device.isTablet ? '20%' : '30%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: scale(8)
}))

