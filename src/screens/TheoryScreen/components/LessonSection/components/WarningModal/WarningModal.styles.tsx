import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const WarningIcon = styled.Text<{ isTablet: boolean }>(({ isTablet }) => ({
  fontSize: isTablet ? scale(24) : scale(48),
  textAlign: 'center'
}))
