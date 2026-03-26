import type { AppTheme } from '@/config/theme/theme'
import styled from '@emotion/native'
import { Dimensions, View } from 'react-native'
import { scale } from 'react-native-size-matters'

type StrikeCardColorState = {
  isEmpty: boolean
  isActive: boolean
}

type StrikeCardFlameProps = {
  color: string
  opacity: number
}

const CARD_COUNT = 5
const CONTENT_PADDING = scale(10) * 2
const GAP_SIZE = scale(8)
const GAPS_TOTAL = GAP_SIZE * (CARD_COUNT - 1)

const screenWidth = Dimensions.get('window').width

export const STRIKE_CARD_HEIGHT = scale(80)

export const getStrikeCardWidth = (): number => {
  const availableWidth = screenWidth - CONTENT_PADDING - GAPS_TOTAL
  return availableWidth / CARD_COUNT
}

export const getStrikeCardColors = (
  theme: AppTheme,
  { isEmpty, isActive }: StrikeCardColorState
) => {
  const backgroundColor = isEmpty ? 'transparent' : theme.components.flame.cardFill
  const depthColor = isEmpty
    ? 'transparent'
    : isActive
      ? theme.components.flame.activeDepth
      : theme.components.flame.cardDepth
  const borderWidth = isActive ? scale(2) : 0
  const borderColor = isActive ? theme.components.flame.active : 'transparent'

  return {
    backgroundColor,
    depthColor,
    borderWidth,
    borderColor
  }
}

export const getStrikeCardFlameProps = (
  day: number,
  currentDay: number,
  theme: AppTheme
): StrikeCardFlameProps => {
  if (day <= 0) {
    return { color: theme.components.flame.empty, opacity: 0.2 }
  }
  if (day <= currentDay) {
    return { color: theme.components.flame.active, opacity: 1 }
  }
  return { color: theme.components.flame.upcoming, opacity: 0.4 }
}

export const StrikeBarCardContainer = styled(View)({
  position: 'relative'
})
