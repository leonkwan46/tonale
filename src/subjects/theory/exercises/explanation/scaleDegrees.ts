// Used in: Stage 2
import type { VisualComponent } from '@/types/visual'
import type { ExplanationContext } from './types'

const getOrdinalWord = (degree: string): string => {
  const ordinalMap: Record<string, string> = {
    '1st': 'first',
    '2nd': 'second',
    '3rd': 'third',
    '4th': 'fourth',
    '5th': 'fifth',
    '6th': 'sixth',
    '7th': 'seventh',
    '8th': 'eighth'
  }
  return ordinalMap[degree] || degree.replace(/st|nd|rd|th/, '')
}

export const explanationText = (context: ExplanationContext): string => {
  const key = context.key?.toString() || ''
  const degree = context.degree as string || context.correctAnswer
  const ordinalWord = getOrdinalWord(degree)
  return `The correct answer is ${context.correctAnswer}.\nIn ${key}, this note is the ${ordinalWord} note.`
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

