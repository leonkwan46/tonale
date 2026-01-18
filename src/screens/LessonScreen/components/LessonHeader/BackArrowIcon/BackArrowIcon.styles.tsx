import styled from '@emotion/native'

export const IconContainer = styled.View<{ scaledSize: number }>(({ scaledSize }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: scaledSize,
  height: scaledSize
}))
