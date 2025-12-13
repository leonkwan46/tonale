import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

export const PlaybackCard = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  backgroundColor: '#E5E5EA',
  borderRadius: scale(20),
  paddingVertical: scale(32),
  paddingHorizontal: scale(24),
  width: '100%',
  maxWidth: isTablet ? scale(400) : scale(320),
  minHeight: scale(200),
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden'
}))

export const PlaybackText = styled.Text<{ isTablet: boolean }>(({ isTablet }) => ({
  fontSize: isTablet ? scale(18) : scale(20),
  color: '#000',
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily('700')
}))

export const AnimationContainer = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  position: 'absolute',
  top: scale(40),
  bottom: scale(0),
  left: scale(0),
  right: scale(0),
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1
}))

export const PlayButton = styled.TouchableOpacity<{ isTablet: boolean; isPlaying?: boolean; onPlaybackPress?: () => void }>(({ theme, isTablet, isPlaying, onPlaybackPress }) => ({
  width: isTablet ? scale(80) : scale(100),
  height: isTablet ? scale(80) : scale(100),
  borderRadius: isTablet ? scale(40) : scale(50),
  backgroundColor: theme.colors.primary,
  alignItems: 'center',
  justifyContent: 'center',
  activeOpacity: 0.8,
  overflow: 'hidden',
  opacity: (isPlaying || !onPlaybackPress) ? 0.6 : 1,
  zIndex: 10
}))

export const IconWrapper = styled.View<{ isPlaying?: boolean }>(({ isPlaying }) => ({
  marginLeft: isPlaying ? 0 : scale(2)
}))

export const WaterArea = styled(Animated.View)<{ isTablet: boolean }>(({ isTablet }) => ({
  position: 'absolute',
  backgroundColor: 'rgba(80, 160, 255, 1)',
  alignSelf: 'center',
  zIndex: 1
}))

export const RippleCircle = styled(Animated.View)<{ isTablet: boolean }>(({ isTablet }) => ({
  position: 'absolute',
  borderColor: 'rgba(180, 220, 255, 0.9)',
  backgroundColor: 'transparent',
  alignSelf: 'center',
  zIndex: 2
}))
