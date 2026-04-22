import { useMemo, type FC } from 'react'
import { scale } from 'react-native-size-matters'
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, type SharedValue } from 'react-native-reanimated'
import { ClapEmoji, PullIndicatorContainer, PullIndicatorMessage } from './PullIndicator.styles'

export const PULL_THRESHOLD = scale(35)

const OPACITY_INPUT_RANGE = [0, PULL_THRESHOLD * 0.2, PULL_THRESHOLD * 0.6]
const OPACITY_OUTPUT_RANGE = [0, 0.4, 1]
const SCALE_INPUT_RANGE = [0, PULL_THRESHOLD]
const SCALE_OUTPUT_RANGE = [0.7, 1]
const TILT_INPUT_RANGE = [0, PULL_THRESHOLD * 0.8, PULL_THRESHOLD]
const TILT_OUTPUT_RANGE = [0, 0, -15]

const ENCOURAGEMENT_OVERLAY_STYLE = { position: 'absolute', bottom: 0, left: 0, right: 0 } as const

const ENCOURAGEMENT_MESSAGES = [
  'You\'re making yourself proud',
  'You\'re learning, and that\'s beautiful',
  'Be proud of yourself',
  'You\'re doing great',
  'Look at you go!',
  'Tiny win, big clap',
  'Clap for yourself!'
]

interface PullIndicatorProps {
  pullDistance: SharedValue<number>
  messageIndex: number
}

export const PullIndicator: FC<PullIndicatorProps> = ({ pullDistance, messageIndex }) => {
  const encouragementMessage = useMemo(() => {
    const index = messageIndex % ENCOURAGEMENT_MESSAGES.length
    return ENCOURAGEMENT_MESSAGES[index]
  }, [messageIndex])

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(pullDistance.value, OPACITY_INPUT_RANGE, OPACITY_OUTPUT_RANGE, 'clamp')
    const scaleVal = interpolate(pullDistance.value, SCALE_INPUT_RANGE, SCALE_OUTPUT_RANGE, 'clamp')

    return {
      opacity,
      transform: [{ scale: scaleVal }]
    }
  })

  const emojiTiltStyle = useAnimatedStyle(() => {
    const rotation = interpolate(pullDistance.value, TILT_INPUT_RANGE, TILT_OUTPUT_RANGE, 'clamp')

    return {
      transform: [{ rotate: `${rotation}deg` }]
    }
  })

  const isComplete = useDerivedValue(() =>
    interpolate(pullDistance.value, [0, PULL_THRESHOLD], [0, 1], 'clamp') >= 1
  )

  const hintStyle = useAnimatedStyle(() => ({ opacity: isComplete.value ? 0 : 1 }))
  const encouragementStyle = useAnimatedStyle(() => ({ opacity: isComplete.value ? 1 : 0 }))

  return (
    <Animated.View style={containerStyle}>
      <PullIndicatorContainer>
        <Animated.View style={emojiTiltStyle}>
          <ClapEmoji>👏</ClapEmoji>
        </Animated.View>
        <Animated.View style={hintStyle}>
          <PullIndicatorMessage size="sm" align="center" muted>
            Pull to celebrate
          </PullIndicatorMessage>
        </Animated.View>
        <Animated.View style={[ENCOURAGEMENT_OVERLAY_STYLE, encouragementStyle]}>
          <PullIndicatorMessage size="sm" align="center" muted>
            {encouragementMessage}
          </PullIndicatorMessage>
        </Animated.View>
      </PullIndicatorContainer>
    </Animated.View>
  )
}
