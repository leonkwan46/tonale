import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const PullIndicatorContainer = styled(View)<{ isTablet: boolean }>(({ isTablet }) => ({
  position: 'absolute',
  bottom: isTablet ? scale(-60) : scale(-80),
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none'
}))

export const PullIndicatorEmoji = styled(Text)<{ isTablet: boolean }>(({ isTablet }) => ({
  fontSize: isTablet ? scale(30) : scale(40),
  textAlign: 'center'
}))

export const PullIndicatorMessage = styled(Text)<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(12) : scale(14),
  color: theme.colors.text,
  textAlign: 'center',
  marginTop: scale(8),
  opacity: 0.8,
  fontFamily: getSourGummyFontFamily('400')
}))
