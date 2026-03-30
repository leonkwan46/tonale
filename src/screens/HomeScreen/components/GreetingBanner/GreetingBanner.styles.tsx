import styled from '@emotion/native'
import { Image, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'

export const GreetingBannerContainer = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: scale(theme.borderRadius.lg)
}))

export const GreetingText = styled(Typography)(({ theme }) => ({
  flex: 1,
  marginRight: scale(theme.spacing.md)
}))

export const AvatarContainer = styled(View)(({ theme }) => ({
  width: scale(50),
  height: scale(50),
  borderRadius: scale(50),
  backgroundColor: theme.colors.surface,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'
}))

export const CharacterAvatar = styled(Image)({
  width: '80%',
  height: '80%',
  resizeMode: 'contain'
})

