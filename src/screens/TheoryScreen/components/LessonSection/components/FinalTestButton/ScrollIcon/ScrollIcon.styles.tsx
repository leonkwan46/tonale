import styled from '@emotion/native'
import { useTheme } from '@emotion/react'

export const useStrokeColor = () => useTheme().colors.warningContrast

export const ScrollIconContainer = styled.View<{ scaledSize: number }>(
  ({ scaledSize }) => ({
    width: scaledSize,
    height: scaledSize,
    justifyContent: 'center',
    alignItems: 'center'
  })
)
