import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const ExplanationCard = styled.View<{ isTablet: boolean; isTextTerm?: boolean }>(({ theme, isTablet, isTextTerm }) => ({
  backgroundColor: theme.colors.background,
  borderRadius: scale(16),
  borderWidth: scale(1),
  borderColor: theme.colors.border,
  width: '100%',
  maxWidth: '100%',
  minHeight: isTextTerm ? (isTablet ? scale(115) : scale(135)) : (isTablet ? scale(115) : scale(135)),
  position: 'relative'
}))

export const TabletNoteScaleContainer = styled.View<{ isTablet: boolean; isTextTerm?: boolean }>(({ isTablet, isTextTerm }) => ({
  ...(isTablet && {
    width: '100%',
    maxWidth: '100%',
    minHeight: isTextTerm ? (isTablet ? scale(115) : scale(135)) : (isTablet ? scale(115) : scale(135)),
    transform: [{ scale: 2 }]
  })
}))

export const ExplanationSymbolContainer = styled.View<{ isTablet?: boolean; isTextTerm?: boolean }>(({ isTablet, isTextTerm }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: isTextTerm
    ? (isTablet ? scale(8) : scale(12))
    : undefined
}))

export const ExplanationSymbolText = styled.Text<{ isTablet?: boolean; isTextTerm?: boolean; isWideDynamic?: boolean }>(({ theme, isTablet, isTextTerm, isWideDynamic }) => ({
  fontFamily: isTextTerm ? 'Times New Roman' : 'Bravura',
  fontSize: isTextTerm 
    ? (isTablet ? scale(18) : scale(24)) 
    : (isTablet ? scale(24) : scale(40)),
  fontStyle: isTextTerm ? 'italic' : 'normal',
  fontWeight: isTextTerm ? '500' : 'normal',
  color: theme.colors.text,
  textAlign: 'center',
  textAlignVertical: 'center',
  paddingHorizontal: scale(15),
  transform: isWideDynamic ? [{ scaleX: 4 }, { scale: 1.5 }] : isTablet ? [{ scale: 2 }] : [{ scale: 1.5 }],
  marginTop: isTablet ? scale(0) : scale(-10)
}))
