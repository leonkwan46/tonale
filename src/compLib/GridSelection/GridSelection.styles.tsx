import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const GAP_SIZE = scale(10)

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
  minHeight: scale(80),
  width: '100%',
  minWidth: 0
}))
