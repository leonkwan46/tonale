import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const HeaderContainer = styled(View)(() => ({
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
}))

export const Title = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(20) : scale(24),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold),
  textAlign: 'center'
}))

export const Subtitle = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(12) : scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.normal),
  textAlign: 'center',
  opacity: 0.7
}))

