import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

export const Container = styled.View(({ theme }) => ({
  alignItems: 'center',
  marginBottom: scale(theme.spacing.xl)
}))

export const LogoContainer = styled(Animated.View)(() => ({
  width: scale(120),
  height: scale(120),
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
}))

export const OuterCircle = styled.View(({ theme }) => ({
  position: 'absolute',
  width: scale(120),
  height: scale(120),
  borderRadius: scale(60),
  backgroundColor: theme.colors.primary,
  shadowColor: theme.colors.primary,
  shadowOffset: { width: 0, height: scale(theme.spacing.sm) },
  shadowOpacity: 0.3,
  shadowRadius: scale(theme.spacing.md),
  elevation: 12
}))

export const InnerCircle = styled.View(({ theme }) => ({
  position: 'absolute',
  width: scale(96),
  height: scale(96),
  borderRadius: scale(48),
  backgroundColor: theme.colors.surface,
  shadowOffset: { width: 0, height: scale(2) },
  shadowOpacity: 0.1,
  shadowRadius: scale(theme.spacing.xs),
  elevation: 2
}))

export const MusicIcon = styled(Ionicons)(({ theme }) => ({
  zIndex: 10,
  textShadowOffset: { width: 0, height: scale(1) },
  textShadowRadius: scale(2),
  textShadowColor: 'rgba(0, 0, 0, 0.2)'
}))

