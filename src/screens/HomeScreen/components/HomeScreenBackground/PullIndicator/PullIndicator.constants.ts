import { scale } from 'react-native-size-matters'

export const PULL_THRESHOLD = scale(60)

export const OPACITY_INPUT_RANGE = [0, PULL_THRESHOLD * 0.3, PULL_THRESHOLD] as const
export const OPACITY_OUTPUT_RANGE = [0, 0.5, 1] as const

export const SCALE_INPUT_RANGE = [0, PULL_THRESHOLD] as const
export const SCALE_OUTPUT_RANGE = [0.6, 1.2] as const

export const ENCOURAGEMENT_MESSAGES = [
  'You\'re making yourself proud',
  'You\'re learning, and that\'s beautiful',
  'Be proud of yourself',
  'You\'re doing great',
  'Look at you go!',
  'Tiny win, big clap',
  'Clap for yourself!'
] as const
