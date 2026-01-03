import { Easing } from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

export const EMOJI_COUNTS = {
  '👏': 4,
  '🎉': 4,
  '❤️': 4,
  '💐': 4
} as const

export type EmojiType = keyof typeof EMOJI_COUNTS
export const EMOJI_TYPES = Object.keys(EMOJI_COUNTS) as EmojiType[]
export const ANIMATION_DURATION = 1200
export const EASE_OUT = Easing.out(Easing.ease)

export const FADE_IN_DURATION = 100
export const FADE_OUT_START_MIN = 0.4
export const FADE_OUT_START_MAX = 0.7

export const HORIZONTAL_SPREAD = scale(50)
export const VERTICAL_DISTANCE_MIN = scale(150)
export const VERTICAL_DISTANCE_RANGE = scale(100)
export const DELAY_RANGE = 300
export const MIN_SPACING_PERCENT = 8
export const START_Y_RANDOM_RANGE = scale(30)

export const EDGE_PADDING = scale(20)
export const CENTER_AVOIDANCE_PERCENT = 35
export const POSITION_GENERATION_MAX_ATTEMPTS = 10
export const BOTTOM_POSITION_RATIO = 0.025

// Emoji centering offset: When using left: X%, the left edge is positioned at X%.
// To center the emoji at that position, we subtract approximately half the emoji width.
// Emoji fontSize is scale(32) ≈ 30px, half is ~15px ≈ 4-5% of screen width on average
export const EMOJI_CENTER_OFFSET_PERCENT = 5

