import React, { useMemo } from 'react'
import { StrikeBarContainer } from './StrikeBar.styles'
import { StrikeCard } from './StrikeCard'
import { useStreak } from './useStreak'

const DAYS_TO_DISPLAY = 5
const CENTER_OFFSET = 2

export const StrikeBar = () => {
  const currentDay = useStreak()

  const displayDays = useMemo(
    () => Array.from({ length: DAYS_TO_DISPLAY }, (_, i) => currentDay - CENTER_OFFSET + i),
    [currentDay]
  )

  return (
    <StrikeBarContainer>
      {displayDays.map((day, index) => (
        <StrikeCard
          key={String(day)}
          day={day}
          currentDay={currentDay}
          index={index}
        />
      ))}
    </StrikeBarContainer>
  )
}

