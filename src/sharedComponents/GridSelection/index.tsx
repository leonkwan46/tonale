import * as React from 'react'
import { useState } from 'react'
import {
  GridSelectionCard,
  GridSelectionCardContainer,
  GridSelectionCardDepth,
  GridSelectionContainer,
  GridSelectionText
} from './GridSelection.styles'

interface GridSelectionProps<T extends string> {
  options: T[]
  selectedOption: T | null
  onSelect: (option: T) => void
  testID?: string
  getDisplayLabel?: (option: T) => string
  renderIcon?: (option: T, isSelected: boolean) => React.ReactElement | null
}

export const GridSelection = <T extends string>({
  options,
  selectedOption,
  onSelect,
  testID,
  getDisplayLabel,
  renderIcon
}: GridSelectionProps<T>): React.ReactElement => {
  const [pressedIndex, setPressedIndex] = useState<number | null>(null)

  const handlePressIn = (index: number) => {
    setPressedIndex(index)
  }

  const handlePressOut = () => {
    setPressedIndex(null)
  }

  const handlePress = (option: T) => {
    onSelect(option)
  }

  return (
    <GridSelectionContainer testID={testID}>
      {options.map((option, index) => {
        const isSelected = selectedOption === option
        const isPressed = pressedIndex === index
        const displayLabel = getDisplayLabel ? getDisplayLabel(option) : option

        return (
          <GridSelectionCardContainer 
            key={option}
            style={{
              transform: [{ scale: isPressed ? 0.9 : 1 }]
            }}
          >
            <GridSelectionCardDepth isSelected={isSelected} />
            <GridSelectionCard
              isSelected={isSelected}
              onPress={() => handlePress(option)}
              onPressIn={() => handlePressIn(index)}
              onPressOut={handlePressOut}
              activeOpacity={1}
              testID={isSelected ? `selected-${option}` : `option-${option}`}
            >
              {renderIcon && renderIcon(option, isSelected)}
              <GridSelectionText>{displayLabel}</GridSelectionText>
            </GridSelectionCard>
          </GridSelectionCardContainer>
        )
      })}
    </GridSelectionContainer>
  )
}

