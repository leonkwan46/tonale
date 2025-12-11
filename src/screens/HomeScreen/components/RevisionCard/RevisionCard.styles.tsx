import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { Pressable, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const RevisionCardContainer = styled(View)<{ hasRevisionQuestions: boolean }>(({ theme, hasRevisionQuestions }) => ({
  width: '100%',
  backgroundColor: 'transparent',
  borderRadius: scale(25),
  paddingVertical: scale(16),
  paddingHorizontal: scale(16),
  borderWidth: scale(2),
  borderColor: hasRevisionQuestions ? '#FF6E52' : theme.colors.success,
  gap: scale(12)
}))

export const RevisionCardContent = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(16)
})

export const IconContainer = styled(View)<{ hasRevisionQuestions: boolean }>(({ theme, hasRevisionQuestions }) => ({
  width: scale(100),
  height: scale(100),
  borderRadius: scale(12),
  backgroundColor: hasRevisionQuestions ? '#F58970' : theme.colors.success,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: hasRevisionQuestions ? '#DE6B54' : '#2a8a3a',
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 0.8,
  shadowRadius: 0,
  elevation: 4
}))

export const IconText = styled(Text)({
  fontSize: scale(32),
  color: '#000'
})

export const ContentSection = styled(View)({
  flex: 1,
  gap: scale(12)
})

export const RevisionText = styled(Text)(({ theme }) => ({
  fontSize: scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('semibold'),
  lineHeight: scale(24)
}))

export const StartButtonContainer = styled(View)<{ isPressed: boolean }>(({ isPressed }) => ({
  position: 'relative',
  transform: [{ scale: isPressed ? 0.95 : 1 }]
}))

export const StartButtonDepth = styled(View)({
  position: 'absolute',
  top: scale(3),
  left: scale(3),
  backgroundColor: '#DE6B54',
  borderRadius: scale(15),
  width: '100%',
  height: '100%'
})

export const StartButton = styled(Pressable)({
  backgroundColor: '#F58970',
  borderRadius: scale(15),
  paddingVertical: scale(10),
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
})

export const StartButtonText = styled(Text)(({ theme }) => ({
  fontSize: scale(18),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('bold')
}))

