import styled from '@emotion/native'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing.lg
}))

export const Title = styled.Text(({ theme }) => ({
  fontSize: theme.typography['4xl'],
  color: theme.colors.text,
  marginBottom: theme.spacing.md,
  textAlign: 'center' as const,
  letterSpacing: -0.5,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold)
}))

export const Subtitle = styled.Text(({ theme }) => ({
  fontSize: theme.typography.xl,
  color: theme.colors.accent,
  marginBottom: theme.spacing.xl,
  textAlign: 'center' as const,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.medium)
}))

export const Description = styled.Text(({ theme }) => ({
  fontSize: theme.typography.lg,
  color: theme.colors.text,
  textAlign: 'center' as const,
  opacity: 0.7,
  lineHeight: theme.typography.lg * 1.5,
  maxWidth: 320,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.normal)
}))

