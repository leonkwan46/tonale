import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const MessageText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(18) : scale(20),
  textAlign: 'center'
}))
