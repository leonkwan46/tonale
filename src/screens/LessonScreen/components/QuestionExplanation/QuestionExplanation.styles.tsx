import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ModalContainer = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  backgroundColor: theme.colors.background,
  borderRadius: scale(20),
  padding: isTablet ? scale(12) : scale(20),
  width: '90%',
  alignItems: 'center',
  gap: isTablet ? scale(12) : scale(20)
}))

export const ExplanationText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(14) : scale(16),
  color: theme.colors.text,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: isTablet ? scale(20) : scale(24)
}))

export const ButtonContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  width: '100%'
}))

export const ContinueButton = styled.TouchableOpacity<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  width: '100%',
  paddingVertical: isTablet ? scale(8) : scale(12),
  paddingHorizontal: isTablet ? scale(16) : scale(20),
  borderRadius: scale(8),
  backgroundColor: theme.colors.primary,
  alignItems: 'center'
}))

export const ContinueButtonText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(13) : scale(16),
  color: theme.colors.background,
  fontFamily: getSourGummyFontFamily('600')
}))

