// Used in: Stage 2
import type { VisualComponent } from '@types'
import type { ExplanationContext } from './types'

export const explanationText = (context: ExplanationContext): string => {
  return context.explanation || `The correct answer is ${context.correctAnswer}.`
}

export const explanationVisual = (context: ExplanationContext, questionVisualComponent?: VisualComponent): VisualComponent => {
  if (!questionVisualComponent) {
    return { type: 'musicStaff', size: 'xs' }
  }
  return {
    ...questionVisualComponent,
    size: 'med'
  }
}

