import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

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
