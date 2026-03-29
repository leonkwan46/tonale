import { useDevice } from '@/hooks'
import { Depth3D } from '@/compLib/Depth3D'
import type { Depth3DColor } from '@/compLib/Depth3D/Depth3D.styles'
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

  const getButtonColor = (choice: 'True' | 'False', isSelected: boolean, isCorrect: boolean, isIncorrect: boolean, shouldShowNeutral: boolean): Depth3DColor => {
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
            <Depth3D
              key={choice}
              onPress={() => onChoiceSelect(choice)}
              disabled={selectedAnswer !== null}
              testID={isCorrect ? `correct-choice-${choice}` : `choice-${choice}`}
              color={color}
            >
              {() => (
                <TrueFalseButtonContainer>
                  <ChoiceText
                    size={isTablet ? 'md' : 'lg'}
                    weight="semibold"
                    align="center"
                  >
                    {choice}
                  </ChoiceText>
                </TrueFalseButtonContainer>
              )}
            </Depth3D>
          )
        })}
      </ChoiceRow>
    </ChoicesContainer>
  )
}
