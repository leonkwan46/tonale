import { useDevice } from '@/hooks'
import * as React from 'react'
import { useState } from 'react'
import { ChoiceText, NodeContainer, NodeContentContainer, NodeDepth } from './ChoiceButton.styles'

export type LayoutType = 'grid' | 'row'

interface ChoiceButtonProps {
  choice: string
  isSelected: boolean
  isCorrect: boolean
  isIncorrect: boolean
  showResult: boolean
  onPress: () => void
  disabled?: boolean
  isLastInRow: boolean
  layoutType: LayoutType
  isNoteIdentification?: boolean
  testID?: string
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  isSelected,
  isCorrect,
  isIncorrect,
  showResult,
  onPress,
  disabled = false,
  isLastInRow,
  layoutType,
  isNoteIdentification = false,
  testID
}) => {
  const { isTablet } = useDevice()
  const [isPressed, setIsPressed] = useState(false)

  const getButtonState = () => {
    if (showResult) {
      if (isCorrect) return 'correct'
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
      layoutType={layoutType}
      isNoteIdentification={isNoteIdentification}
      isTablet={isTablet}
    >
      <NodeDepth 
        buttonState={buttonState} 
        isTablet={isTablet}
        layoutType={layoutType}
        isNoteIdentification={isNoteIdentification}
      />
      <NodeContentContainer 
        buttonState={buttonState} 
        isTablet={isTablet}
        layoutType={layoutType}
        isNoteIdentification={isNoteIdentification}
      >
        <ChoiceText 
          buttonState={buttonState}
          isTablet={isTablet}
          layoutType={layoutType}
          isNoteIdentification={isNoteIdentification}
        >
          {choice}
        </ChoiceText>
      </NodeContentContainer>
    </NodeContainer>
  )
}

