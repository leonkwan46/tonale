// Used in: Stage 0, Stage 1, Stage 2
import type { VisualComponent } from '@types'
import type { ExplanationContext } from './types'

export const explanationText = (context: ExplanationContext): string => {
  return `The correct answer is ${context.correctAnswer}.`
}

export const explanationVisual = (context: ExplanationContext, questionVisualComponent?: VisualComponent): VisualComponent => {
  if (!questionVisualComponent) {
    return { type: 'musicStaff' as const, size: 'xs' as const }
  }
  return {
    ...questionVisualComponent,
    size: 'xs' as const
  }
}

