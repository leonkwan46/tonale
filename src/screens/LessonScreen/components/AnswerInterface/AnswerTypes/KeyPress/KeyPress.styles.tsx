import styled from '@emotion/native'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Container = styled(View)(({ theme }) => ({
    flex: 1,
    padding: scale(theme.spacing.lg),
    alignItems: 'center'
}))

export const FeedbackContainer = styled(View)(({ theme }) => ({
    marginTop: scale(theme.spacing.lg),
    alignItems: 'center'
}))

export const FeedbackText = styled(Text)<{ isCorrect: boolean }>(({ theme, isCorrect }) => ({
  fontSize: scale(theme.typography.base),
  color: isCorrect ? theme.colors.success : theme.colors.error,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold)
}))
