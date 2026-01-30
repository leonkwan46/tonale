import { getSourGummyFontFamily } from '@/utils/fontHelper'
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

export const ContinueButtonText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.base) : scale(theme.typography.lg),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('bold'),
  paddingVertical: scale(theme.spacing.sm),
  textAlign: 'center'
}))

export const NoLessonText = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.base),
  color: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400'),
  textAlign: 'center',
  paddingVertical: scale(theme.spacing.lg)
}))

export const StarContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.device.isTablet ? scale(theme.spacing.xs) : scale(2)
}))

