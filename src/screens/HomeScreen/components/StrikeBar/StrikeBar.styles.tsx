import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

const GAP_SIZE = scale(8)

export const StrikeBarContainer = styled(View)({
  flexDirection: 'row',
  gap: GAP_SIZE,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  alignSelf: 'center'
})

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

