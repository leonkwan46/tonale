import { useDevice } from '@/hooks'
import { Button3D } from '@/sharedComponents/Button3D'
import type { ButtonState } from '@/sharedComponents/Button3D/Button3D.styles'
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
  const { isTablet } = useDevice()
  const trueFalseChoices = choices.slice(0, 2) as ('True' | 'False')[]

  const getButtonState = (choice: 'True' | 'False', isSelected: boolean, isCorrect: boolean, isIncorrect: boolean, shouldShowNeutral: boolean): ButtonState => {
    if (showResult) {
      if (isCorrect) return 'correct'
      if (shouldShowNeutral) return 'neutral'
      if (isIncorrect) return 'incorrect'
      return 'neutral'
    }
    return isSelected ? 'selected' : choice === 'True' ? 'selection-true' : 'selection-false'
  }

  return (
    <ChoicesContainer testID={testID}>
      <ChoiceRow isLastRow={true}>
        {trueFalseChoices.map((choice) => {
          const isSelected = selectedAnswer === choice
          const isCorrect = choice === correctAnswer
          const isIncorrect = isSelected && choice !== correctAnswer && showResult
          const shouldShowNeutral = showResult && !isCorrect
          const buttonState = getButtonState(choice, isSelected, isCorrect, isIncorrect, shouldShowNeutral)
          
          return (
            <Button3D
              key={choice}
              onPress={() => onChoiceSelect(choice)}
              disabled={selectedAnswer !== null}
              testID={isCorrect ? `correct-choice-${choice}` : `choice-${choice}`}
              buttonState={buttonState}
              isTablet={isTablet}
            >
              {({ isTablet }) => (
                <TrueFalseButtonContainer
                  isTablet={isTablet}
                >
                  <ChoiceText 
                    isTablet={isTablet}
                  >
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
