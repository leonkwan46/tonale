import { useWindowDimensions } from '@/hooks'
import { Depth3D } from '@/compLib/Depth3D'
import { Typography, type TypographySize } from '@/compLib/Typography'
import { useMemo, useState } from 'react'
import {
  GAP_SIZE,
  GridSelectionContainer,
  GridSelectionContent
} from './GridSelection.styles'

interface GridSelectionProps<T extends string> {
  options: T[];
  selectedOption: T | null;
  onSelect: (option: T) => void;
  testID?: string;
  getDisplayLabel?: (option: T) => string;
  renderIcon?: (option: T, isSelected: boolean) => React.ReactElement | null;
  columns?: number;
  labelSize?: TypographySize;
  labelMinimumScale?: number;
}

const DEFAULT_COLUMNS = 2

export const GridSelection = <T extends string>({
  options,
  selectedOption,
  onSelect,
  testID,
  getDisplayLabel,
  renderIcon,
  columns = DEFAULT_COLUMNS,
  labelSize = 'sm',
  labelMinimumScale = 0.65
}: GridSelectionProps<T>): React.ReactElement => {
  const { width: screenWidth } = useWindowDimensions()
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  const isSingleColumn = columns === 1

  const buttonWidth = useMemo(() => {
    if (isSingleColumn) {
      return undefined
    }

    const baseWidth = containerWidth ?? screenWidth
    if (!baseWidth) {
      return 0
    }

    const totalGaps = GAP_SIZE * (columns - 1)
    const availableWidth = baseWidth - totalGaps
    return availableWidth / columns
  }, [containerWidth, screenWidth, columns, isSingleColumn])

  return (
    <GridSelectionContainer
      testID={testID}
      onLayout={(event) => {
        const width = event.nativeEvent.layout.width
        if (width && width !== containerWidth) {
          setContainerWidth(width)
        }
      }}
    >
      {options.map((option) => {
        const isSelected = selectedOption === option
        const displayLabel = getDisplayLabel ? getDisplayLabel(option) : option

        return (
          <Depth3D
            key={option}
            onPress={() => onSelect(option)}
            testID={isSelected ? `selected-${option}` : `option-${option}`}
            color={isSelected ? 'blue' : 'grey'}
            layoutType="grid"
            width={isSingleColumn ? undefined : buttonWidth}
            fullWidth={isSingleColumn}
          >
            {() => (
              <GridSelectionContent>
                {renderIcon && renderIcon(option, isSelected)}
                <Typography
                  size={labelSize}
                  weight="semibold"
                  align="center"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={labelMinimumScale}
                  style={{ width: '100%' }}
                >
                  {displayLabel}
                </Typography>
              </GridSelectionContent>
            )}
          </Depth3D>
        )
      })}
    </GridSelectionContainer>
  )
}
