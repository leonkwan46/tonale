import * as React from 'react'
import { ChoiceRow, ChoicesContainer } from './TrueFalse.styles'
import { TrueFalseButton } from './TrueFalseButton'

interface TrueFalseProps {
  choices: string[]
  correctAnswer: string
  selectedAnswer: string | null
  showResult: boolean
  showCorrectAnswer: boolean
  onChoiceSelect: (choice: string) => void
  testID?: string
}

export const TrueFalse = ({
  choices,
  correctAnswer,
  selectedAnswer,
  showResult,
  showCorrectAnswer,
  onChoiceSelect,
  testID
}: TrueFalseProps) => {
  // True/False should always have exactly 2 choices
  const trueFalseChoices = choices.slice(0, 2) as ('True' | 'False')[]

  return (
    <ChoicesContainer testID={testID}>
      <ChoiceRow isLastRow={true}>
        {trueFalseChoices.map((choice, index) => {
          const isSelected = selectedAnswer === choice
          const isCorrect = choice === correctAnswer
          const isIncorrect = isSelected && choice !== correctAnswer && showResult
          const isLastInRow = index === trueFalseChoices.length - 1
          // When showing result, gray out wrong choice (only correct answer shows color)
          const shouldShowNeutral = showResult && !isCorrect
          
          return (
            <TrueFalseButton
              key={choice}
              choice={choice}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isIncorrect={isIncorrect}
              showResult={showResult}
              shouldShowNeutral={shouldShowNeutral}
              onPress={() => onChoiceSelect(choice)}
              disabled={selectedAnswer !== null}
              isLastInRow={isLastInRow}
              testID={isCorrect ? `correct-choice-${choice}` : `choice-${choice}`}
            />
          )
        })}
      </ChoiceRow>
    </ChoicesContainer>
  )
}
