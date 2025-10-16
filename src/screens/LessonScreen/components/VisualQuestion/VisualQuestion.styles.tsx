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

export const SMuFLSymbolContainer = styled.View<{ isTablet?: boolean; isTextTerm?: boolean }>(({ isTablet, isTextTerm }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: isTextTerm
    ? (isTablet ? scale(8) : scale(12))
    : null,
  marginTop: isTablet && !isTextTerm ? scale(10) : scale(-10)
}))

export const SMuFLSymbolText = styled.Text<{ isTablet?: boolean; isTextTerm?: boolean }>(({ theme, isTablet, isTextTerm }) => ({
  fontFamily: isTextTerm ? 'Times New Roman' : 'Bravura',
  fontSize: isTextTerm 
    ? (isTablet ? scale(18) : scale(24)) 
    : (isTablet ? scale(24) : scale(40)),
  fontStyle: isTextTerm ? 'italic' : 'normal',
  fontWeight: isTextTerm ? '500' : 'normal',
  color: '#000',
  textAlign: 'center',
  textAlignVertical: 'center',
  paddingHorizontal: scale(15)
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
