import React from 'react'
import { ChoiceButton, ChoiceText, ChoicesContainer } from './MultipleChoice.styles'

interface MultipleChoiceProps {
  choices: string[]
  correctAnswer: string
  selectedAnswer: string | null
  showResult: boolean
  showCorrectAnswer: boolean
  onChoiceSelect: (choice: string) => void
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  choices,
  correctAnswer,
  selectedAnswer,
  showResult,
  showCorrectAnswer,
  onChoiceSelect
}) => {
  const getChoiceStyle = (choice: string) => {
    // If showing correct answer after wrong selection, highlight correct answer
    if (showCorrectAnswer && choice === correctAnswer) {
      return {
        backgroundColor: '#34C759',
        borderColor: '#34C759'
      }
    }
    
    if (!showResult || selectedAnswer !== choice) {
      return {
        backgroundColor: selectedAnswer === choice ? '#007AFF' : '#F2F2F7',
        borderColor: selectedAnswer === choice ? '#007AFF' : '#E5E5EA'
      }
    }
    
    // Show result styling
    if (choice === correctAnswer) {
      return {
        backgroundColor: '#34C759',
        borderColor: '#34C759'
      }
    }
    
    if (selectedAnswer === choice && choice !== correctAnswer) {
      return {
        backgroundColor: '#FF3B30',
        borderColor: '#FF3B30'
      }
    }
    
    return {
      backgroundColor: '#F2F2F7',
      borderColor: '#E5E5EA'
    }
  }

  const getTextColor = (choice: string) => {
    // If showing correct answer after wrong selection, make correct answer text white
    if (showCorrectAnswer && choice === correctAnswer) {
      return '#FFFFFF'
    }
    
    if (!showResult || selectedAnswer !== choice) {
      return selectedAnswer === choice ? '#FFFFFF' : '#000000'
    }
    
    return '#FFFFFF'
  }

  return (
    <ChoicesContainer>
      {choices.map((choice, index) => {
        const style = getChoiceStyle(choice)
        return (
          <ChoiceButton
            key={index}
            backgroundColor={style.backgroundColor}
            borderColor={style.borderColor}
            onPress={() => onChoiceSelect(choice)}
            disabled={selectedAnswer !== null}
          >
            <ChoiceText color={getTextColor(choice)}>
              {choice}
            </ChoiceText>
          </ChoiceButton>
        )
      })}
    </ChoicesContainer>
  )
}
