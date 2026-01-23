import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const LessonCardContainer = styled.View<{ isLoading?: boolean }>(({ theme, isLoading }) => ({
  width: '100%',
  backgroundColor: theme.colors.surface,
  borderRadius: scale(25),
  paddingVertical: scale(16),
  paddingHorizontal: scale(14),
  gap: scale(10),
  borderWidth: isLoading ? scale(1) : 0,
  borderColor: isLoading ? theme.colors.border : 'transparent'
}))

export const CardContentContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: scale(15)
})

export const SkeletonContentSection = styled.View({
  flex: 1,
  gap: scale(12)
})

export const ContinueButtonText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(14) : scale(18),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('bold'),
  paddingVertical: scale(12),
  textAlign: 'center'
}))

export const NoLessonText = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.base),
  color: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400'),
  textAlign: 'center',
  paddingVertical: scale(20)
}))

export const StarContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.device.isTablet ? scale(4) : scale(2)
}))

