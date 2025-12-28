import { Colors, ColorScheme } from '@/constants/Colors'
import * as React from 'react'
import { useEffect } from 'react'
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming
} from 'react-native-reanimated'
import { scale as scaleSize } from 'react-native-size-matters'
import {
    Container,
    InnerCircle,
    LogoContainer,
    MusicIcon,
    OuterCircle
} from './LogoAnimation.styles'

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
          size={scaleSize(48)}
          color={colors.primary}
          colorScheme={colorScheme}
        />
      </LogoContainer>
    </Container>
  )
}

