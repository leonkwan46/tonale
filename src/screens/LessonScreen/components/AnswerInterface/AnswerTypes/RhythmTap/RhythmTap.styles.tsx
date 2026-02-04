import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const Container = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
})

export const TapButtonText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  color: '#ffffff',
  fontSize: isTablet ? scale(theme.typography.lg) : scale(theme.typography.xl),
  fontFamily: getSourGummyFontFamily('700')
}))
