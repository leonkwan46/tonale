import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const MessageText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(theme.typography.lg) : scale(theme.typography.lg),
  textAlign: 'center'
}))
