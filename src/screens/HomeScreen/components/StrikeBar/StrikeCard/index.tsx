import { Card3DView } from '@/sharedComponents/Card3DView'
import { useTheme } from '@emotion/react'
import React from 'react'
import { Dimensions } from 'react-native'
import { scale } from 'react-native-size-matters'
import { AnimatedFlame } from '../AnimatedFlame'
import {
  DayLabel,
  FlameIconContainer,
  StrikeBarCardContainer
} from '../StrikeBar.styles'
import { getFlameColor } from './getFlameColor'

interface StrikeCardProps {
  day: number
  currentDay: number
  index: number
}

const screenWidth = Dimensions.get('window').width
const CARD_COUNT = 5
const CONTENT_PADDING = scale(10) * 2
const GAP_SIZE = scale(8)
const GAPS_TOTAL = GAP_SIZE * (CARD_COUNT - 1)
const CARD_HEIGHT = scale(80)

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

const getCardState = (day: number, currentDay: number) => {
  if (day <= 0) {
    return { isCompleted: false, isActive: false, isEmpty: true }
  }
  if (day < currentDay) {
    return { isCompleted: true, isActive: false, isEmpty: false }
  }
  if (day === currentDay) {
    return { isCompleted: false, isActive: true, isEmpty: false }
  }
  return { isCompleted: false, isActive: false, isEmpty: false }
}

export const StrikeCard = ({ day, currentDay, index }: StrikeCardProps) => {
  const theme = useTheme()
  const { isCompleted, isActive, isEmpty } = getCardState(day, currentDay)
  const iconColor = getFlameColor(day, currentDay, theme)
  const cardWidth = getCardWidth()
  const cardHeight = CARD_HEIGHT

  const getDepthColor = (): string => {
    if (isEmpty) return 'transparent'
    if (isActive) return darkenColor(theme.colors.flame.active, 0.2)
    return darkenColor(theme.colors.surface, 0.2)
  }

  const getCardColor = (): string => {
    if (isEmpty) return 'transparent'
    return theme.colors.surface
  }

  return (
    <StrikeBarCardContainer key={`${day}-${index}`}>
      <Card3DView
        customStyles={{
          width: cardWidth,
          height: cardHeight,
          backgroundColor: getCardColor(),
          depthColor: getDepthColor(),
          borderWidth: isActive ? scale(2) : 0,
          borderColor: isActive ? theme.colors.flame.active : 'transparent'
        }}
      >
        {!isEmpty && (
          <>
            <DayLabel>DAY {day}</DayLabel>
            <FlameIconContainer>
              <AnimatedFlame
                color={iconColor}
                size={scale(28)}
                isActive={isActive || isCompleted}
              />
            </FlameIconContainer>
          </>
        )}
      </Card3DView>
    </StrikeBarCardContainer>
  )
}
