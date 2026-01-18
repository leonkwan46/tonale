import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

export const LogoContainer = styled(Animated.View)<{ isTablet: boolean }>(({ isTablet }) => ({
  width: isTablet ? scale(100) : scale(90),
  height: isTablet ? scale(100) : scale(90),
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
}))

export const OuterCircle = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  position: 'absolute',
  width: isTablet ? scale(100) : scale(90),
  height: isTablet ? scale(100) : scale(90),
  borderRadius: isTablet ? scale(50) : scale(45),
  backgroundColor: theme.colors.primary,
  shadowColor: theme.colors.primary,
  shadowOffset: { width: 0, height: scale(8) },
  shadowOpacity: 0.3,
  shadowRadius: scale(16),
  elevation: 12
}))

export const InnerCircle = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  position: 'absolute',
  width: isTablet ? scale(80) : scale(72),
  height: isTablet ? scale(80) : scale(72),
  borderRadius: isTablet ? scale(40) : scale(36),
  backgroundColor: theme.colors.surface,
  shadowOffset: { width: 0, height: scale(2) },
  shadowOpacity: 0.1,
  shadowRadius: scale(4),
  elevation: 2
}))

export const MusicIcon = styled(Ionicons)<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  color: theme.colors.primary,
  zIndex: 10,
  textShadowOffset: { width: 0, height: scale(1) },
  textShadowRadius: scale(2),
  textShadowColor: 'rgba(0, 0, 0, 0.2)'
}))

