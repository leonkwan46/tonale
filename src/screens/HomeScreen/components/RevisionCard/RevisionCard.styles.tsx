import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const RevisionCardContainer = styled(View)<{ hasRevisionQuestions: boolean, isLoading?: boolean }>(({ theme, hasRevisionQuestions, isLoading }) => ({
  width: '100%',
  backgroundColor: 'transparent',
  borderRadius: scale(theme.borderRadius['2xl']),
  paddingVertical: scale(theme.spacing.md),
  paddingHorizontal: scale(theme.spacing.md),
  borderWidth: scale(2),
  borderColor: isLoading ? theme.colors.border : (hasRevisionQuestions ? theme.colors.revisionCard.border : theme.colors.success),
  gap: scale(theme.spacing.sm)
}))

export const RevisionCardContent = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(theme.spacing.md)
}))

export const IconText = styled(Text)(({ theme }) => ({
  fontSize: scale(theme.typography['3xl']),
  color: theme.colors.revisionCard.iconText
}))

export const ContentSection = styled(View)(({ theme }) => ({
  flex: 1,
  gap: scale(theme.spacing.sm)
}))

export const RevisionText = styled(Text)(({ theme }) => ({
  fontSize: scale(theme.typography.base),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('semibold'),
  lineHeight: scale(theme.typography.xl)
}))

export const StartButtonText = styled(Text)(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.base) : scale(theme.typography.lg),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('bold'),
  paddingVertical: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.sm),
  paddingHorizontal: theme.device.isTablet ? scale(theme.spacing.md) : scale(theme.spacing.lg),
  textAlign: 'center'
}))
