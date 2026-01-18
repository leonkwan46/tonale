import { useEffect } from 'react'
import { useTheme } from '@emotion/react'
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
  isTransitioning: boolean
}

export const LogoAnimation = ({ isTransitioning }: LogoAnimationProps) => {
  const theme = useTheme()
  
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
        <OuterCircle />
        <InnerCircle />
        <MusicIcon
          name="musical-notes"
          size={scaleSize(48)}
          color={theme.colors.primary}
        />
      </LogoContainer>
    </Container>
  )
}

