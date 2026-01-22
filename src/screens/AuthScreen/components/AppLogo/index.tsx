import { Icon } from '@/sharedComponents/Icon'
import { useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import {
  InnerCircle,
  LogoContainer,
  OuterCircle
} from './AppLogo.styles'

export const AppLogo = () => {
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
    <LogoContainer style={logoStyle}>
      <OuterCircle />
      <InnerCircle />
      <Icon
        name="musical-notes"
        sizeVariant="xl"
        colorVariant="text"
      />
    </LogoContainer>
  )
}

