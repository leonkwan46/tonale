import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'

export const ScrollContainer = styled.ScrollView(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: 20
}))

export const Title = styled.Text(({ theme }) => ({
  fontSize: 24,
  color: theme.colors.error,
  marginBottom: 16,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily('bold')
}))

export const Message = styled.Text(({ theme }) => ({
  fontSize: 16,
  color: theme.colors.text,
  textAlign: 'center',
  marginBottom: 24,
  opacity: 0.8,
  fontFamily: getSourGummyFontFamily('400')
}))

export const SectionTitle = styled.Text(({ theme }) => ({
  fontSize: 18,
  color: theme.colors.text,
  marginTop: 16,
  marginBottom: 8,
  fontFamily: getSourGummyFontFamily('600')
}))

export const ErrorText = styled.Text(({ theme }) => ({
  fontSize: 14,
  color: theme.colors.error,
  fontFamily: getSourGummyFontFamily('400'),
  backgroundColor: theme.colors.surface,
  padding: 12,
  borderRadius: 8,
  marginBottom: 16
}))

export const StackText = styled.Text(({ theme }) => ({
  fontSize: 12,
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  backgroundColor: theme.colors.surface,
  padding: 12,
  borderRadius: 8,
  marginBottom: 16,
  opacity: 0.8
}))

export const ReloadButton = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  padding: 16,
  borderRadius: 8,
  marginTop: 24,
  alignItems: 'center'
}))

export const ReloadText = styled.Text(({ theme }) => ({
  color: theme.colors.background,
  fontSize: 16,
  fontFamily: getSourGummyFontFamily('600')
}))
