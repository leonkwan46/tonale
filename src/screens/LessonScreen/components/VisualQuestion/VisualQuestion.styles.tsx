import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'

export const VisualQuestionContainer = styled.View(() => ({
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: scale(10)
}))

export const SMuFLSymbolContainer = styled.View<{ isTextTerm?: boolean }>(() => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}))

export const SMuFLSymbolText = styled.Text<{ isTextTerm?: boolean; isWideDynamic?: boolean }>(({ theme, isTextTerm, isWideDynamic }) => ({
  fontFamily: isTextTerm ? 'Times New Roman' : 'Bravura',
  fontSize: isTextTerm 
    ? (theme.device.isTablet ? scale(18) : scale(24)) 
    : (theme.device.isTablet ? scale(24) : scale(40)),
  fontStyle: isTextTerm ? 'italic' : 'normal',
  fontWeight: isTextTerm ? '500' : 'normal',
  color: theme.colors.text,
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
  ...theme.shadows.md
}))

export const TTSIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.text
}))
