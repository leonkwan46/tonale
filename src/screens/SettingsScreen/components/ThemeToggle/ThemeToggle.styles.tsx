import styled from '@emotion/native'
import { Animated } from 'react-native'
import { scale } from 'react-native-size-matters'

const TRACK_WIDTH = scale(56)
const TRACK_HEIGHT = scale(30)
const THUMB_SIZE = scale(26)
const TRACK_PADDING = (TRACK_HEIGHT - THUMB_SIZE) / 2

export const TOGGLE_CONSTANTS = {
  TRACK_WIDTH,
  THUMB_SIZE,
  TRACK_PADDING,
  SLIDE_DISTANCE: TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING * 2
}

export const Track = styled.TouchableOpacity(({ theme }) => ({
  width: TRACK_WIDTH,
  height: TRACK_HEIGHT,
  borderRadius: TRACK_HEIGHT / 2,
  backgroundColor: theme.colors.primary,
  justifyContent: 'center',
  padding: TRACK_PADDING
}))

export const Thumb = styled(Animated.View)(({ theme }) => ({
  width: THUMB_SIZE,
  height: THUMB_SIZE,
  borderRadius: THUMB_SIZE / 2,
  backgroundColor: theme.colors.surface,
  justifyContent: 'center',
  alignItems: 'center'
}))
