import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

export const LogoContainer = styled(Animated.View)(({ theme }) => ({
  shadowColor: theme.colors.primary,
  shadowOffset: { width: 0, height: scale(5) },
  shadowOpacity: 0.3,
  shadowRadius: scale(10),
  elevation: 10
}))

export const LogoOuter = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  width: isTablet ? scale(50) : scale(80),
  height: isTablet ? scale(50) : scale(80),
  borderRadius: isTablet ? scale(25) : scale(40),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.primary
}))

export const LogoInner = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  width: isTablet ? scale(42) : scale(68),
  height: isTablet ? scale(42) : scale(68),
  borderRadius: isTablet ? scale(21) : scale(34),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.surface
}))

