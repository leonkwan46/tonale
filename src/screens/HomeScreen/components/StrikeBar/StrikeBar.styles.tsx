import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const StrikeBarContainer = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  gap: scale(theme.spacing.sm),
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  alignSelf: 'center'
}))

export const StrikeBarCardContainer = styled(View)({
  position: 'relative'
})

export const DayLabel = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.sm),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

export const FlameIconContainer = styled(View)({
  justifyContent: 'center',
  alignItems: 'center'
})

