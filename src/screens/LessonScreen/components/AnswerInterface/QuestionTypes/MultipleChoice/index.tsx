import React from 'react'
import { ChoiceRow, ChoicesContainer } from './MultipleChoice.styles'
import { ChoiceButton } from './components'

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
  // Group choices into rows of 2
  const createRows = () => {
    const rows = []
    for (let i = 0; i < choices.length; i += 2) {
      rows.push(choices.slice(i, i + 2))
    }
    return rows
  }

  const rows = createRows()

  return (
    <ChoicesContainer>
      {rows.map((row, rowIndex) => (
        <ChoiceRow key={rowIndex} isLastRow={rowIndex === rows.length - 1}>
          {row.map((choice, colIndex) => {
            const index = rowIndex * 2 + colIndex
            const isSelected = selectedAnswer === choice
            const isCorrect = choice === correctAnswer
            const isIncorrect = isSelected && choice !== correctAnswer && showResult
            const isLastInRow = colIndex === row.length - 1
            
            return (
              <ChoiceButton
                key={index}
                choice={choice}
                isSelected={isSelected}
                isCorrect={isCorrect}
                isIncorrect={isIncorrect}
                showResult={showResult}
                onPress={() => onChoiceSelect(choice)}
                disabled={selectedAnswer !== null}
                isLastInRow={isLastInRow}
              />
            )
          })}
        </ChoiceRow>
      ))}
    </ChoicesContainer>
  )
}
