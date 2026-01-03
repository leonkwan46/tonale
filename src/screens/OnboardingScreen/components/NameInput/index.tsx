import * as React from 'react'
import { SectionContainer, SectionTitle, NameInputField } from './NameInput.styles'

interface NameInputProps {
  name: string
  onNameChange: (name: string) => void
  isTablet: boolean
}

const NameInputComponent: React.FC<NameInputProps> = ({
  name,
  onNameChange,
  isTablet
}) => {
  return (
    <SectionContainer isTablet={isTablet}>
      <SectionTitle isTablet={isTablet}>Name</SectionTitle>
      <NameInputField
        isTablet={isTablet}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        keyboardType="default"
        value={name}
        onChangeText={onNameChange}
        autoCapitalize="words"
        testID="name-input"
      />
    </SectionContainer>
  )
}

export const NameInput = React.memo(NameInputComponent)

