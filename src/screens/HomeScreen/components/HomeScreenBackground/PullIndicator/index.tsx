import { useMemo, type FC } from 'react'
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated'
import {
  ENCOURAGEMENT_MESSAGES,
  OPACITY_INPUT_RANGE,
  OPACITY_OUTPUT_RANGE,
  SCALE_INPUT_RANGE,
  SCALE_OUTPUT_RANGE
} from './PullIndicator.constants'
import { PullIndicatorContainer, PullIndicatorEmoji, PullIndicatorMessage } from './PullIndicator.styles'

interface PullIndicatorProps {
  pullDistance: SharedValue<number>
  messageIndex: number
}

export const PullIndicator: FC<PullIndicatorProps> = ({ pullDistance, messageIndex }) => {
  const message = useMemo(() => {
    const index = messageIndex % ENCOURAGEMENT_MESSAGES.length
    return ENCOURAGEMENT_MESSAGES[index]
  }, [messageIndex])
  
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(pullDistance.value, OPACITY_INPUT_RANGE, OPACITY_OUTPUT_RANGE, 'clamp')
    const scale = interpolate(pullDistance.value, SCALE_INPUT_RANGE, SCALE_OUTPUT_RANGE, 'clamp')
    
    return {
      opacity,
      transform: [{ scale }]
    }
  })

  return (
    <Animated.View style={animatedStyle}>
      <PullIndicatorContainer>
        <PullIndicatorEmoji>👏</PullIndicatorEmoji>
        <PullIndicatorMessage>{message}</PullIndicatorMessage>
      </PullIndicatorContainer>
    </Animated.View>
  )
}

