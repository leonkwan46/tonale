import { InputField } from '@/compLib/InputField'
import { memo } from 'react'
import { SectionContainer, SectionTitle } from './NameInput.styles'

interface NameInputProps {
  name: string
  onNameChange: (name: string) => void
}

const NameInputComponent = ({
  name,
  onNameChange
}: NameInputProps) => {
  const validateName = (text: string): string => {
    return text.replace(/[^a-zA-Z-]/g, '')
  }

  const handleNameChange = (text: string) => {
    const cleanedText = validateName(text)
    onNameChange(cleanedText)
  }

  return (
    <SectionContainer>
      <SectionTitle>Name</SectionTitle>
      <InputField
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

export const NameInput = memo(NameInputComponent)

