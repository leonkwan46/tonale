import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Image, View } from 'react-native'
import { scale } from 'react-native-size-matters'

const screenWidth = Dimensions.get('window').width

export const StickerWrapper = styled(View)<{ isTablet?: boolean }>(({ isTablet }) => ({
  width: screenWidth,
  alignItems: 'center',
  padding: scale(6)
}))

export const LinearGradientView = styled(LinearGradient)<{ isTablet?: boolean }>(({ isTablet }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: isTablet ? scale(140) : scale(160),
  pointerEvents: 'none'
}))

export const AvatarImage = styled(Image)<{ isTablet?: boolean }>(({ isTablet }) => ({
  width: isTablet ? scale(100) : scale(160),
  height: isTablet ? scale(100) : scale(120),
  resizeMode: 'contain'
}))
