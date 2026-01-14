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

export const TrueFalseButtonContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  height: isTablet ? scale(60) : scale(70),
  width: isTablet ? scale(140) : scale(120),
  justifyContent: 'center',
  alignItems: 'center'
}))

export const ChoiceText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => {
  return {
    fontSize: isTablet ? scale(16) : scale(20),
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: getSourGummyFontFamily('600')
  }
})
