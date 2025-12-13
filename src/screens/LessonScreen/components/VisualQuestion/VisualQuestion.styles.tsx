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

export const SMuFLSymbolText = styled.Text<{ isTablet?: boolean; isTextTerm?: boolean; isWideDynamic?: boolean }>(({ theme, isTablet, isTextTerm, isWideDynamic }) => ({
  fontFamily: isTextTerm ? 'Times New Roman' : 'Bravura',
  fontSize: isTextTerm 
    ? (isTablet ? scale(18) : scale(24)) 
    : (isTablet ? scale(24) : scale(40)),
  fontStyle: isTextTerm ? 'italic' : 'normal',
  fontWeight: isTextTerm ? '500' : 'normal',
  color: '#000',
  textAlign: 'center',
  textAlignVertical: 'center',
  paddingHorizontal: scale(15),
  transform: isWideDynamic ? [{ scaleX: 4 }] : []
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

export const PlaybackCard = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  backgroundColor: '#E5E5EA',
  borderRadius: scale(20),
  paddingVertical: scale(32),
  paddingHorizontal: scale(24),
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: isTablet ? scale(400) : scale(320),
  minHeight: scale(200)
}))

export const PlaybackText = styled.Text<{ isTablet: boolean }>(({ isTablet }) => ({
  fontSize: isTablet ? scale(18) : scale(20),
  fontWeight: 'bold',
  color: '#000',
  textAlign: 'center',
  marginBottom: scale(24)
}))

export const PlayButton = styled.TouchableOpacity<{ isTablet: boolean }>(({ isTablet }) => ({
  width: isTablet ? scale(80) : scale(100),
  height: isTablet ? scale(80) : scale(100),
  borderRadius: isTablet ? scale(40) : scale(50),
  backgroundColor: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  activeOpacity: 0.8,
  overflow: 'hidden'
}))
