import styled from '@emotion/native'
import { Image } from 'react-native'
import { scale } from 'react-native-size-matters'

export const AvatarContainer = styled.View`
  width: 100%;
  min-height: ${scale(120)};
  align-items: center;
  justify-content: center;
`

export const AvatarImage = styled(Image)({
  width: scale(120),
  height: scale(120),
  resizeMode: 'contain'
})

