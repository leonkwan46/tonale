import { useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { scale as scaleSize } from 'react-native-size-matters'
import { RippleCircle, WaterArea } from './Playback.styles'

interface RippleAnimationProps {
  isTablet: boolean
  onComplete?: () => void
}

export const RippleAnimation: React.FC<RippleAnimationProps> = ({ 
  isTablet,
  onComplete
}) => {
  const waterScale = useSharedValue(0.6)
  const waterOpacity = useSharedValue(0.25)
  const ringScale = useSharedValue(0.6)
  const ringOpacity = useSharedValue(0.5)
  const borderWidth = useSharedValue(2)

  useEffect(() => {
    waterScale.value = withTiming(6.5, {
      duration: 800,
      easing: Easing.out(Easing.cubic)
    })
    
    waterOpacity.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.quad)
    })

    ringScale.value = withTiming(6, {
      duration: 800,
      easing: Easing.out(Easing.cubic)
    })
    
    ringOpacity.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.quad)
    })

    borderWidth.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.quad)
    })

    const timeout = setTimeout(() => {
      onComplete?.()
    }, 800)

    return () => {
      clearTimeout(timeout)
      waterScale.value = 0.6
      waterOpacity.value = 0.25
      ringScale.value = 0.6
      ringOpacity.value = 0.5
      borderWidth.value = 2
    }
  }, [onComplete, isTablet, borderWidth, ringOpacity, ringScale, waterOpacity, waterScale])

  const waterStyle = useAnimatedStyle(() => ({
    transform: [{ scale: waterScale.value }],
    opacity: waterOpacity.value
  }))

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
    borderWidth: borderWidth.value
  }))

  const buttonSize = isTablet ? scaleSize(80) : scaleSize(100)

  const baseStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2
  }

  return (
    <>
      <WaterArea isTablet={isTablet} style={[waterStyle, baseStyle]} />
      <RippleCircle isTablet={isTablet} style={[ringStyle, baseStyle]} />
    </>
  )
}
