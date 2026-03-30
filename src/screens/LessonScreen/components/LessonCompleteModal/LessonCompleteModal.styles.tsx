import { Typography } from '@/compLib/Typography'
import { createForwardProps } from '@/utils/styledProps'
import styled from '@emotion/native'
import { Animated } from 'react-native'
import { scale } from 'react-native-size-matters'

export const StarContainer = styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}))

export const StarIcon = styled(Typography, {
  shouldForwardProp: createForwardProps(['filled'])
})<{ filled: boolean }>(({ theme, filled }) => ({
  color: filled ? theme.components.achievement.gold : theme.colors.text,
  opacity: filled ? 1 : 0.4
}))

export const AnimatedStarContainer = styled(Animated.View)(() => ({
  width: scale(50),
  height: scale(50),
  justifyContent: 'center',
  alignItems: 'center'
}))
