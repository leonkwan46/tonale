import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const TypewriterText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(18) : scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(26) : scale(22)
}))
