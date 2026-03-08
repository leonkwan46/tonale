import styled from '@emotion/native'
import { Image, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ProfileSection = styled.View(({ theme }) => ({
  alignItems: 'center',
  gap: scale(theme.spacing.md)
}))

export const ProfileName = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.xl || 20),
  color: theme.colors.text,
  textAlign: 'center' as const,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold)
}))

export const AvatarContainer = styled(View)(({ theme }) => ({
  width: scale(120),
  height: scale(120),
  borderRadius: scale(120),
  backgroundColor: theme.colors.surface,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'
}))

export const AvatarImage = styled(Image)({
  width: '80%',
  height: '80%',
  resizeMode: 'contain'
})

