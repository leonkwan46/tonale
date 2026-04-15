import styled from '@emotion/native'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const LoadingContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.background,
  padding: theme.spacing.lg
}))

export const LoadingText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.typography.lg,
  textAlign: 'center',
  marginBottom: theme.spacing.sm,
  fontFamily: getSourGummyFontFamily()
}))
