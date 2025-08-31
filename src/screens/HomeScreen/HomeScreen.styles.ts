
import styled from '@emotion/native'

export const Content = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing.lg
}))

export const Title = styled.Text(({ theme }) => ({
  fontSize: theme.typography['4xl'],
  fontWeight: theme.fontWeight.bold as any,
  color: theme.colors.text,
  marginBottom: theme.spacing.md,
  textAlign: 'center' as const,
  letterSpacing: -0.5
}))

export const Subtitle = styled.Text(({ theme }) => ({
  fontSize: theme.typography.xl,
  fontWeight: theme.fontWeight.medium as any,
  color: theme.colors.primary,
  marginBottom: theme.spacing.xl,
  textAlign: 'center' as const
}))

export const Description = styled.Text(({ theme }) => ({
  fontSize: theme.typography.lg,
  fontWeight: theme.fontWeight.normal as any,
  color: theme.colors.text,
  textAlign: 'center' as const,
  opacity: 0.7,
  lineHeight: theme.typography.lg * 1.5,
  maxWidth: 320
}))