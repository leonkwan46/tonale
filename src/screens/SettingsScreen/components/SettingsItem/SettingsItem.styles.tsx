import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'
import { PressableFeedback } from '@/utils/PressableFeedback'

export const SettingsItemContainer = styled(PressableFeedback)(({ theme }) => ({
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

export const SettingsItemLabel = styled(Typography)(() => ({
  flex: 1
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
