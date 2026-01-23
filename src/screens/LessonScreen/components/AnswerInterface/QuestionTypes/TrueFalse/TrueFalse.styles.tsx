import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ChoicesContainer = styled.View`
  align-items: center;
  width: 100%;
`

export const ChoiceRow = styled.View<{ isLastRow: boolean }>(() => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: scale(24)
}))

export const TrueFalseButtonContainer = styled.View(({ theme }) => ({
  height: theme.device.isTablet ? scale(60) : scale(70),
  width: theme.device.isTablet ? scale(140) : scale(120),
  justifyContent: 'center',
  alignItems: 'center'
}))

export const ChoiceText = styled.Text(({ theme }) => {
  return {
    fontSize: theme.device.isTablet ? scale(16) : scale(20),
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: getSourGummyFontFamily('600')
  }
})
