import { Button3D } from '@/sharedComponents/Button3D'
import { Modal } from '@/sharedComponents/Modal'
import {
  getExplanationFormattingConfig,
  shouldShowVisualInExplanation
} from '@/subjects/theory/exercises/utils/explanation'
import { getSourGummyFontFamily } from '@/utils/fontHelper'
import type { Explanation, VisualComponent } from '@types'
import type { ReactNode } from 'react'
import { createElement } from 'react'
import { Text } from 'react-native'
import {
  ContinueButtonText,
  ExplanationText
} from './QuestionExplanation.styles'
import { VisualExplanation } from './VisualExplanation'

interface QuestionExplanationProps {
  explanation?: Explanation
  correctAnswer: string
  visualComponent?: VisualComponent
  onContinue: () => void
}

const formatExplanationWithBoldAnswer = (
  text: string,
  correctAnswer: string
): ReactNode => {
  if (!text) return null

  const formattingConfig = getExplanationFormattingConfig()
  const stringsToBold: string[] = []

  if (formattingConfig.boldPatterns.correctAnswer) {
    stringsToBold.push(correctAnswer)
  }
  if (formattingConfig.boldPatterns.noteRestNames) {
    stringsToBold.push(...formattingConfig.noteRestNames)
  }
  if (formattingConfig.boldPatterns.customPatterns) {
    stringsToBold.push(...formattingConfig.boldPatterns.customPatterns)
  }

  const escapedStrings = stringsToBold.map((s) =>
    s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )
  const pattern = `(${escapedStrings.join('|')})`
  const regex = new RegExp(pattern, 'gi')

  const parts: ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    parts.push(
      createElement(
        Text,
        {
          key: match.index,
          style: { fontFamily: getSourGummyFontFamily('700') }
        },
        match[0]
      )
    )

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? <>{parts}</> : text
}

export const QuestionExplanation = ({
  explanation,
  correctAnswer,
  visualComponent,
  onContinue
}: QuestionExplanationProps) => {
  const explanationText = explanation?.text
  const displayVisualComponent =
    explanation?.visualComponent && visualComponent
        ? {
          ...visualComponent,
          ...explanation.visualComponent,
          ...(explanation.visualComponent.elements === undefined &&
            visualComponent.elements && { elements: visualComponent.elements }),
          ...(explanation.visualComponent.noteType === undefined &&
            visualComponent.noteType && { noteType: visualComponent.noteType })
        }
      : explanation?.visualComponent || visualComponent
  const showVisual = shouldShowVisualInExplanation(
    displayVisualComponent,
    explanation
  )
  const displayText =
    explanationText || `The correct answer is ${correctAnswer}.`
  const formattedText = formatExplanationWithBoldAnswer(
    displayText,
    correctAnswer
  )

  return (
    <Modal visible={true} animationType="fade" onRequestClose={onContinue}>
      {showVisual && displayVisualComponent && (
        <VisualExplanation visualComponent={displayVisualComponent} />
      )}

      {formattedText && <ExplanationText>{formattedText}</ExplanationText>}

      <Button3D onPress={onContinue} fullWidth={true}>
        {() => <ContinueButtonText>Continue</ContinueButtonText>}
      </Button3D>
    </Modal>
  )
}
