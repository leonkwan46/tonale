import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const MessageText = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(12) : scale(14),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: isTablet ? scale(18) : scale(20),
  textAlign: 'center'
}))
