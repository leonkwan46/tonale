import styled from '@emotion/native'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const CelebrationContainer = styled(View)<{ bottomPosition: number }>(({ bottomPosition }) => ({
  position: 'absolute',
  bottom: bottomPosition,
  left: 0,
  right: 0,
  height: 0, // Container has no height, emojis positioned absolutely from bottom
  pointerEvents: 'none',
  zIndex: 1000
}))

export const ClapEmoji = styled(Text)({
  fontSize: scale(32),
  textAlign: 'center'
})
