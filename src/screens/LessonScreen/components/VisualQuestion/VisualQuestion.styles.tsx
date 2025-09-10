import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const VisualQuestionContainer = styled.View<{ isTablet: boolean }>`
  align-items: center;
  transform: ${({ isTablet }) => isTablet ? 'scale(1.5)' : 'scale(0.85)'};
  ${({ isTablet }) => isTablet && `
    margin-vertical: ${scale(40)};
    padding-horizontal: ${scale(20)};
  `}
`
