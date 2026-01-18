import styled from '@emotion/native'

export const CrownContainer = styled.View<{ scaledSize: number }>(({ scaledSize }) => ({
  width: scaledSize,
  height: scaledSize,
  justifyContent: 'center',
  alignItems: 'center'
}))

export const CrownBase = styled.View<{ scaledSize: number }>(({ theme, scaledSize }) => ({
  width: scaledSize * 0.8,
  height: scaledSize * 0.3,
  backgroundColor: theme.colors.gold,
  borderTopLeftRadius: scaledSize * 0.1,
  borderTopRightRadius: scaledSize * 0.1,
  position: 'relative'
}))

export const CrownPoint = styled.View<{ 
  scaledSize: number
  top: number
  left?: number
  right?: number
  borderLeftWidth: number
  borderRightWidth: number
  borderBottomWidth: number
}>(({ theme, scaledSize, top, left, right, borderLeftWidth, borderRightWidth, borderBottomWidth }) => ({
  position: 'absolute',
  top: -top,
  ...(left !== undefined && { left: scaledSize * left }),
  ...(right !== undefined && { right: scaledSize * right }),
  width: 0,
  height: 0,
  borderLeftWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: theme.colors.gold
}))
