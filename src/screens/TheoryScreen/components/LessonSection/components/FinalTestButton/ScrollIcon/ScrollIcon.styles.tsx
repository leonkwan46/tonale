import styled from '@emotion/native'

export const ScrollIconContainer = styled.View<{ scaledSize: number }>(({ scaledSize }) => ({
  width: scaledSize,
  height: scaledSize,
  justifyContent: 'center',
  alignItems: 'center'
}))
