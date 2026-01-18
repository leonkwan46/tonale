import styled from '@emotion/native'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Container = styled(View)(() => ({
  flex: 1,
  padding: scale(20),
  alignItems: 'center'
}))

export const FeedbackContainer = styled(View)(() => ({
  marginTop: scale(20),
  alignItems: 'center'
}))

export const FeedbackText = styled(Text)<{ isCorrect: boolean }>(({ theme, isCorrect }) => ({
  fontSize: scale(16),
  fontWeight: 'bold',
  color: isCorrect ? theme.colors.success : theme.colors.error,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold)
}))
