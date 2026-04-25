import { GridSelection } from '@/compLib/GridSelection'
import { InputField } from '@/compLib/InputField'
import { INSTRUMENT, type UserInstrument } from '@types'
import { capitalize } from '@/utils/string'
import { memo } from 'react'
import { renderInstrumentIcon } from '../OnboardingIcons'
import { SectionContainer, SectionSubtitle, SectionTitle, TitleGroup, useTextColor } from './InstrumentSelection.styles'

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
  const iconColor = useTextColor()

  const handleSelect = (instrument: UserInstrument) => {
    onSelect(instrument)
  }

  return (
    <SectionContainer>
      <TitleGroup>
        <SectionTitle size="md" weight="semibold">
          Instrument
        </SectionTitle>
        <SectionSubtitle size="sm">
          What do you play?
        </SectionSubtitle>
      </TitleGroup>
      <GridSelection
        options={INSTRUMENT_OPTIONS}
        selectedOption={selectedInstrument}
        onSelect={handleSelect}
        getDisplayLabel={getDisplayLabel}
        renderIcon={(option, isSelected) => renderInstrumentIcon(option as UserInstrument, iconColor)}
        testID="instrument-selection"
      />
      {selectedInstrument === INSTRUMENT.OTHER && (
        <InputField
          placeholder="Enter your instrument"
          keyboardType="default"
          value={customInstrument}
          onChangeText={onCustomInstrumentChange}
          autoCapitalize="words"
          testID="custom-instrument-input"
          onLayout={() => {
            if (!customInstrument && onScrollToBottom) {
              onScrollToBottom()
            }
          }}
        />
      )}
    </SectionContainer>
  )
}

export const InstrumentSelection = memo(InstrumentSelectionComponent)

