import * as React from 'react'
import { GridSelection } from '@/sharedComponents/GridSelection'
import { useTheme } from '@emotion/react'
import { INSTRUMENT, type UserInstrument } from '@types'
import { renderInstrumentIcon } from '../OnboardingIcons'
import { SectionContainer, SectionTitle } from './InstrumentSelection.styles'

const INSTRUMENT_OPTIONS: UserInstrument[] = [
  INSTRUMENT.PIANO,
  INSTRUMENT.GUITAR,
  INSTRUMENT.VIOLIN,
  INSTRUMENT.VOCAL,
  INSTRUMENT.OTHER
]

const getDisplayLabel = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

interface InstrumentSelectionProps {
  selectedInstrument: UserInstrument | null
  onSelect: (instrument: UserInstrument) => void
}

const InstrumentSelectionComponent: React.FC<InstrumentSelectionProps> = ({
  selectedInstrument,
  onSelect
}) => {
  const theme = useTheme()

  return (
    <SectionContainer>
      <SectionTitle>Instrument</SectionTitle>
      <GridSelection
        options={INSTRUMENT_OPTIONS}
        selectedOption={selectedInstrument}
        onSelect={onSelect}
        getDisplayLabel={getDisplayLabel}
        renderIcon={(option, isSelected) => renderInstrumentIcon(option as UserInstrument, theme)}
        testID="instrument-selection"
      />
    </SectionContainer>
  )
}

export const InstrumentSelection = React.memo(InstrumentSelectionComponent)

