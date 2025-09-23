import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const VisualQuestionContainer = styled.View<{ isTablet: boolean, isNoteIdentification: boolean }>`
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ isNoteIdentification }) => isNoteIdentification ? '20px' : '10px'};

  ${({ isTablet }) => isTablet && `
    transform: scale(0.9);
    marginTop: ${scale(20)}px;
    marginBottom: ${scale(20)}px;
  `}
`
