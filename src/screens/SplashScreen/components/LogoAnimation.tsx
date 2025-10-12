import { Colors, ColorScheme } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import styled from '@emotion/native'
import * as React from 'react'
import { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming
} from 'react-native-reanimated'

interface LogoAnimationProps {
  colorScheme: ColorScheme
  isTransitioning: boolean
}

export function LogoAnimation({ colorScheme, isTransitioning }: LogoAnimationProps) {
  const colors = Colors[colorScheme]
  
  // Animation values
  const scale = useSharedValue(0.3)
  const opacity = useSharedValue(0)
  const rotation = useSharedValue(0)

  useEffect(() => {
    // Logo entrance animation
    scale.value = withSpring(1.0, {
      damping: 8,
      stiffness: 100
    })
    
    opacity.value = withTiming(1.0, {
      duration: 800,
      easing: Easing.out(Easing.ease)
    })

    // Subtle rotation animation
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 8000,
        easing: Easing.linear
      }),
      -1,
      false
    )
  }, [scale, opacity, rotation])

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: isTransitioning ? withTiming(0, { duration: 500 }) : opacity.value
  }))

  return (
    <Container>
      <LogoContainer style={logoStyle}>
        {/* Outer circle with gradient-like shadow */}
        <OuterCircle colorScheme={colorScheme} />
        
        {/* Inner circle for depth */}
        <InnerCircle colorScheme={colorScheme} />
        
        {/* Music note icon */}
        <MusicIcon
          name="musical-notes"
          size={48}
          color={colors.primary}
          colorScheme={colorScheme}
        />
      </LogoContainer>
    </Container>
  )
}

// Styled Components
const Container = styled.View`
  align-items: center;
  margin-bottom: 32px;
`

const LogoContainer = styled(Animated.View)`
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  position: relative;
`

const OuterCircle = styled.View<{ colorScheme: ColorScheme }>`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${props => Colors[props.colorScheme].primary};
  shadow-color: ${props => Colors[props.colorScheme].primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.3;
  shadow-radius: 16px;
  elevation: 12;
`

const InnerCircle = styled.View<{ colorScheme: ColorScheme }>`
  position: absolute;
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background-color: ${props => Colors[props.colorScheme].surface};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`

const MusicIcon = styled(Ionicons)<{ colorScheme: ColorScheme }>`
  z-index: 10;
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 2px;
  text-shadow-color: rgba(0, 0, 0, 0.2);
`
