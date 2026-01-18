import { useTheme } from '@emotion/react'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { AnimatedFlame } from '../AnimatedFlame'
import {
    DayLabel,
    FlameIconContainer,
    StrikeBarCard,
    StrikeBarCardContainer,
    StrikeBarCardDepth
} from '../StrikeBar.styles'
import { getFlameColor } from './getFlameColor'

interface StrikeCardProps {
  day: number
  currentDay: number
  index: number
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
