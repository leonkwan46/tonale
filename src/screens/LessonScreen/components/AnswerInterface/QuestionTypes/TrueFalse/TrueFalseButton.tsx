import { useDevice } from '@/hooks'
import * as React from 'react'
import { useState } from 'react'
import { ChoiceText, NodeContainer, NodeContentContainer, NodeDepth } from './TrueFalseButton.styles'

interface TrueFalseButtonProps {
  choice: 'True' | 'False'
  isSelected: boolean
  isCorrect: boolean
  isIncorrect: boolean
  showResult: boolean
  shouldShowNeutral?: boolean
  onPress: () => void
  disabled?: boolean
  isLastInRow: boolean
  testID?: string
}

export const TrueFalseButton = ({
  choice,
  isSelected,
  isCorrect,
  isIncorrect,
  showResult,
  shouldShowNeutral = false,
  onPress,
  disabled = false,
  isLastInRow,
  testID
}: TrueFalseButtonProps) => {
  const { isTablet } = useDevice()
  const [isPressed, setIsPressed] = useState(false)

  const getButtonState = () => {
    if (showResult) {
      if (isCorrect) return 'correct'
      // Gray out wrong choice when showing result
      if (shouldShowNeutral) return 'neutral'
      if (isIncorrect) return 'incorrect'
      return 'neutral'
    }
    return isSelected ? 'selected' : 'default'
  }

  const buttonState = getButtonState()

  const handlePressIn = () => {
    if (!disabled) {
      setIsPressed(true)
    }
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const handlePress = () => {
    if (!disabled) {
      onPress()
    }
  }

  return (
    <NodeContainer 
      testID={testID || `choice-${choice}`}
      isPressed={isPressed}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      isLastInRow={isLastInRow}
      isTablet={isTablet}
      choice={choice}
    >
      <NodeDepth 
        buttonState={buttonState} 
        isTablet={isTablet}
        choice={choice}
      />
      <NodeContentContainer 
        buttonState={buttonState} 
        isTablet={isTablet}
        choice={choice}
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

