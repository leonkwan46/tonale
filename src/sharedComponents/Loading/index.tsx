import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { useEffect } from 'react'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

const SIZE_MAP = {
  small: 20,
  medium: 32,
  large: 48
} as const

const STROKE_WIDTH_MAP = {
  small: 2,
  medium: 3,
  large: 4
} as const

export function Loading({ 
  size = 'medium', 
  color
}: LoadingProps) {
  const theme = useTheme()
  const spinnerColor = color ?? theme.colors.primary

  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = 0
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear
      }),
      -1,
      false
    )
  }, [rotation])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }]
  }))

  const spinnerSize = SIZE_MAP[size]
  const strokeWidth = STROKE_WIDTH_MAP[size]
  const radius = (spinnerSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <Container>
      <SpinnerContainer size={spinnerSize} style={animatedStyle}>
        <SpinnerCircle
          size={spinnerSize}
          strokeWidth={strokeWidth}
          color={spinnerColor}
          radius={radius}
          circumference={circumference}
        />
      </SpinnerContainer>
    </Container>
  )
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
  min-height: 60px;
  min-width: 60px;
`

const SpinnerContainer = styled(Animated.View)<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  justify-content: center;
  align-items: center;
`

const SpinnerCircle = styled.View<{
  size: number
  strokeWidth: number
  color: string
  radius: number
  circumference: number
}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-width: ${props => props.strokeWidth}px;
  border-color: ${props => props.color}20;
  border-top-color: ${props => props.color};
  border-radius: ${props => props.size / 2}px;
`
