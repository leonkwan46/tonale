import styled from '@emotion/native'
import { TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const SettingsItemContainer = styled(TouchableOpacity)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(theme.spacing.sm),
  paddingVertical: scale(theme.spacing.sm)
}))

export const IconContainer = styled(View)<{ type?: 'filled' | 'outlined' }>(({ theme, type }) => ({
  padding: scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius['3xl']),
  backgroundColor: type === 'outlined' ? theme.colors.surface : 'transparent',
  justifyContent: 'center',
  alignItems: 'center'
}))

export const SettingsItemLabel = styled.Text<{ variant?: 'default' | 'red' }>(({ theme, variant }) => ({
  flex: 1,
  fontSize: scale(theme.typography.base),
  color: variant === 'red' ? theme.colors.error : theme.colors.text,
  fontFamily: getSourGummyFontFamily()
}))

export const Separator = styled(View)(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.border
}))

export const VerifyIconContainer = styled(View)(({ theme }) => ({
  marginRight: scale(theme.spacing.sm),
  justifyContent: 'center',
  alignItems: 'center'
}))
