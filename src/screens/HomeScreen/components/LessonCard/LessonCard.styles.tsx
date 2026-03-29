import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const LessonCardContainer = styled.View<{ isLoading?: boolean }>(({ theme, isLoading }) => ({
  width: '100%',
  backgroundColor: theme.colors.surface,
  borderRadius: scale(theme.borderRadius['2xl']),
  paddingVertical: scale(theme.spacing.md),
  paddingHorizontal: scale(theme.spacing.md),
  gap: scale(theme.spacing.sm),
  borderWidth: isLoading ? scale(1) : 0,
  borderColor: isLoading ? theme.colors.border : 'transparent'
}))

export const CardContentContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: scale(theme.spacing.md)
}))

export const SkeletonContentSection = styled.View(({ theme }) => ({
  flex: 1,
  gap: scale(theme.spacing.sm)
}))

export const NoLessonText = styled(Typography)(({ theme }) => ({
  paddingVertical: scale(theme.spacing.lg)
}))

export const StarContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.device.isTablet ? scale(theme.spacing.xs) : scale(2)
}))

