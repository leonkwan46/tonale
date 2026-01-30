import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const GridSelectionContainer = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: scale(theme.spacing.sm),
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  alignSelf: 'center'
}))

export const GridSelectionContent = styled(View)(({ theme }) => ({
  padding: scale(theme.spacing.sm),
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: scale(theme.spacing.sm),
  minHeight: scale(80)
}))

export const GridSelectionText = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.sm),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold),
  textAlign: 'center'
}))

