import { useWindowDimensions } from '@/hooks'
import { type FC, useEffect, useMemo } from 'react'
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated'
import {
    ANIMATION_DURATION,
    BOTTOM_POSITION_RATIO,
    CENTER_AVOIDANCE_PERCENT,
    DELAY_RANGE,
    EASE_OUT,
    EDGE_PADDING,
    EMOJI_CENTER_OFFSET_PERCENT,
    EMOJI_COUNTS,
    EMOJI_TYPES,
    FADE_IN_DURATION,
    FADE_OUT_START_MAX,
    FADE_OUT_START_MIN,
    HORIZONTAL_SPREAD,
    MIN_SPACING_PERCENT,
    POSITION_GENERATION_MAX_ATTEMPTS,
    START_Y_RANDOM_RANGE,
    VERTICAL_DISTANCE_MIN,
    VERTICAL_DISTANCE_RANGE
} from './ClapCelebration.constants'
import { CelebrationContainer, ClapEmoji } from './ClapCelebration.styles'

interface ClapCelebrationProps {
  trigger: boolean
}

interface EmojiConfig {
  emoji: string
  startLeft: number
  startY: number
  translateX: number
  translateY: number
  delay: number
  fadeOutStart: number
}

const createEmojiPool = (): string[] => {
  const emojiPool: string[] = []
  EMOJI_TYPES.forEach(emoji => {
    for (let i = 0; i < EMOJI_COUNTS[emoji]; i++) {
      emojiPool.push(emoji)
    }
  })
  return emojiPool
}

const createPositionGenerator = (screenWidth: number) => {
  const minLeftPercent = (EDGE_PADDING / screenWidth) * 100
  const maxLeftPercent = ((screenWidth - EDGE_PADDING) / screenWidth) * 100
  const centerStart = 50 - CENTER_AVOIDANCE_PERCENT / 2
  const centerEnd = 50 + CENTER_AVOIDANCE_PERCENT / 2
  
  return (): number => {
    const rand = Math.random()
    if (rand < 0.5) {
      return minLeftPercent + Math.random() * (centerStart - minLeftPercent)
    }
    return centerEnd + Math.random() * (maxLeftPercent - centerEnd)
  }
}

const findValidPosition = (
  getRandomPosition: () => number,
  existingPositions: number[],
  emoji: string
): number => {
  let position = getRandomPosition()
  let attempts = 0
  
  while (attempts < POSITION_GENERATION_MAX_ATTEMPTS) {
    const isTooClose = existingPositions.some(pos => 
      Math.abs(position - pos) < MIN_SPACING_PERCENT
    )
    
    if (!isTooClose) {
      return position
    }
    
    position = getRandomPosition()
    attempts++
  }
  
  return position
}

const generateEmojiConfig = (
  emoji: string,
  getRandomPosition: () => number,
  positionsByEmojiType: Map<string, number[]>
): EmojiConfig => {
  const existingPositions = positionsByEmojiType.get(emoji) || []
  const startLeft = findValidPosition(getRandomPosition, existingPositions, emoji)
  
  existingPositions.push(startLeft)
  positionsByEmojiType.set(emoji, existingPositions)
  
  return {
    emoji,
    startLeft,
    startY: (Math.random() - 0.5) * START_Y_RANDOM_RANGE,
    translateX: (Math.random() - 0.5) * HORIZONTAL_SPREAD,
    translateY: -(VERTICAL_DISTANCE_MIN + Math.random() * VERTICAL_DISTANCE_RANGE),
    delay: Math.random() * DELAY_RANGE,
    fadeOutStart: FADE_OUT_START_MIN + Math.random() * (FADE_OUT_START_MAX - FADE_OUT_START_MIN)
  }
}

const generateEmojiConfigs = (screenWidth: number): EmojiConfig[] => {
  const emojiPool = createEmojiPool()
  const getRandomPosition = createPositionGenerator(screenWidth)
  const positionsByEmojiType = new Map<string, number[]>()
  
  return emojiPool.map(emoji => 
    generateEmojiConfig(emoji, getRandomPosition, positionsByEmojiType)
  )
}

export const ClapCelebration: FC<ClapCelebrationProps> = ({ trigger }) => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions()
  const bottomPosition = screenHeight * BOTTOM_POSITION_RATIO
  
  const emojiConfigs = useMemo(() => {
    if (!trigger) return []
    return generateEmojiConfigs(screenWidth)
  }, [trigger, screenWidth])
  
  if (!trigger || emojiConfigs.length === 0) {
    return null
  }

  return (
    <CelebrationContainer bottomPosition={bottomPosition}>
      {emojiConfigs.map((config, index) => (
        <AnimatedClapEmoji key={index} config={config} />
      ))}
    </CelebrationContainer>
  )
}

interface AnimatedClapEmojiProps {
  config: EmojiConfig
}

const AnimatedClapEmoji: FC<AnimatedClapEmojiProps> = ({ config }) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const animationProgress = useSharedValue(0)

  useEffect(() => {
    animationProgress.value = 0
    translateX.value = 0
    translateY.value = config.startY

    animationProgress.value = withDelay(
      config.delay,
      withTiming(1, { duration: ANIMATION_DURATION, easing: EASE_OUT })
    )

    translateX.value = withDelay(
      config.delay,
      withTiming(config.translateX, { duration: ANIMATION_DURATION, easing: EASE_OUT })
    )

    translateY.value = withDelay(
      config.delay,
      withTiming(config.translateY, { duration: ANIMATION_DURATION, easing: EASE_OUT })
    )
  }, [config, animationProgress, translateX, translateY])

  const animatedStyle = useAnimatedStyle(() => {
    const fadeInEnd = FADE_IN_DURATION / ANIMATION_DURATION
    const opacity = interpolate(
      animationProgress.value,
      [0, fadeInEnd, config.fadeOutStart, 1],
      [0, 1, 1, 0],
      'clamp'
    )
    
    return {
      position: 'absolute',
      bottom: 0,
      left: `${config.startLeft - EMOJI_CENTER_OFFSET_PERCENT}%`,
      opacity,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    }
  })

  return (
    <Animated.View style={animatedStyle}>
      <ClapEmoji>{config.emoji}</ClapEmoji>
    </Animated.View>
  )
}
