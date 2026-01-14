import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ModalContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  backgroundColor: '#ffffff',
  borderRadius: scale(20),
  padding: isTablet ? scale(12) : scale(20),
  width: '90%',
  alignItems: 'center',
  gap: isTablet ? scale(12) : scale(20)
}))

export const ExplanationText = styled.Text<{ isTablet: boolean }>(({ isTablet }) => ({
  fontSize: isTablet ? scale(14) : scale(16),
  color: '#000000',
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: isTablet ? scale(20) : scale(24)
}))

export const ContinueButtonText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(13) : scale(16),
  color: theme.colors.background,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily('600'),
  paddingVertical: isTablet ? scale(8) : scale(12),
  paddingHorizontal: isTablet ? scale(16) : scale(20)
}))

