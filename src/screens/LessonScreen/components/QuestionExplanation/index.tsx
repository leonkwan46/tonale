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
import { ContinueButtonText, ExplanationText } from './QuestionExplanation.styles'
import { VisualExplanation } from './VisualExplanation'

interface QuestionExplanationProps {
  explanation?: Explanation
  correctAnswer: string
  visualComponent?: VisualComponent
  onContinue: () => void
}

function mergeVisualComponent(
  fromExplanation?: VisualComponent,
  fromQuestion?: VisualComponent
): VisualComponent | undefined {
  if (!fromExplanation) return fromQuestion
  if (!fromQuestion) return fromExplanation
  return {
    ...fromQuestion,
    ...fromExplanation,
    ...(fromExplanation.elements === undefined && fromQuestion.elements && { elements: fromQuestion.elements }),
    ...(fromExplanation.noteType === undefined && fromQuestion.noteType && { noteType: fromQuestion.noteType }),
    ...(fromExplanation.symbolType === undefined && fromQuestion.symbolType && { symbolType: fromQuestion.symbolType })
  }
}

function getStringsToBold(correctAnswer: string): string[] {
  const config = getExplanationFormattingConfig()
  const out: string[] = []
  if (config.boldPatterns.correctAnswer) out.push(correctAnswer)
  if (config.boldPatterns.noteRestNames && Array.isArray(config.noteRestNames)) out.push(...config.noteRestNames)
  if (Array.isArray(config.boldPatterns.customPatterns)) out.push(...config.boldPatterns.customPatterns)
  return out
}

function formatExplanationWithBoldAnswer(text: string, correctAnswer: string): ReactNode {
  if (!text) return null
  const stringsToBold = getStringsToBold(correctAnswer)
  if (stringsToBold.length === 0) return <>{text}</>
  const pattern = `(${stringsToBold.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`
  const regex = new RegExp(pattern, 'gi')
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    parts.push(
      createElement(Text, { key: match.index, style: { fontFamily: getSourGummyFontFamily('700') } }, match[0])
    )
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return <>{parts}</>
}

export function QuestionExplanation({
  explanation,
  correctAnswer,
  visualComponent,
  onContinue
}: QuestionExplanationProps) {
  const displayVisualComponent = mergeVisualComponent(explanation?.visualComponent, visualComponent)
  const showVisual = shouldShowVisualInExplanation(displayVisualComponent, explanation)
  const displayText = explanation?.text ?? `The correct answer is ${correctAnswer}.`
  const formattedText = formatExplanationWithBoldAnswer(displayText, correctAnswer)

  return (
    <Modal visible animationType="fade" onRequestClose={onContinue} contentVariant="light">
      {showVisual && displayVisualComponent && (
        <VisualExplanation visualComponent={displayVisualComponent} />
      )}
      {formattedText && <ExplanationText>{formattedText}</ExplanationText>}
      <Button3D onPress={onContinue} fullWidth>
        {() => <ContinueButtonText>Continue</ContinueButtonText>}
      </Button3D>
    </Modal>
  )
}
