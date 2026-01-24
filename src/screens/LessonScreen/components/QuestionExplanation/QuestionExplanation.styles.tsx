import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ModalContainer = styled.View(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: scale(20),
  padding: theme.device.isTablet ? scale(12) : scale(20),
  width: '90%',
  alignItems: 'center',
  gap: theme.device.isTablet ? scale(12) : scale(20)
}))

export const ExplanationText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(14) : scale(16),
  color: '#000000',
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(20) : scale(24)
}))

export const ContinueButtonText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(13) : scale(16),
  color: theme.colors.background,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily('600'),
  paddingVertical: theme.device.isTablet ? scale(8) : scale(12),
  paddingHorizontal: theme.device.isTablet ? scale(16) : scale(20)
}))

