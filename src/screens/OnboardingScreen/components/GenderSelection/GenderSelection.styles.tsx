import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const SectionContainer = styled.View<{ isTablet?: boolean }>(({ isTablet }) => ({
  width: '100%',
  gap: isTablet ? scale(12) : scale(16)
}))

export const SectionTitle = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(14) : scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

