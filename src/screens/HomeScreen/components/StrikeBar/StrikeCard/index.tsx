import { Card } from '@/compLib/Card'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { AnimatedFlame } from '../AnimatedFlame'
import { DayLabel, FlameIconContainer } from '../StrikeBar.styles'
import {
    getStrikeCardWidth,
    STRIKE_CARD_HEIGHT,
    StrikeBarCardContainer,
    useStrikeCardThemeProps
} from './StrikeCard.styles'

interface StrikeCardProps {
  day: number;
  currentDay: number;
  index: number;
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
  const { isCompleted, isActive, isEmpty } = getCardState(day, currentDay)
  const { flame, cardColors } = useStrikeCardThemeProps(day, currentDay, isEmpty, isActive)

  return (
    <StrikeBarCardContainer key={`${day}-${index}`}>
      <Card
        enable3D={true}
        width={getStrikeCardWidth()}
        height={STRIKE_CARD_HEIGHT}
        backgroundColor={cardColors.backgroundColor}
        depthColor={cardColors.depthColor}
        borderWidth={cardColors.borderWidth}
        borderColor={cardColors.borderColor}
      >
        {!isEmpty && (
          <>
            <DayLabel size="sm" weight="semibold">
              DAY {day}
            </DayLabel>
            <FlameIconContainer>
              <AnimatedFlame
                color={flame.color}
                opacity={flame.opacity}
                size={scale(28)}
                isActive={isActive || isCompleted}
              />
            </FlameIconContainer>
          </>
        )}
      </Card>
    </StrikeBarCardContainer>
  )
}
