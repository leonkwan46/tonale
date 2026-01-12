import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { Colors } from '@/config/theme/Colors'

export const Container = styled.View(() => ({
  alignItems: 'center',
  marginBottom: scale(32)
}))

export const LogoContainer = styled(Animated.View)(() => ({
  width: scale(120),
  height: scale(120),
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
}))

export const OuterCircle = styled.View<{ colorScheme: 'light' | 'dark' }>(({ colorScheme }) => ({
  position: 'absolute',
  width: scale(120),
  height: scale(120),
  borderRadius: scale(60),
  backgroundColor: Colors[colorScheme].primary,
  shadowColor: Colors[colorScheme].primary,
  shadowOffset: { width: 0, height: scale(8) },
  shadowOpacity: 0.3,
  shadowRadius: scale(16),
  elevation: 12
}))

export const InnerCircle = styled.View<{ colorScheme: 'light' | 'dark' }>(({ colorScheme }) => ({
  position: 'absolute',
  width: scale(96),
  height: scale(96),
  borderRadius: scale(48),
  backgroundColor: Colors[colorScheme].surface,
  shadowOffset: { width: 0, height: scale(2) },
  shadowOpacity: 0.1,
  shadowRadius: scale(4),
  elevation: 2
}))

export const MusicIcon = styled(Ionicons)(() => ({
  zIndex: 10,
  textShadowOffset: { width: 0, height: scale(1) },
  textShadowRadius: scale(2),
  textShadowColor: 'rgba(0, 0, 0, 0.2)'
}))

