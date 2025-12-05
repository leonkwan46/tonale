import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { Pressable } from 'react-native'
import { scale } from 'react-native-size-matters'

export const LessonCardContainer = styled.View(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.colors.surface,
  borderRadius: scale(25),
  paddingVertical: scale(10),
  paddingHorizontal: scale(10),
  gap: scale(10)
}))

export const CardContentContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: scale(30)
}))

export const ContinueButtonContainer = styled.View<{ isPressed: boolean }>(({ isPressed }) => ({
  position: 'relative',
  transform: [{ scale: isPressed ? 0.95 : 1 }]
}))

export const ContinueButtonDepth = styled.View(({ theme }) => ({
  position: 'absolute',
  top: scale(3),
  left: scale(3),
  backgroundColor: '#156382',
  borderRadius: scale(15),
  width: '100%',
  height: '100%'
}))

export const ContinueButton = styled(Pressable)(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  borderRadius: scale(15),
  paddingVertical: scale(16),
  paddingHorizontal: scale(24),
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1
}))

export const ContinueButtonText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.lg,
  color: theme.colors.background,
  fontFamily: getSourGummyFontFamily('bold')
}))

