/**
 * SMuFL Musical Terms Components
 * 
 * Standard Music Font Layout (SMuFL) specification:
 * @see https://w3c.github.io/smufl/latest/index.html
 */

import styled from '@emotion/native';
import { scale } from 'react-native-size-matters';

export const SMuFLSymbolContainer = styled.View<{ isTablet?: boolean; isTextTerm?: boolean }>(({ isTablet, isTextTerm }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: isTextTerm
    ? (isTablet ? scale(8) : scale(12))
    : null,
  marginTop: isTablet && !isTextTerm ? scale(10) : scale(-10)
}))

export const SMuFLSymbolTerm = styled.Text<{ isTablet?: boolean; isTextTerm?: boolean }>(({ isTablet, isTextTerm }) => ({
  fontFamily: isTextTerm ? 'Times New Roman' : 'Bravura',
  fontSize: isTextTerm 
    ? (isTablet ? scale(18) : scale(24)) 
    : (isTablet ? scale(24) : scale(40)),
  fontStyle: isTextTerm ? 'italic' : 'normal',
  fontWeight: isTextTerm ? '500' : 'normal',
  textAlign: 'center',
  textAlignVertical: 'center',
  paddingHorizontal: scale(15)
}))

