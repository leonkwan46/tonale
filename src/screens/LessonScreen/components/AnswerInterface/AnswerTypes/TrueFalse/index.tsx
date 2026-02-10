import { Button3D } from '@/sharedComponents/Button3D'
import type { ButtonColor } from '@/sharedComponents/Button3D/Button3D.styles'
import { ChoiceRow, ChoicesContainer, ChoiceText, TrueFalseButtonContainer } from './TrueFalse.styles'

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
  onChoiceSelect,
  testID
}: TrueFalseProps) => {
  const trueFalseChoices = choices.slice(0, 2) as ('True' | 'False')[]

  const getButtonColor = (choice: 'True' | 'False', isSelected: boolean, isCorrect: boolean, isIncorrect: boolean, shouldShowNeutral: boolean): ButtonColor => {
    if (showResult) {
      if (isCorrect) return 'green'
      if (shouldShowNeutral) return 'grey'
      if (isIncorrect) return 'red'
      return 'grey'
    }
    return isSelected ? 'red' : choice === 'True' ? 'green' : 'red'
  }

  return (
    <ChoicesContainer testID={testID}>
      <ChoiceRow isLastRow={true}>
        {trueFalseChoices.map((choice) => {
          const isSelected = selectedAnswer === choice
          const isCorrect = choice === correctAnswer
          const isIncorrect = isSelected && choice !== correctAnswer && showResult
          const shouldShowNeutral = showResult && !isCorrect
          const color = getButtonColor(choice, isSelected, isCorrect, isIncorrect, shouldShowNeutral)
          
          return (
            <Button3D
              key={choice}
              onPress={() => onChoiceSelect(choice)}
              disabled={selectedAnswer !== null}
              testID={isCorrect ? `correct-choice-${choice}` : `choice-${choice}`}
              color={color}
            >
              {() => (
                <TrueFalseButtonContainer>
                  <ChoiceText>
                    {choice}
                  </ChoiceText>
                </TrueFalseButtonContainer>
              )}
            </Button3D>
          )
        })}
      </ChoiceRow>
    </ChoicesContainer>
  )
}
