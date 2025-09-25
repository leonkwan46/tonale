import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const SMuFLSymbolContainer = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  fontFamily: 'Bravura',
  fontSize: isTablet ? scale(24) : scale(40),
  color: theme.colors.text,
  textAlign: 'center',
  textAlignVertical: 'center',
  margin: isTablet ? -25 : -20
}))