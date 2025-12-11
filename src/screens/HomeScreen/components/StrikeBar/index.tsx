import React from 'react'
import { StrikeBarContainer } from './StrikeBar.styles'
import { StrikeCard } from './StrikeCard'
import { useStreak } from './useStreak'

const DAYS_TO_DISPLAY = 5
const CENTER_OFFSET = 2

export const StrikeBar: React.FC = () => {
  const currentDay = useStreak()

  const getDisplayDays = (): number[] => {
    return Array.from({ length: DAYS_TO_DISPLAY }, (_, i) => currentDay - CENTER_OFFSET + i)
  }

  return (
    <StrikeBarContainer>
      {getDisplayDays().map((day, index) => (
        <StrikeCard
          key={`${day}-${index}`}
          day={day}
          currentDay={currentDay}
          index={index}
        />
      ))}
    </StrikeBarContainer>
  )
}

