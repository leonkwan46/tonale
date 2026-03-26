import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const SMuFLCardContainer = styled.View<{ isTextTerm?: boolean }>(({ theme, isTextTerm }) => ({
  backgroundColor: theme.components.displayCard.background,
  borderRadius: scale(theme.borderRadius.lg),
  borderWidth: scale(1),
  borderColor: theme.colors.cardText,
  width: '75%',
  maxWidth: theme.device.isTablet ? scale(600) : scale(380),
  minHeight: isTextTerm ? (theme.device.isTablet ? scale(115) : scale(135)) : (theme.device.isTablet ? scale(115) : scale(135)),
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center'
}))

export const SMuFLSymbolText = styled.Text<{
  isTextTerm?: boolean
  isWideDynamic?: boolean
}>(({ theme, isTextTerm, isWideDynamic }) => ({
  fontFamily: isTextTerm ? 'Times New Roman' : 'Bravura',
  fontSize: isTextTerm
    ? theme.device.isTablet
      ? scale(18)
      : scale(24)
    : theme.device.isTablet
      ? scale(24)
      : scale(40),
  fontStyle: isTextTerm ? 'italic' : 'normal',
  fontWeight: isTextTerm ? '500' : 'normal',
  color: theme.colors.cardText,
  textAlign: 'center',
  textAlignVertical: 'center',
  paddingHorizontal: scale(15),
  transform: isWideDynamic ? [{ scaleX: 4 }] : []
}))
