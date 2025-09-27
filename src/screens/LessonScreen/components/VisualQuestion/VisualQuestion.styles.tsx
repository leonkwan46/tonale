import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const VisualQuestionContainer = styled.View<{ isTablet: boolean, isSMuFLSymbol: boolean, needsExtraSpacing: boolean }>`
  align-items: center;
  justify-content: flex-start;
  marginBottom: ${({ needsExtraSpacing, isTablet }) => needsExtraSpacing || isTablet ? '20px' : '10px'};

  ${({ isTablet, isSMuFLSymbol }) => isTablet && !isSMuFLSymbol && `
    transform: scale(0.9);
    marginTop: ${scale(20)}px;
    marginBottom: ${scale(20)}px;
  `}
`

export const SMuFLCard = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  backgroundColor: theme.colors.background,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#000',
  width: '100%',
  maxWidth: isTablet ? 600 : 380
}))
