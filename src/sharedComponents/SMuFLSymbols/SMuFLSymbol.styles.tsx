import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const SMuFLSymbolContainer = styled.View<{ isTablet?: boolean; isTempoText?: boolean }>(({ theme, isTablet, isTempoText }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: isTempoText 
    ? (isTablet ? scale(8) : scale(12)) 
    : (isTablet ? scale(16) : scale(20))
}))

export const SMuFLSymbolText = styled.Text<{ isTablet?: boolean; isTempoText?: boolean }>(({ theme, isTablet, isTempoText }) => ({
  fontFamily: isTempoText ? 'Times New Roman' : 'Bravura',
  fontSize: isTempoText 
    ? (isTablet ? scale(18) : scale(24)) 
    : (isTablet ? scale(24) : scale(40)),
  color: theme.colors.text,
  textAlign: 'center',
  fontStyle: isTempoText ? 'italic' : 'normal',
  fontWeight: isTempoText ? '500' : 'normal'
}))