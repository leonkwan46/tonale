import * as React from 'react'
import { NameInputField, SectionContainer, SectionTitle } from './NameInput.styles'

interface NameInputProps {
  name: string
  onNameChange: (name: string) => void
  isTablet: boolean
}

const NameInputComponent = ({
  name,
  onNameChange,
  isTablet
}: NameInputProps) => {
  const validateName = (text: string): string => {
    // Remove all spaces and special characters, keep only letters (a-z, A-Z) and hyphens (-)
    return text.replace(/[^a-zA-Z-]/g, '')
  }

  const handleNameChange = (text: string) => {
    const cleanedText = validateName(text)
    onNameChange(cleanedText)
  }

  return (
    <SectionContainer isTablet={isTablet}>
      <SectionTitle isTablet={isTablet}>Name</SectionTitle>
      <NameInputField
        isTablet={isTablet}
        placeholder="Enter your name"
        keyboardType="default"
        value={name}
        onChangeText={handleNameChange}
        autoCapitalize="words"
        testID="name-input"
      />
    </SectionContainer>
  )
}

export const NameInput = React.memo(NameInputComponent)

