import { Button3D } from '@/sharedComponents/Button3D'
import * as React from 'react'
import {
  GridSelectionContainer,
  GridSelectionContent,
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
  return (
    <GridSelectionContainer testID={testID}>
      {options.map((option) => {
        const isSelected = selectedOption === option
        const displayLabel = getDisplayLabel ? getDisplayLabel(option) : option

        return (
          <Button3D
            key={option}
            onPress={() => onSelect(option)}
            testID={isSelected ? `selected-${option}` : `option-${option}`}
            color={isSelected ? 'blue' : 'grey'}
            layoutType="grid"
          >
            {() => (
              <GridSelectionContent>
                {renderIcon && renderIcon(option, isSelected)}
                <GridSelectionText>{displayLabel}</GridSelectionText>
              </GridSelectionContent>
            )}
          </Button3D>
        )
      })}
    </GridSelectionContainer>
  )
}

