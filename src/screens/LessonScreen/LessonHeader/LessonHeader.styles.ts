import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'
import { createForwardProps } from '@/utils/styledProps'
import { PressableFeedback } from '@/utils/PressableFeedback'

export const Header = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: scale(theme.spacing.lg),
  paddingVertical: scale(theme.spacing.md),
  borderBottomWidth: scale(1),
  borderBottomColor: theme.colors.border,
  position: 'relative'
}))

export const BackButton = styled(PressableFeedback)(({ theme }) => ({
  position: 'absolute',
  left: scale(theme.spacing.lg),
  width: scale(theme.spacing.xl),
  height: scale(theme.spacing.xl),
  borderRadius: scale(theme.spacing.lg),
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

export const ProgressText = styled(Typography)(() => ({}))

export const SessionTitle = styled(Typography)(({ theme }) => ({
  color: theme.colors.icon
}))

export const XMarksContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: scale(theme.spacing.sm)
}))

export const XMark = styled(Typography, {
  shouldForwardProp: createForwardProps(['isActive'])
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.colors.error : theme.colors.text,
  opacity: isActive ? 1 : 0.3
}))
