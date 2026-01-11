import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const SettingsItemContainer = styled(TouchableOpacity)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(12),
  paddingVertical: scale(12)
})

export const IconContainer = styled(View)<{ type?: 'filled' | 'outlined' }>(({ theme, type }) => ({
  padding: scale(8),
  borderRadius: scale(40),
  backgroundColor: type === 'outlined' ? theme.colors.surface : 'transparent',
  justifyContent: 'center',
  alignItems: 'center'
}))

export const SettingsItemLabel = styled.Text<{ variant?: 'default' | 'red' }>(({ theme, variant }) => ({
  flex: 1,
  fontSize: scale(theme.typography.base || 16),
  color: variant === 'red' ? theme.colors.error : theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.normal || '400')
}))

export const StyledIcon = styled(Ionicons)<{ variant?: 'default' | 'red' | 'verified' }>(({ theme, variant }) => {
  if (variant === 'red') {
    return { color: theme.colors.error }
  }
  if (variant === 'verified') {
    return { color: theme.colors.primary || '#007AFF' }
  }
  return { color: theme.colors.icon || '#999' }
})

export const Separator = styled(View)(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.border
}))

export const VerifyIconContainer = styled(View)(({ theme }) => ({
  marginRight: scale(8),
  justifyContent: 'center',
  alignItems: 'center'
}))
