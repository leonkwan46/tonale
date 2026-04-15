import styled from '@emotion/native'
import { useTheme } from '@emotion/react'

export const useStrokeColor = (color?: string) => {
  const { colors } = useTheme()
  return color || colors.text
}

export const IconContainer = styled.View<{ scaledSize: number }>(
  ({ scaledSize }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: scaledSize,
    height: scaledSize
  })
)
