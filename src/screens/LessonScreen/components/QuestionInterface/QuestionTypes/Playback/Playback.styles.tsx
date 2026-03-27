import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { createPressableWithOpacity } from '@/utils/PressableFeedback'
import { createForwardProps } from '@/utils/styledProps'

const PressableOpacity08 = createPressableWithOpacity(0.8)

const PLAYBACK_CARD_MAX_WIDTH_TABLET = 400
const PLAYBACK_CARD_MAX_WIDTH_PHONE = 320
const PLAYBACK_CARD_MIN_HEIGHT = 200
const PLAY_ICON_SIZE_TABLET = 40
const PLAY_ICON_SIZE_PHONE = 50

export const PlaybackCard = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(theme.borderRadius.xl),
  paddingVertical: scale(theme.spacing.xl),
  paddingHorizontal: scale(theme.spacing.lg),
  width: '100%',
  maxWidth: isTablet ? scale(PLAYBACK_CARD_MAX_WIDTH_TABLET) : scale(PLAYBACK_CARD_MAX_WIDTH_PHONE),
  minHeight: scale(PLAYBACK_CARD_MIN_HEIGHT),
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  alignSelf: 'center'
}))

export const PlaybackText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(theme.typography.lg) : scale(theme.typography.xl),
  color: theme.colors.text,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold)
}))

export const AnimationContainer = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  position: 'absolute',
  top: scale(theme.spacing.xl),
  bottom: scale(0),
  left: scale(0),
  right: scale(0),
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1
}))

export const PlayButton = styled(PressableOpacity08)<{ isTablet: boolean; isPlaying?: boolean; onPlaybackPress?: () => void; disabled?: boolean }>(({ theme, isTablet, isPlaying, onPlaybackPress, disabled }) => {
  const buttonSize = isTablet ? scale(80) : scale(100)
  return {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    backgroundColor: disabled ? theme.colors.border : theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: isPlaying ? 0 : scale(theme.spacing.xs),
    overflow: 'hidden',
    opacity: (isPlaying || !onPlaybackPress) ? 0.6 : (disabled ? 0.5 : 1),
    zIndex: 10
  }
})

export const PlayIcon = styled(Ionicons, {
  shouldForwardProp: createForwardProps(['disabled'])
})<{ disabled: boolean }>(({ theme, disabled }) => ({
  color: disabled ? theme.colors.icon : theme.colors.primaryContrast
}))

export const getPlayIconSize = (isTablet: boolean): number => {
  return isTablet ? scale(PLAY_ICON_SIZE_TABLET) : scale(PLAY_ICON_SIZE_PHONE)
}
