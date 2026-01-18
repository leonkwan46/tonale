import styled from '@emotion/native'
import { Animated } from 'react-native'
import { scale } from 'react-native-size-matters'

export const StarContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}))

export const StarIcon = styled.Text<{ filled: boolean; isTablet: boolean }>(({ theme, filled, isTablet }) => ({
  fontSize: isTablet ? scale(24) : scale(32),
  color: filled ? theme.colors.gold : theme.colors.secondary
}))

export const AnimatedStarContainer = styled(Animated.View)(() => ({
  width: scale(50),
  height: scale(50),
  justifyContent: 'center',
  alignItems: 'center'
}))
