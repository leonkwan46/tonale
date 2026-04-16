import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const PullIndicatorContainer = styled(View)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.device.isTablet ? scale(-60) : scale(-80),
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none'
}))

export const EmojiText = styled(Text)(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(30) : scale(40),
  textAlign: 'center'
}))

export const PullIndicatorMessage = styled(Typography)(() => ({
  marginTop: scale(8)
}))
