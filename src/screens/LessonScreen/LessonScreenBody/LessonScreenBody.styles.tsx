import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const BodyContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.surface,
  borderRadius: theme.spacing.sm
}))

export const QuestionText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  fontWeight: theme.fontWeight.semibold,
  textAlign: 'center',
  color: theme.colors.text
}))
