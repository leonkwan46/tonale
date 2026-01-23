import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const ScrollContentContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  padding: theme.device.isTablet ? scale(8) : scale(10),
  gap: theme.device.isTablet ? scale(16) : scale(32)
}))
