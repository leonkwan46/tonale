import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const useCardButtonSize = () => useTheme().dimensions.cardButtonSize

export const RevisionCardContainer = styled(View)<{ hasRevisionQuestions: boolean, isLoading?: boolean }>(({ theme, hasRevisionQuestions, isLoading }) => ({
  width: '100%',
  backgroundColor: 'transparent',
  borderRadius: scale(theme.borderRadius['2xl']),
  paddingVertical: scale(theme.spacing.md),
  paddingHorizontal: scale(theme.spacing.md),
  borderWidth: scale(2),
  borderColor: isLoading ? theme.colors.border : (hasRevisionQuestions ? theme.components.button.red.color : theme.colors.success),
  gap: scale(theme.spacing.sm)
}))

export const RevisionCardContent = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(theme.spacing.md)
}))

export const IconText = styled(Text)(({ theme }) => ({
  fontSize: scale(theme.typography['3xl']),
  color: theme.components.button.red.text
}))

export const ContentSection = styled(View)(({ theme }) => ({
  flex: 1,
  gap: scale(theme.spacing.sm)
}))

export const RevisionText = styled(Typography)(({ theme }) => ({
  lineHeight: scale(theme.typography.xl)
}))

