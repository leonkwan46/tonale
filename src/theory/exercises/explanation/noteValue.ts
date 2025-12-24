// Used in: Stage 1
import type { ExplanationContext } from './types'
import type { VisualComponent } from '@types'

export const explanationText = (context: ExplanationContext): string => {
  return `The correct answer is ${context.correctAnswer}.`
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

