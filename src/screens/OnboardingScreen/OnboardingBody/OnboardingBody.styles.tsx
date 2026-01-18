import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const ScrollContentContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  alignItems: 'center',
  padding: isTablet ? scale(8) : scale(10),
  gap: isTablet ? scale(16) : scale(32)
}))
