import { useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'
import {
  InnerCircle,
  LogoContainer,
  MusicIcon,
  OuterCircle
} from './AppLogo.styles'

interface AppLogoProps {
  isTablet: boolean
}

export const AppLogo = ({
  isTablet
}: AppLogoProps) => {
  const scaleValue = useSharedValue(0.3)
  const opacity = useSharedValue(0)

  useEffect(() => {
    scaleValue.value = withSpring(1.0, {
      damping: 8,
      stiffness: 100
    })
    
    opacity.value = withTiming(1.0, {
      duration: 800,
      easing: Easing.out(Easing.ease)
    })
  }, [scaleValue, opacity])

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scaleValue.value }
    ],
    opacity: opacity.value
  }))
  
  return (
    <LogoContainer isTablet={isTablet} style={logoStyle}>
      <OuterCircle isTablet={isTablet} />
      <InnerCircle isTablet={isTablet} />
      <MusicIcon
        name="musical-notes"
        size={isTablet ? scale(40) : scale(36)}
        isTablet={isTablet}
      />
    </LogoContainer>
  )
}

