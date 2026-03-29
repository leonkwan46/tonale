import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'

export const ChoicesContainer = styled.View`
  align-items: center;
  width: 100%;
`

export const ChoiceRow = styled.View<{ isLastRow: boolean }>(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: scale(theme.spacing.xl)
}))

export const TrueFalseButtonContainer = styled.View(({ theme }) => ({
  height: theme.device.isTablet ? scale(60) : scale(70),
  width: theme.device.isTablet ? scale(140) : scale(120),
  justifyContent: 'center',
  alignItems: 'center'
}))

export const ChoiceText = styled(Typography)(() => ({}))
