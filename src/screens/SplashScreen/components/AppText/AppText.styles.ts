import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const AppNameContainer = styled(Animated.View)(() => ({}))

export const AppNameText = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography['4xl']),
  textAlign: 'center',
  marginBottom: scale(theme.spacing.sm),
  letterSpacing: scale(-0.5),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('700')
}))

export const TaglineContainer = styled(Animated.View)(() => ({}))

export const TaglineText = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.base),
  textAlign: 'center',
  marginBottom: scale(theme.spacing.xxl),
  lineHeight: scale(22),
  opacity: 0.8,
  color: theme.colors.icon,
  fontFamily: getSourGummyFontFamily('400')
}))

