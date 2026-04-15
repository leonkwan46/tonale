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
  shadowOpacity: 0.8,
  shadowRadius: scale(theme.spacing.lg)
}))

export const InnerCircle = styled.View(({ theme }) => ({
  position: 'absolute',
  width: scale(100),
  height: scale(100),
  borderRadius: scale(50),
  backgroundColor: theme.colors.background
}))

export const MusicIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.primary,
  zIndex: 10
}))
