import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

// Constants for PlaybackCard dimensions
const PLAYBACK_CARD_MAX_WIDTH_TABLET = 400
const PLAYBACK_CARD_MAX_WIDTH_PHONE = 320
const PLAYBACK_CARD_MIN_HEIGHT = 200

// Constants for PlayIcon size
const PLAY_ICON_SIZE_TABLET = 40
const PLAY_ICON_SIZE_PHONE = 50

// Constants for ripple animation colors
const WATER_AREA_BACKGROUND_COLOR = 'rgba(80, 160, 255, 1)'
const RIPPLE_CIRCLE_BORDER_COLOR = 'rgba(180, 220, 255, 0.9)'

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
  fontFamily: getSourGummyFontFamily('700')
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

export const PlayButton = styled.TouchableOpacity<{ isTablet: boolean; isPlaying?: boolean; onPlaybackPress?: () => void; disabled?: boolean }>(({ theme, isTablet, isPlaying, onPlaybackPress, disabled }) => {
  const buttonSize = isTablet ? scale(80) : scale(100)
  return {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2, // Full circle
    backgroundColor: disabled ? theme.colors.border : theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    activeOpacity: 0.8,
    overflow: 'hidden',
    opacity: (isPlaying || !onPlaybackPress) ? 0.6 : (disabled ? 0.5 : 1),
    zIndex: 10
  }
})

export const IconWrapper = styled.View<{ isPlaying?: boolean }>(({ theme, isPlaying }) => ({
  marginLeft: isPlaying ? 0 : scale(theme.spacing.xs)
}))

export const PlayIcon = styled(Ionicons)<{ isTablet: boolean }>(({ theme }) => ({
  color: theme.colors.background
}))

// Helper to get icon size based on device type
export const getPlayIconSize = (isTablet: boolean): number => {
  return isTablet ? scale(PLAY_ICON_SIZE_TABLET) : scale(PLAY_ICON_SIZE_PHONE)
}

export const WaterArea = styled(Animated.View)<{ isTablet: boolean }>(() => ({
  position: 'absolute',
  backgroundColor: WATER_AREA_BACKGROUND_COLOR,
  alignSelf: 'center',
  zIndex: 1
}))

export const RippleCircle = styled(Animated.View)<{ isTablet: boolean }>(() => ({
  position: 'absolute',
  borderColor: RIPPLE_CIRCLE_BORDER_COLOR,
  backgroundColor: 'transparent',
  alignSelf: 'center',
  zIndex: 2
}))
