import { useDevice } from '@/hooks'
import { Button3D } from '@/sharedComponents/Button3D'
import type { ButtonState } from '@/sharedComponents/Button3D/Button3D.styles'
import { ChoiceRow, ChoicesContainer, ChoiceText, LayoutType, MultipleChoiceButtonContainer } from './MultipleChoice.styles'

interface MultipleChoiceProps {
  choices: string[]
  correctAnswer: string
  selectedAnswer: string | null
  showResult: boolean
  onChoiceSelect: (choice: string) => void
  type?: LayoutType
  testID?: string
}

export const MultipleChoice = ({
  choices,
  correctAnswer,
  selectedAnswer,
  showResult,
  onChoiceSelect,
  type = 'grid',
  testID
}: MultipleChoiceProps) => {
  const { isTablet } = useDevice()

  const getButtonState = (isSelected: boolean, isCorrect: boolean, isIncorrect: boolean): ButtonState => {
    if (showResult) {
      if (isCorrect) return 'correct'
      if (isIncorrect) return 'incorrect'
      return 'neutral'
    }
    return isSelected ? 'selected' : 'default'
  }

  const createRows = () => {
    if (type === 'row') {
      return choices.map(choice => [choice])
    } else {
      const rows = []
      for (let i = 0; i < choices.length; i += 2) {
        rows.push(choices.slice(i, i + 2))
      }
      return rows
    }
  }

  const rows = createRows()

  return (
    <ChoicesContainer testID={testID} type={type} isTablet={isTablet}>
      {rows.map((row, rowIndex) => (
        <ChoiceRow key={rowIndex} type={type}>
          {row.map((choice, colIndex) => {
            const index = rowIndex * (type === 'row' ? 1 : 2) + colIndex
            const isSelected = selectedAnswer === choice
            const isCorrect = choice === correctAnswer
            const isIncorrect = isSelected && choice !== correctAnswer && showResult
            const buttonState = getButtonState(isSelected, isCorrect, isIncorrect)

            return (
              <Button3D
                key={index}
                onPress={() => onChoiceSelect(choice)}
                disabled={selectedAnswer !== null}
                testID={isCorrect ? `correct-choice-${choice}` : `choice-${choice}`}
                buttonState={buttonState}
                isTablet={isTablet}
                layoutType={type}
              >
                {({ isTablet }) => (
                  <MultipleChoiceButtonContainer isTablet={isTablet} layoutType={type}>
                    <ChoiceText 
                      isTablet={isTablet} 
                      layoutType={type}
                      numberOfLines={1}
                      adjustsFontSizeToFit={true}
                      minimumFontScale={0.5}
                    >
                      {choice}
                    </ChoiceText>
                  </MultipleChoiceButtonContainer>
                )}
              </Button3D>
            )
          })}
        </ChoiceRow>
      ))}
    </ChoicesContainer>
  )
}

export type { LayoutType }
