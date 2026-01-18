import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const AppNameContainer = styled(Animated.View)(() => ({}))

export const AppNameText = styled.Text(({ theme }) => ({
  fontSize: scale(36),
  textAlign: 'center',
  marginBottom: scale(12),
  letterSpacing: scale(-0.5),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('700')
}))

export const TaglineContainer = styled(Animated.View)(() => ({}))

export const TaglineText = styled.Text(({ theme }) => ({
  fontSize: scale(16),
  textAlign: 'center',
  marginBottom: scale(40),
  lineHeight: scale(22),
  opacity: 0.8,
  color: theme.colors.icon,
  fontFamily: getSourGummyFontFamily('400')
}))

