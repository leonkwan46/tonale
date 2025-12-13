import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const QuestionInterfaceContainer = styled.View<{ isTablet: boolean, isSMuFLSymbol: boolean, needsExtraSpacing: boolean }>`
  align-items: center;
  justify-content: flex-start;
  marginBottom: ${({ needsExtraSpacing, isTablet }) => needsExtraSpacing || isTablet ? '20px' : '10px'};

  ${({ isTablet, isSMuFLSymbol }) => isTablet && !isSMuFLSymbol && `
    transform: scale(0.9);
    marginTop: ${scale(20)}px;
    marginBottom: ${scale(20)}px;
  `}
`
