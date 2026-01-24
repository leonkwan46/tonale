import styled from '@emotion/native'
import { Image } from 'react-native'
import { scale } from 'react-native-size-matters'

export const GenderIconImage = styled(Image)(() => ({
  width: scale(40),
  height: scale(40),
  resizeMode: 'contain' as const
}))
