import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'

export const ScrollContainer = styled.ScrollView(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: theme.spacing.lg
}))

export const Title = styled.Text(({ theme }) => ({
  fontSize: theme.typography.xl,
  color: theme.colors.error,
  marginBottom: theme.spacing.md,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily('bold')
}))

export const Message = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  color: theme.colors.text,
  textAlign: 'center',
  marginBottom: theme.spacing.lg,
  opacity: 0.8,
  fontFamily: getSourGummyFontFamily('400')
}))

export const SectionTitle = styled.Text(({ theme }) => ({
  fontSize: theme.typography.lg,
  color: theme.colors.text,
  marginTop: theme.spacing.md,
  marginBottom: theme.spacing.sm,
  fontFamily: getSourGummyFontFamily('600')
}))

export const ErrorText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.sm,
  color: theme.colors.error,
  fontFamily: getSourGummyFontFamily('400'),
  backgroundColor: theme.colors.surface,
  padding: theme.spacing.sm,
  borderRadius: theme.borderRadius.sm,
  marginBottom: theme.spacing.md
}))

export const StackText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.sm,
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  backgroundColor: theme.colors.surface,
  padding: theme.spacing.sm,
  borderRadius: theme.borderRadius.sm,
  marginBottom: theme.spacing.md,
  opacity: 0.8
}))

export const ReloadButton = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.sm,
  marginTop: theme.spacing.lg,
  alignItems: 'center'
}))

export const ReloadText = styled.Text(({ theme }) => ({
  color: theme.colors.background,
  fontSize: theme.typography.base,
  fontFamily: getSourGummyFontFamily('600')
}))
