import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Container = styled.View<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  alignItems: 'center',
  paddingTop: isTablet ? scale(24) : scale(32),
  paddingBottom: isTablet ? scale(16) : scale(24),
  paddingHorizontal: scale(20),
  gap: isTablet ? scale(12) : scale(16)
}))

export const IconContainer = styled.View<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  marginBottom: isTablet ? scale(4) : scale(8)
}))

export const DescriptionText = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(14) : scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: isTablet ? scale(20) : scale(24),
  textAlign: 'center',
  paddingHorizontal: scale(8)
}))
