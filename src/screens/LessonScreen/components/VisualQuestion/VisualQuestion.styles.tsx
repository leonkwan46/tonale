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

export const SMuFLCard = styled.View<{ isTablet: boolean, isTempoText?: boolean }>(({ theme, isTablet, isTempoText }) => ({
  backgroundColor: theme.colors.background,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#000',
  width: '100%',
  maxWidth: isTablet ? 600 : 380,
  minHeight: isTempoText ? (isTablet ? scale(115) : scale(135)) : (isTablet ? scale(115) : scale(135)),
  position: 'relative'
}))

export const TTSButton = styled.TouchableOpacity(({ theme }) => ({
  position: 'absolute',
  bottom: scale(8),
  right: scale(8),
  width: scale(32),
  height: scale(32),
  borderRadius: scale(16),
  backgroundColor: theme.colors.primary,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
}))
