// Used in: Stage 0, Stage 1
import type { VisualComponent } from '@/types/visual'
import type { ExplanationContext } from './types'

export const explanationText = (context: ExplanationContext): string => {
  return `The correct answer is ${context.correctAnswer}.`
}

export const explanationVisual = (context: ExplanationContext, questionVisualComponent?: VisualComponent): VisualComponent => {
  if (!questionVisualComponent) {
    return { type: 'musicStaff', size: 'xs' }
  }
  return {
    ...questionVisualComponent,
    size: 'xs'
  }
}

