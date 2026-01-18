import { GridSelection } from '@/sharedComponents/GridSelection'
import { useTheme } from '@emotion/react'
import { INSTRUMENT, type UserInstrument } from '@types'
import * as React from 'react'
import { renderInstrumentIcon } from '../OnboardingIcons'
import { CustomInstrumentInput, SectionContainer, SectionTitle } from './InstrumentSelection.styles'

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
  customInstrument: string
  onCustomInstrumentChange: (text: string) => void
  onScrollToBottom?: () => void
}

const InstrumentSelectionComponent = ({
  selectedInstrument,
  onSelect,
  customInstrument,
  onCustomInstrumentChange,
  onScrollToBottom
}: InstrumentSelectionProps) => {
  const theme = useTheme()

  const handleSelect = (instrument: UserInstrument) => {
    onSelect(instrument)
  }

  return (
    <SectionContainer>
      <SectionTitle>Instrument</SectionTitle>
      <GridSelection
        options={INSTRUMENT_OPTIONS}
        selectedOption={selectedInstrument}
        onSelect={handleSelect}
        getDisplayLabel={getDisplayLabel}
        renderIcon={(option, isSelected) => renderInstrumentIcon(option as UserInstrument, theme)}
        testID="instrument-selection"
      />
      {selectedInstrument === INSTRUMENT.OTHER && (
        <CustomInstrumentInput
          placeholder="Enter your instrument"
          keyboardType="default"
          value={customInstrument}
          onChangeText={onCustomInstrumentChange}
          onLayout={() => {
            if (!customInstrument && onScrollToBottom) {
              setTimeout(() => {
                onScrollToBottom()
              }, 100)
            }
          }}
          autoCapitalize="words"
          testID="custom-instrument-input"
        />
      )}
    </SectionContainer>
  )
}

export const InstrumentSelection = React.memo(InstrumentSelectionComponent)

