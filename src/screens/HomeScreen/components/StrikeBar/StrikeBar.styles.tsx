import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'

export const StrikeBarContainer = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  gap: scale(theme.spacing.sm),
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  alignSelf: 'center'
}))

export const DayLabel = styled(Typography)(() => ({}))

export const FlameIconContainer = styled(View)({
  justifyContent: 'center',
  alignItems: 'center'
})

