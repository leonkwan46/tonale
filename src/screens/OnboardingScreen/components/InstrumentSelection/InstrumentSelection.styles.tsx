import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const SectionContainer = styled.View`
  width: 100%;
`

export const SectionTitle = styled.Text(({ theme }) => ({
  fontSize: scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

