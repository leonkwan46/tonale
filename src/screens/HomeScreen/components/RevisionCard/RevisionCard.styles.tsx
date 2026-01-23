import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const RevisionCardContainer = styled(View)<{ hasRevisionQuestions: boolean, isLoading?: boolean }>(({ theme, hasRevisionQuestions, isLoading }) => ({
  width: '100%',
  backgroundColor: 'transparent',
  borderRadius: scale(25),
  paddingVertical: scale(16),
  paddingHorizontal: scale(16),
  borderWidth: scale(2),
  borderColor: isLoading ? theme.colors.border : (hasRevisionQuestions ? theme.colors.revisionCard.border : theme.colors.success),
  gap: scale(12)
}))

export const RevisionCardContent = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(16)
})

export const IconText = styled(Text)(({ theme }) => ({
  fontSize: scale(32),
  color: theme.colors.revisionCard.iconText
}))

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

export const StartButtonText = styled(Text)(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(14) : scale(18),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('bold'),
  paddingVertical: theme.device.isTablet ? scale(8) : scale(10),
  paddingHorizontal: theme.device.isTablet ? scale(16) : scale(20),
  textAlign: 'center'
}))
