import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const BodyContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.surface,
  borderRadius: theme.spacing.sm
}))

export const QuestionContainer = styled.View`
`

export const QuestionText = styled.Text`
  font-size: ${scale(18)};
  font-weight: 600;
  text-align: center;
  color: #000000;
`

export const ExplanationContainer = styled.View`
`

export const ExplanationText = styled.Text<{
  isCorrect: boolean
}>`
  font-size: ${scale(14)};
  color: ${props => props.isCorrect ? '#34C759' : '#FF3B30'};
  text-align: center;
  font-style: italic;
`
