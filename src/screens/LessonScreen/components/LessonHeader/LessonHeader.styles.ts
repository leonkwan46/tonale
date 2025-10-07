import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const Header = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: theme.spacing.lg,
  paddingVertical: theme.spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border,
  position: 'relative'
}))

export const BackButton = styled.TouchableOpacity(({ theme }) => ({
  position: 'absolute',
  left: scale(theme.spacing.lg),
  width: scale(30),
  height: scale(30),
  borderRadius: scale(20),
  backgroundColor: theme.colors.primary,
  alignItems: 'center',
  justifyContent: 'center'
}))

export const ProgressTracker = styled.View(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: scale(theme.spacing.xs)
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
  gap: scale(theme.spacing.sm)
}))

export const XMark = styled.Text<{ isActive: boolean; isTablet: boolean }>(({ theme, isActive, isTablet }) => ({
  fontSize: isTablet ? scale(theme.typography.lg) : scale(theme.typography.xl),
  fontWeight: theme.fontWeight.bold,
  color: isActive ? theme.colors.error : theme.colors.secondary,
  opacity: isActive ? 1 : 0.3
}))
