import styled from '@emotion/native'

export const Header = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: theme.spacing.lg,
  paddingVertical: theme.spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border
}))

export const BackButton = styled.TouchableOpacity(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: theme.colors.primary,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing.md
}))

export const BackButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.background,
  fontSize: theme.typography.lg,
  fontWeight: theme.fontWeight.bold
}))

export const ProgressTracker = styled.View(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center'
}))

export const HeaderSpacer = styled.View(({ theme }) => ({
  width: 80 // Same width as the back button to balance the layout
}))

export const ProgressText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.typography.xl,
  fontWeight: theme.fontWeight.semibold
}))

export const XMarksContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing.sm
}))

export const XMark = styled.Text<{ isActive: boolean }>(({ theme, isActive }) => ({
  fontSize: theme.typography.xl,
  fontWeight: theme.fontWeight.bold,
  color: isActive ? theme.colors.error : theme.colors.secondary,
  opacity: isActive ? 1 : 0.3
}))
