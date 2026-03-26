import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ExplanationText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(14) : scale(16),
  color: theme.colors.cardText,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily(),
  lineHeight: theme.device.isTablet ? scale(20) : scale(24)
}))

export const ContinueButtonText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(13) : scale(16),
  color: theme.colors.primaryContrast,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold),
  paddingVertical: theme.device.isTablet ? scale(8) : scale(12),
  paddingHorizontal: theme.device.isTablet ? scale(16) : scale(20)
}))
