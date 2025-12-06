import styled from '@emotion/native'
import { Animated } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ModalOverlay = styled.View(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: `${theme.colors.background}80`,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
}))

export const ModalContainer = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  backgroundColor: theme.colors.background,
  borderRadius: scale(20),
  padding: isTablet ? scale(12) : scale(24),
  margin: isTablet ? scale(60) : scale(20),
  minWidth: isTablet ? scale(200) : scale(300),
  maxWidth: isTablet ? scale(300) : scale(400),
  alignItems: 'center',
  shadowColor: theme.colors.text,
  shadowOffset: { width: 0, height: scale(4) },
  shadowOpacity: 0.25,
  shadowRadius: scale(8),
  elevation: 8
}))

export const StarContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: isTablet ? scale(10) : scale(16)
}))

export const StarIcon = styled.Text<{ filled: boolean; isTablet: boolean }>(({ theme, filled, isTablet }) => ({
  fontSize: isTablet ? scale(24) : scale(32),
  color: filled ? '#FFD700' : theme.colors.secondary
}))

export const TitleText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(20) : scale(24),
  color: theme.colors.text,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily('bold')
}))

export const DescriptionText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(14) : scale(16),
  color: theme.colors.text,
  textAlign: 'center',
  marginBottom: isTablet ? scale(16) : scale(24),
  opacity: 0.8,
  fontFamily: getSourGummyFontFamily('400')
}))

export const ButtonContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  gap: isTablet ? scale(8) : scale(12)
}))

export const ModalButton = styled.TouchableOpacity<{ variant: 'filled' | 'outlined'; isTablet: boolean }>(({ theme, variant, isTablet }) => ({
  flex: 1,
  paddingVertical: isTablet ? scale(8) : scale(12),
  paddingHorizontal: isTablet ? scale(16) : scale(20),
  borderRadius: scale(8),
  backgroundColor: variant === 'filled' ? theme.colors.primary : 'transparent',
  borderWidth: variant === 'outlined' ? 1 : 0,
  borderColor: theme.colors.primary,
  alignItems: 'center'
}))

export const ModalButtonText = styled.Text<{ variant: 'filled' | 'outlined'; isTablet: boolean }>(({ theme, variant, isTablet }) => ({
  fontSize: isTablet ? scale(13) : scale(16),
  color: variant === 'filled' ? theme.colors.background : theme.colors.primary,
  fontFamily: getSourGummyFontFamily('600')
}))

export const AnimatedStarContainer = styled(Animated.View)(() => ({
  width: scale(50),
  height: scale(50),
  justifyContent: 'center',
  alignItems: 'center'
}))
