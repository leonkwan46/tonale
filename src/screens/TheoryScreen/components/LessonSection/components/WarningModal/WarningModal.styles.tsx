import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const WarningIcon = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(24) : scale(48),
  textAlign: 'center'
}))
