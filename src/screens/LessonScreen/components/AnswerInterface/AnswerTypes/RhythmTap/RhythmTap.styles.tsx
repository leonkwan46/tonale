import type { Depth3DColor } from '@/compLib/Depth3D/Depth3D.styles'
import { Typography } from '@/compLib/Typography'
import { createForwardProps } from '@/utils/styledProps'
import styled from '@emotion/native'

export const Container = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
})

export const TapButtonText = styled(Typography, {
  shouldForwardProp: createForwardProps(['isTablet', 'buttonColor'])
})<{ isTablet: boolean; buttonColor: Depth3DColor }>(({ theme, buttonColor }) => ({
  color: theme.components.button[buttonColor].text
}))
