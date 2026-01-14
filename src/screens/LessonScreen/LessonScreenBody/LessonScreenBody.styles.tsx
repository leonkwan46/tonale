import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const BodyContainer = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  flex: 1,
  backgroundColor: theme.colors.surface,
  borderRadius: scale(theme.spacing.sm),
  maxWidth: isTablet ? scale(600) : scale(400),
  alignSelf: 'center',
  width: '100%'
}))

export const QuestionText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(theme.typography.base) : scale(theme.typography.lg),
  textAlign: 'center',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold),
  paddingVertical: scale(theme.spacing.sm),
  paddingHorizontal: scale(theme.spacing.md)
}))
