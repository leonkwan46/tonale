import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

export const Container = styled(Animated.View)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.background,
  zIndex: 1000,
  elevation: 1000
}))

export const MusicLogoContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: scale(theme.spacing.lg)
}))

export const WavesContainer = styled.View(({ theme }) => ({
  position: 'absolute',
  bottom: theme.device.isTablet ? '20%' : '30%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: scale(theme.spacing.sm)
}))

