import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, ScrollView, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const HomeScreenContainer = styled(View)({
  flex: 1,
  position: 'relative'
})

export const ScrollContentContainer = styled.View(() => ({
  flexGrow: 1
}))

export const HomeScreenBackgroundContainer = styled(View)({
  flex: 1
})

export const ImageContainer = styled(View)({
  flex: 1,
  justifyContent: 'flex-end',
  position: 'relative'
})

export const StageImage = styled(Image)<{ screenWidth: number }>(({ screenWidth }) => ({
  width: screenWidth,
  height: screenWidth * 1.5,
  resizeMode: 'cover'
}))

export const AvatarImage = styled(Image)<{ screenWidth: number }>(({ screenWidth }) => ({
  position: 'absolute',
  bottom: scale(100),
  left: screenWidth / 2 - scale(65),
  right: 0,
  width: screenWidth / 2.5,
  height: screenWidth / 2.5,
  resizeMode: 'contain'
}))

export const BackgroundGradient = styled(LinearGradient)({
  paddingBottom: scale(100)
})

export const ContentContainer = styled(View)({
  padding: scale(10),
  gap: scale(20),
  alignItems: 'center'
})
