import styled from '@emotion/native'
import { Image, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const GreetingBannerContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: scale(16)
})

export const GreetingText = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography['2xl']),
  color: theme.colors.text,
  flex: 1,
  marginRight: scale(theme.spacing.md),
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold)
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

