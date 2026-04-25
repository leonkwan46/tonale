import { InputField } from '@/compLib/InputField'
import { memo } from 'react'
import { SectionContainer, SectionSubtitle, SectionTitle, TitleGroup } from './NameInput.styles'

interface NameInputProps {
  name: string
  onNameChange: (name: string) => void
}

const NameInputComponent = ({
  name,
  onNameChange
}: NameInputProps) => {
  const validateName = (text: string): string => {
    return text.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ'\- ]/g, '')
  }

  const handleNameChange = (text: string) => {
    const cleanedText = validateName(text)
    onNameChange(cleanedText)
  }

  return (
    <SectionContainer>
      <TitleGroup>
        <SectionTitle size="md" weight="semibold">
          Name
        </SectionTitle>
        <SectionSubtitle size="sm">
          What should we call you?
        </SectionSubtitle>
      </TitleGroup>
      <InputField
        placeholder="Enter your name"
        keyboardType="default"
        value={name}
        onChangeText={handleNameChange}
        autoCapitalize="words"
        maxLength={30}
        returnKeyType="done"
        testID="name-input"
      />
    </SectionContainer>
  )
}

export const NameInput = memo(NameInputComponent)

