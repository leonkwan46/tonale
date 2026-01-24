import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

const GAP_SIZE = scale(8)

export const GridSelectionContainer = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: GAP_SIZE,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  alignSelf: 'center'
})

export const GridSelectionContent = styled(View)({
  padding: scale(8),
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: scale(8),
  minHeight: scale(80)
})

export const GridSelectionText = styled.Text(({ theme }) => ({
  fontSize: scale(14),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold),
  textAlign: 'center'
}))

