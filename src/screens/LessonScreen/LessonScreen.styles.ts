import styled from '@emotion/native'

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing.lg
}))

export const Header = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: theme.spacing.lg,
  paddingVertical: theme.spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border
}))

export const BackButton = styled.TouchableOpacity(({ theme }) => ({
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xs,
  borderRadius: theme.spacing.xs,
  backgroundColor: theme.colors.primary,
  marginRight: theme.spacing.md
}))

export const BackButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.background,
  fontSize: theme.typography.base,
  fontWeight: theme.fontWeight.semibold
}))

export const Title = styled.Text(({ theme }) => ({
  fontSize: theme.typography.xl,
  fontWeight: theme.fontWeight.bold,
  color: theme.colors.text,
  flex: 1
}))

export const Content = styled.ScrollView(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg
}))

export const DescriptionContainer = styled.View(({ theme }) => ({
  marginTop: theme.spacing.lg,
  marginBottom: theme.spacing.xl
}))

export const Description = styled.Text(({ theme }) => ({
  fontSize: theme.typography.lg,
  lineHeight: theme.typography.xl + 2,
  color: theme.colors.text,
  textAlign: 'center'
}))

export const TopicsContainer = styled.View(({ theme }) => ({
  marginBottom: theme.spacing.xl,
  backgroundColor: theme.colors.surface,
  padding: theme.spacing.lg,
  borderRadius: theme.spacing.sm
}))

export const TopicsTitle = styled.Text(({ theme }) => ({
  fontSize: theme.typography.lg,
  fontWeight: theme.fontWeight.semibold,
  color: theme.colors.text,
  marginBottom: theme.spacing.md
}))

export const TopicItem = styled.View(({ theme }) => ({
  marginBottom: theme.spacing.xs
}))

export const TopicText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  color: theme.colors.text,
  lineHeight: theme.typography.base + 6
}))

export const MetaContainer = styled.View(({ theme }) => ({
  marginBottom: theme.spacing.xl,
  backgroundColor: theme.colors.surface,
  padding: theme.spacing.lg,
  borderRadius: theme.spacing.sm
}))

export const MetaItem = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.spacing.xs,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border
}))

export const MetaLabel = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  color: theme.colors.secondary,
  fontWeight: theme.fontWeight.medium
}))

export const MetaValue = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  color: theme.colors.text,
  fontWeight: theme.fontWeight.semibold
}))

export const LessonContent = styled.View(({ theme }) => ({
  marginBottom: theme.spacing.xl + 8,
  backgroundColor: theme.colors.surface,
  padding: theme.spacing.lg,
  borderRadius: theme.spacing.sm
}))

export const ContentTitle = styled.Text(({ theme }) => ({
  fontSize: theme.typography.lg,
  fontWeight: theme.fontWeight.bold,
  color: theme.colors.text,
  marginBottom: theme.spacing.md
}))

export const ContentText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  lineHeight: theme.typography.base + 8,
  color: theme.colors.text
}))

export const ErrorText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  color: theme.colors.error,
  marginBottom: theme.spacing.md,
  textAlign: 'center' as const
}))
