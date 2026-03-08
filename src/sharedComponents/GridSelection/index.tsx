import { useWindowDimensions } from '@/hooks'
import { Button3D } from '@/sharedComponents/Button3D'
import { useTheme } from '@emotion/react'
import * as React from 'react'
import { useMemo } from 'react'
import { scale } from 'react-native-size-matters'
import {
  GAP_SIZE,
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
  columns?: number
}

const DEFAULT_COLUMNS = 2

export const GridSelection = <T extends string>({
  options,
  selectedOption,
  onSelect,
  testID,
  getDisplayLabel,
  renderIcon,
  columns = DEFAULT_COLUMNS
}: GridSelectionProps<T>): React.ReactElement => {
  const theme = useTheme()
  const { width: screenWidth } = useWindowDimensions()
  
  const buttonWidth = useMemo(() => {
    const containerPadding = theme.device.isTablet ? scale(8) * 2 : scale(10) * 2
    const availableWidth = screenWidth - containerPadding
    // Account for gaps between columns: (columns - 1) gaps
    const totalGaps = GAP_SIZE * (columns - 1)
    return (availableWidth - totalGaps) / columns
  }, [screenWidth, theme.device.isTablet, columns])

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
            width={buttonWidth}
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

