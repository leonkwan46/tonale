import * as React from 'react'
import { CustomInstrumentInput as StyledInput, CustomInstrumentInputWrapper } from './CustomInstrumentInput.styles'

interface CustomInstrumentInputProps {
  value: string
  onChangeText: (text: string) => void
}

const CustomInstrumentInputComponent: React.FC<CustomInstrumentInputProps> = ({
  value,
  onChangeText
}) => {
  return (
    <CustomInstrumentInputWrapper>
      <StyledInput
        placeholder="Enter your instrument"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="words"
        testID="custom-instrument-input"
      />
    </CustomInstrumentInputWrapper>
  )
}

export const CustomInstrumentInput = React.memo(CustomInstrumentInputComponent)

