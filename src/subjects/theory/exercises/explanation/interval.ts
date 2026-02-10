// Used in: Stage 2
import type { VisualComponent } from '@/types/visual'
import type { ExplanationContext } from './types'

export const explanationText = (context: ExplanationContext): string => {
  const correctAnswer = context.correctAnswer
  const semitones = context.semitones as number || 0
  return `The correct answer is ${correctAnswer} (${semitones} semitones).`
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

