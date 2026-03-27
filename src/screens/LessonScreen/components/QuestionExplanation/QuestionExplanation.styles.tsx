import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ExplanationText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(14) : scale(16),
  color: theme.components.notation.text,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily(),
  lineHeight: theme.device.isTablet ? scale(20) : scale(24)
}))

