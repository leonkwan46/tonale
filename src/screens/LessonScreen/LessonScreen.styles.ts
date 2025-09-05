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
  fontSize: theme.typography.sm,
  fontWeight: theme.fontWeight.medium
}))