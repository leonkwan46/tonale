import { useDevice } from '@/hooks'
import React from 'react'
import { ChoiceText, NodeContainer, NodeContentContainer, NodeDepth } from './ChoiceButton.styles'

interface ChoiceButtonProps {
  choice: string
  isSelected: boolean
  isCorrect: boolean
  isIncorrect: boolean
  showResult: boolean
  onPress: () => void
  disabled?: boolean
  isLastInRow: boolean
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  isSelected,
  isCorrect,
  isIncorrect,
  showResult,
  onPress,
  disabled = false,
  isLastInRow
}) => {
  const { isTablet } = useDevice()

  const getButtonState = () => {
    if (showResult) {
      if (isCorrect) return 'correct'
      if (isIncorrect) return 'incorrect'
      return 'neutral'
    }
    return isSelected ? 'selected' : 'default'
  }

  const buttonState = getButtonState()

  return (
    <NodeContainer 
      isPressed={isSelected && !showResult}
      onPress={onPress}
      disabled={disabled}
      isLastInRow={isLastInRow}
    >
      <NodeDepth 
        buttonState={buttonState} 
        isTablet={isTablet}
      />
      <NodeContentContainer 
        buttonState={buttonState} 
        isTablet={isTablet}
      >
        <ChoiceText 
          buttonState={buttonState}
          isTablet={isTablet}
        >
          {choice}
        </ChoiceText>
      </NodeContentContainer>
    </NodeContainer>
  )
}

