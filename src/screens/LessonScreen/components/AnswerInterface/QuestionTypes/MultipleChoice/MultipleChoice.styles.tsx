import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const ChoicesContainer = styled.View`
  align-items: center;
  width: 100%;
`

export const ChoiceRow = styled.View<{ isLastRow: boolean }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ isLastRow }) => isLastRow ? 0 : scale(20)};
  width: 100%;
`
