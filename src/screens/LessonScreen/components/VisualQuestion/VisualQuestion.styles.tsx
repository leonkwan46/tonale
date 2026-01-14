import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const VisualQuestionContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: scale(10)
}))

export const SMuFLSymbolContainer = styled.View<{ isTablet?: boolean; isTextTerm?: boolean }>(({ isTablet, isTextTerm }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
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
    height: scale(2)
  },
  shadowOpacity: 0.25,
  shadowRadius: scale(3.84),
  elevation: scale(5)
}))
