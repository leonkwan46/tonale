// Used in: Stage 2
import type { VisualComponent } from '@/types/visual'
import type { ExplanationContext } from './types'

export const explanationText = (context: ExplanationContext): string => {
  const notes = context.notes as string[] || []
  const notesString = notes.join('-')
  return `The correct answer is ${context.correctAnswer}.\nThis is formed by ${notesString}.`
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

