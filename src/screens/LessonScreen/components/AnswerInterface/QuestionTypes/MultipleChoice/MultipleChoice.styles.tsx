import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const ChoicesContainer = styled.View`
  gap: ${scale(12)}px;
`

export const ChoiceButton = styled.TouchableOpacity<{
  backgroundColor: string
  borderColor: string
}>`
  padding: ${scale(16)}px;
  border-radius: ${scale(12)}px;
  border-width: 2px;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  border-color: ${props => props.borderColor};
`

export const ChoiceText = styled.Text<{
  color: string
}>`
  font-size: ${scale(16)}px;
  font-weight: 600;
  color: ${props => props.color};
`
