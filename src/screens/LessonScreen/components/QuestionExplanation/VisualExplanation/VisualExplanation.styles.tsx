import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const ExplanationCard = styled.View<{ isTextTerm?: boolean }>(({ theme, isTextTerm }) => ({
  backgroundColor: '#ffffff',
  borderRadius: scale(16),
  borderWidth: scale(1),
  borderColor: '#000000',
  width: '100%',
  maxWidth: '100%',
  minHeight: isTextTerm ? (theme.device.isTablet ? scale(115) : scale(135)) : (theme.device.isTablet ? scale(115) : scale(135)),
  position: 'relative'
}))

export const TabletNoteScaleContainer = styled.View<{ isTextTerm?: boolean }>(({ theme, isTextTerm }) => ({
  ...(theme.device.isTablet && {
    width: '100%',
    maxWidth: '100%',
    minHeight: isTextTerm ? (theme.device.isTablet ? scale(115) : scale(135)) : (theme.device.isTablet ? scale(115) : scale(135)),
    transform: [{ scale: 2 }]
  })
}))

export const ExplanationSymbolContainer = styled.View<{ isTextTerm?: boolean }>(({ theme, isTextTerm }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: isTextTerm
    ? (theme.device.isTablet ? scale(8) : scale(12))
    : undefined
}))

export const ExplanationSymbolText = styled.Text<{ isTextTerm?: boolean; isWideDynamic?: boolean }>(({ theme, isTextTerm, isWideDynamic }) => ({
  fontFamily: isTextTerm ? 'Times New Roman' : 'Bravura',
  fontSize: isTextTerm 
    ? (theme.device.isTablet ? scale(18) : scale(24)) 
    : (theme.device.isTablet ? scale(24) : scale(40)),
  fontStyle: isTextTerm ? 'italic' : 'normal',
  fontWeight: isTextTerm ? '500' : 'normal',
  color: '#000000',
  textAlign: 'center',
  textAlignVertical: 'center',
  paddingHorizontal: scale(15),
  transform: isWideDynamic ? [{ scaleX: 4 }, { scale: 1.5 }] : theme.device.isTablet ? [{ scale: 2 }] : [{ scale: 1.5 }],
  marginTop: theme.device.isTablet ? scale(0) : scale(-10)
}))
