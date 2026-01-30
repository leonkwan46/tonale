import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const StickerWrapper = styled(View)<{ screenWidth: number }>(({ screenWidth, theme }) => ({
  width: screenWidth,
  alignItems: 'center',
  padding: scale(6)
}))

export const LinearGradientView = styled(LinearGradient)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: theme.device.isTablet ? scale(140) : scale(160),
  pointerEvents: 'none'
}))

export const AvatarImage = styled(Image)(({ theme }) => ({
  width: theme.device.isTablet ? scale(100) : scale(160),
  height: theme.device.isTablet ? scale(100) : scale(120),
  resizeMode: 'contain'
}))
