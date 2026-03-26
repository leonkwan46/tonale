import { useTheme } from '@emotion/react'
import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import { useMemo } from 'react'
import { Animated, Dimensions } from 'react-native'
import { scale } from 'react-native-size-matters'

const { width: screenWidth } = Dimensions.get('window')

interface CloudColors {
  sky50: string
  sky100: string
  sky200: string
  sky300: string
}

const CloudsContainer = styled.View<{ coverHeight: number }>(({ coverHeight }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: coverHeight,
  zIndex: 10,
  overflow: 'hidden'
}))

const CloudLayer = styled(Animated.View)<{
  backgroundColor: string
  height: number
  borderRadius: number
}>(({ backgroundColor, height, borderRadius }) => ({
  position: 'absolute',
  backgroundColor,
  height,
  borderRadius,
  opacity: 0.8
}))

const GradientOverlay = styled(LinearGradient)<{ coverHeight: number }>(({ coverHeight }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: coverHeight,
  zIndex: 1
}))

const getCloudShapes = (cloudColors: CloudColors) => {
  const { sky50, sky100, sky200, sky300 } = cloudColors
  return [
    { width: screenWidth * 0.4, left: -25, top: 5, color: sky50 },
    { width: screenWidth * 0.65, left: screenWidth * 0.25, top: 10, color: sky100 },
    { width: screenWidth * 0.5, left: screenWidth * 0.7, top: 15, color: sky200 },
    { width: screenWidth * 0.7, left: -30, top: 35, color: sky300 },
    { width: screenWidth * 0.6, left: screenWidth * 0.1, top: 30, color: sky50 },
    { width: screenWidth * 0.45, left: screenWidth * 0.6, top: 40, color: sky100 },
    { width: screenWidth * 0.5, left: -20, top: 60, color: sky200 },
    { width: screenWidth * 0.55, left: screenWidth * 0.3, top: 55, color: sky200 },
    { width: screenWidth * 0.3, left: screenWidth * 0.75, top: 65, color: sky300 },
    { width: screenWidth * 0.6, left: -30, top: 85, color: sky300 },
    { width: screenWidth * 0.7, left: screenWidth * 0.15, top: 80, color: sky200 },
    { width: screenWidth * 0.4, left: screenWidth * 0.05, top: 100, color: sky100 },
    { width: screenWidth * 0.3, left: screenWidth * 0.7, top: 105, color: sky200 },
    { width: screenWidth * 0.4, left: 10, top: 120, color: sky50 },
    { width: screenWidth * 0.6, left: screenWidth * 0.3, top: 110, color: sky100 },
    { width: screenWidth * 0.4, left: screenWidth * 0.8, top: 130, color: sky50 }
  ]
}

export function useTopCloudsCoverCloudShapes() {
  const theme = useTheme()
  return useMemo(
    () => getCloudShapes(theme.components.clouds),
    [theme.components.clouds]
  )
}

export { CloudsContainer, CloudLayer, GradientOverlay }
