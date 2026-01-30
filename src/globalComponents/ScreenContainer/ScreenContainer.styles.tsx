import styled from '@emotion/native'
import { View } from 'react-native'

export const StyledContainer = styled(View)<{ paddingTop: number; paddingBottom: number }>(({ theme, paddingTop, paddingBottom }) => ({
  flex: 1,
  backgroundColor: theme?.colors?.background || 'transparent',
  paddingTop: paddingTop,
  paddingBottom: paddingBottom
}))
