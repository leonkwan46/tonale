import styled from '@emotion/native'
import type { Theme } from '@emotion/react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

const screenWidth = Dimensions.get('window').width
const COLUMNS = 2
const CONTENT_PADDING = scale(32) * 2
const GAP_SIZE = scale(8)
const GAPS_TOTAL = GAP_SIZE * (COLUMNS - 1)
const CARD_HEIGHT = scale(80)
const CARD_BORDER_RADIUS = scale(14)
const DEPTH_OFFSET = scale(3)

const getCardWidth = (): number => {
  const availableWidth = screenWidth - CONTENT_PADDING - GAPS_TOTAL
  return availableWidth / COLUMNS
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
  isSelected: boolean
): string => {
  if (isSelected) {
    return darkenColor(theme.colors.primary, 0.2)
  }
  return darkenColor(theme.colors.surface, 0.2)
}

export const GridSelectionContainer = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: GAP_SIZE,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  alignSelf: 'center'
})

export const GridSelectionCardContainer = styled(View)<{ isPressed: boolean }>(({ isPressed }) => ({
  position: 'relative',
  transform: [{ scale: isPressed ? 0.9 : 1 }]
}))

export const GridSelectionCardDepth = styled(View)<{ 
  isSelected: boolean
}>(({ theme, isSelected }) => ({
  position: 'absolute',
  top: DEPTH_OFFSET,
  left: DEPTH_OFFSET,
  width: getCardWidth(),
  height: CARD_HEIGHT,
  borderRadius: CARD_BORDER_RADIUS,
  backgroundColor: getDepthColor(theme, isSelected)
}))

export const GridSelectionCard = styled(TouchableOpacity)<{ 
  isSelected: boolean
}>(({ theme, isSelected }) => ({
  width: getCardWidth(),
  height: CARD_HEIGHT,
  borderRadius: CARD_BORDER_RADIUS,
  backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
  padding: scale(8),
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: scale(8),
  position: 'relative',
  zIndex: 1
}))

export const GridSelectionText = styled.Text(({ theme }) => ({
  fontSize: scale(14),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold),
  textAlign: 'center'
}))

