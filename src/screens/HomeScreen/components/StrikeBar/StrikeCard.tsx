import React from 'react'
import { scale } from 'react-native-size-matters'
import { AnimatedFlame } from './AnimatedFlame'
import {
    DayLabel,
    FlameIconContainer,
    StrikeBarCard,
    StrikeBarCardContainer,
    StrikeBarCardDepth
} from './StrikeBar.styles'

interface StrikeCardProps {
  day: number
  currentDay: number
  index: number
}

const hexToRgba = (hex: string, alpha: number): string => {
  if (!hex.startsWith('#')) return hex
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
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

const getFlameIconColor = (day: number, currentDay: number): string => {
  const FLAME_COLOR_ACTIVE = '#FF6B35'
  const FLAME_COLOR_UPCOMING = '#FF8C42'
  const FLAME_COLOR_EMPTY = '#FFA07A'

  if (day <= 0) {
    return hexToRgba(FLAME_COLOR_EMPTY, 0.2)
  }
  if (day <= currentDay) {
    return FLAME_COLOR_ACTIVE
  }
  return hexToRgba(FLAME_COLOR_UPCOMING, 0.4)
}

export const StrikeCard = ({ day, currentDay, index }: StrikeCardProps) => {
  const { isCompleted, isActive, isEmpty } = getCardState(day, currentDay)
  const iconColor = getFlameIconColor(day, currentDay)

  return (
    <StrikeBarCardContainer key={`${day}-${index}`}>
      <StrikeBarCardDepth
        isActive={isActive}
        isCompleted={isCompleted}
        isEmpty={isEmpty}
      />
      <StrikeBarCard
        isActive={isActive}
        isCompleted={isCompleted}
        isEmpty={isEmpty}
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
      </StrikeBarCard>
    </StrikeBarCardContainer>
  )
}

