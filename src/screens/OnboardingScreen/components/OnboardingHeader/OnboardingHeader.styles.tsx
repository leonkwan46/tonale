import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Title = styled.Text(({ theme }) => ({
  fontSize: scale(24),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold),
  textAlign: 'center'
}))

export const Subtitle = styled.Text(({ theme }) => ({
  fontSize: scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.normal),
  textAlign: 'center',
  opacity: 0.7,
  marginBottom: scale(32)
}))

