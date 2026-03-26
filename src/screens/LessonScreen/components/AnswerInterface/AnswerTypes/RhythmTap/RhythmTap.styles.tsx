import type { ButtonColor } from '@/sharedComponents/Button3D/Button3D.styles'
import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const Container = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
})

export const TapButtonText = styled.Text<{ isTablet: boolean; buttonColor: ButtonColor }>(
  ({ theme, isTablet, buttonColor }) => ({
    color: theme.components.button[buttonColor].text,
    fontSize: isTablet ? scale(theme.typography.lg) : scale(theme.typography.xl),
    fontFamily: getSourGummyFontFamily(theme.fontWeight.bold)
  })
)
