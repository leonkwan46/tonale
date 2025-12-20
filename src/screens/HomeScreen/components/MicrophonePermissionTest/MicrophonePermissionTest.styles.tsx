import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { Pressable, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const PermissionCardContainer = styled(View)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.colors.surface,
  borderRadius: scale(25),
  paddingVertical: scale(16),
  paddingHorizontal: scale(16),
  gap: scale(12)
}))

export const PermissionCardContent = styled(View)({
  gap: scale(12)
})

export const StatusText = styled(Text)(({ theme }) => ({
  fontSize: scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('semibold'),
  lineHeight: scale(24),
  textAlign: 'center'
}))

export const ButtonContainer = styled(View)<{ isPressed: boolean }>(({ isPressed }) => ({
  position: 'relative',
  transform: [{ scale: isPressed ? 0.95 : 1 }]
}))

export const ButtonDepth = styled(View)({
  position: 'absolute',
  top: scale(3),
  left: scale(3),
  backgroundColor: '#DE6B54',
  borderRadius: scale(15),
  width: '100%',
  height: '100%'
})

export const TestButton = styled(Pressable)(({ theme, disabled }) => ({
  backgroundColor: disabled ? theme.colors.secondary : '#F58970',
  borderRadius: scale(15),
  paddingVertical: scale(12),
  paddingHorizontal: scale(20),
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  opacity: disabled ? 0.6 : 1
}))

export const TestButtonText = styled(Text)(({ theme }) => ({
  fontSize: scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('bold')
}))

