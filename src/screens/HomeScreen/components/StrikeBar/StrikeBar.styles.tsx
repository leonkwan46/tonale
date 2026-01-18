import styled from '@emotion/native'
import type { Theme } from '@emotion/react'
import { Dimensions, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

const screenWidth = Dimensions.get('window').width
const CARD_COUNT = 5
const CONTENT_PADDING = scale(10) * 2
const GAP_SIZE = scale(8)
const GAPS_TOTAL = GAP_SIZE * (CARD_COUNT - 1)
const CARD_HEIGHT = scale(80)
const CARD_BORDER_RADIUS = scale(14)
const DEPTH_OFFSET = scale(3)
const MIN_CARD_WIDTH = scale(50)

const getCardWidth = (): number => {
  const availableWidth = screenWidth - CONTENT_PADDING - GAPS_TOTAL
  return availableWidth / CARD_COUNT
}

const darkenColor = (hex: string, factor: number = 0.3): string => {
  if (!hex.startsWith('#')) return hex
  
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  
  const darken = (value: number) => Math.max(0, Math.floor(value * (1 - factor)))
  const toHex = (value: number) => value.toString(16).padStart(2, '0')
  
  return `#${toHex(darken(r))}${toHex(darken(g))}${toHex(darken(b))}`
}

const getDepthColor = (
  theme: Theme,
  isActive: boolean,
  isCompleted: boolean,
  isEmpty: boolean
): string => {
  if (isEmpty) return 'transparent'
  if (isActive) return darkenColor(theme.colors.flame.active, 0.2)
  return darkenColor(theme.colors.surface, 0.2)
}

const getCardColor = (
  theme: Theme,
  isActive: boolean,
  isEmpty: boolean
): string => {
  if (isEmpty) return 'transparent'
  return theme.colors.surface
}

export const StrikeBarContainer = styled(View)({
  flexDirection: 'row',
  gap: GAP_SIZE,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  alignSelf: 'center'
})

export const StrikeBarCardContainer = styled(View)({
  position: 'relative'
})

export const StrikeBarCardDepth = styled(View)<{ 
  isActive: boolean
  isCompleted: boolean
  isEmpty: boolean
}>(({ theme, isActive, isCompleted, isEmpty }) => ({
  position: 'absolute',
  top: DEPTH_OFFSET,
  left: DEPTH_OFFSET,
  width: getCardWidth(),
  height: CARD_HEIGHT,
  borderRadius: CARD_BORDER_RADIUS,
  backgroundColor: getDepthColor(theme, isActive, isCompleted, isEmpty),
  minWidth: MIN_CARD_WIDTH
}))

export const StrikeBarCard = styled(View)<{ 
  isActive: boolean
  isCompleted: boolean
  isEmpty: boolean
}>(({ theme, isActive, isEmpty }) => ({
  width: getCardWidth(),
  height: CARD_HEIGHT,
  borderRadius: CARD_BORDER_RADIUS,
  backgroundColor: getCardColor(theme, isActive, isEmpty),
  borderWidth: isActive ? scale(2) : 0,
  borderColor: isActive ? theme.colors.flame.active : 'transparent',
  padding: scale(8),
  justifyContent: 'center',
  alignItems: 'center',
  gap: scale(8),
  minWidth: MIN_CARD_WIDTH,
  position: 'relative',
  zIndex: 1
}))

export const DayLabel = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.sm),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

export const FlameIconContainer = styled(View)({
  justifyContent: 'center',
  alignItems: 'center'
})

