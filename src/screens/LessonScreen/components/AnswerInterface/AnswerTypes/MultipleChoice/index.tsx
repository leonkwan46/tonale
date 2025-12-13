import * as React from 'react'
import { ChoiceButton, LayoutType } from './ChoiceButton'
import { ChoiceRow, ChoicesContainer } from './MultipleChoice.styles'

interface MultipleChoiceProps {
  choices: string[]
  correctAnswer: string
  selectedAnswer: string | null
  showResult: boolean
  showCorrectAnswer: boolean
  onChoiceSelect: (choice: string) => void
  type?: LayoutType
  isNoteIdentification?: boolean
  testID?: string
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  choices,
  correctAnswer,
  selectedAnswer,
  showResult,
  showCorrectAnswer,
  onChoiceSelect,
  type = 'grid',
  isNoteIdentification = false,
  testID
}) => {
  // Group choices into rows based on type
  const createRows = () => {
    if (type === 'row') {
      // For row layout, put each choice in its own row
      return choices.map(choice => [choice])
    } else {
      // For grid layout, group choices into rows of 2
      const rows = []
      for (let i = 0; i < choices.length; i += 2) {
        rows.push(choices.slice(i, i + 2))
      }
      return rows
    }
  }

  const rows = createRows()

  return (
    <ChoicesContainer testID={testID}>
      {rows.map((row, rowIndex) => (
        <ChoiceRow key={rowIndex} isLastRow={rowIndex === rows.length - 1} type={type}>
          {row.map((choice, colIndex) => {
            const index = rowIndex * (type === 'row' ? 1 : 2) + colIndex
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
                layoutType={type}
                isNoteIdentification={isNoteIdentification}
                testID={isCorrect ? `correct-choice-${choice}` : `choice-${choice}`}
              />
            )
          })}
        </ChoiceRow>
      ))}
    </ChoicesContainer>
  )
}
