import { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import styled from '@emotion/native'

const RippleCircle = styled(Animated.View)`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-width: 3px;
  border-color: #4ECDC4;
`

interface RippleAnimationProps {
  onAnimationComplete: () => void
}

/**
 * Visual ripple animation component.
 * Expands and fades out, then auto-removes itself.
 *
 * @param props - Contains onAnimationComplete callback
 */
export const RippleAnimation = ({ onAnimationComplete }: RippleAnimationProps) => {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0.6)

  useEffect(() => {
    scale.value = withTiming(1.5, { duration: 800 })
    opacity.value = withTiming(0, { duration: 800 }, (finished) => {
      if (finished) {
        onAnimationComplete()
      }
    })
  }, [onAnimationComplete, scale, opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }))

  return <RippleCircle style={animatedStyle} />
}
