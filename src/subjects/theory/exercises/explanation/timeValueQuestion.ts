// Used in: Stage 0, Stage 1, Stage 2
import type { VisualComponent } from '@/types/visual'
import type { ExplanationContext } from './types'

export const explanationText = (context: ExplanationContext): string => {
  const valueDisplayName = context.valueDisplayName as string || ''
  const correctAnswer = context.correctAnswer
  return `The correct answer is ${correctAnswer}. A ${valueDisplayName} lasts for ${correctAnswer} beat${correctAnswer !== '1' ? 's' : ''}.`
}

export const explanationVisual = (context: ExplanationContext, questionVisualComponent?: VisualComponent): VisualComponent => {
  if (!questionVisualComponent) {
    return { type: 'musicStaff', size: 'xs' }
  }
  return {
    ...questionVisualComponent,
    size: 'sml'
  }
}

