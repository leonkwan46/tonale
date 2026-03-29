import { GridSelection } from '@/compLib/GridSelection'
import { InputField } from '@/compLib/InputField'
import { useTheme } from '@emotion/react'
import { INSTRUMENT, type UserInstrument } from '@types'
import { capitalize } from '@/utils/string'
import * as React from 'react'
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
  return capitalize(value)
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
        <InputField
          variant="primary"
          placeholder="Enter your instrument"
          keyboardType="default"
          value={customInstrument}
          onChangeText={onCustomInstrumentChange}
          autoCapitalize="words"
          testID="custom-instrument-input"
          onLayout={() => {
            if (!customInstrument && onScrollToBottom) {
              setTimeout(() => {
                onScrollToBottom()
              }, 100)
            }
          }}
        />
      )}
    </SectionContainer>
  )
}

export const InstrumentSelection = React.memo(InstrumentSelectionComponent)

