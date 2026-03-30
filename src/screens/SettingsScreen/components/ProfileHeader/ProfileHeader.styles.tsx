import styled from '@emotion/native'
import { Image, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'

export const ProfileSection = styled.View(({ theme }) => ({
  alignItems: 'center',
  gap: scale(theme.spacing.md)
}))

export const ProfileName = styled(Typography)(() => ({}))

export const AvatarContainer = styled(View)(({ theme }) => ({
  width: scale(120),
  height: scale(120),
  borderRadius: scale(120),
  backgroundColor: theme.components.settings.sectionBackground,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'
}))

export const AvatarImage = styled(Image)({
  width: '80%',
  height: '80%',
  resizeMode: 'contain'
})

