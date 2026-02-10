// Used in: Stage 1
import type { VisualComponent } from '@/types/visual'
import type { ExplanationContext } from './types'

export const explanationText = (context: ExplanationContext): string => {
  if (context.explanation) {
    return context.explanation as string
  }
  const answer = context.correctAnswer.toLowerCase()
  // Check for tie (either "Tie" or "Held together")
  if (answer === 'tie' || answer === 'held together') {
    return 'A tie connects two notes that are the same, making them sound like one longer note.'
  }
  // Check for slur (either "Slur" or "Smoothly connected")
  if (answer === 'slur' || answer === 'smoothly connected') {
    return 'A slur connects notes so they sound smooth and flow together.'
  }
  return `The correct answer is ${context.correctAnswer}.`
}

export const explanationVisual = (context: ExplanationContext, questionVisualComponent?: VisualComponent): VisualComponent => {
  if (!questionVisualComponent) {
    throw new Error('tieSlur explanation requires a questionVisualComponent')
  }
  return {
    ...questionVisualComponent
  }
}

