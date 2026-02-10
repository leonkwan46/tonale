// Used in: Stage 0
import type { TimeSignatureType } from '@leonkwan46/music-notation'
import type { VisualComponent } from '@/types/visual'
import { formatAsNotation, getNonnumberedTimeSignature, getNoteValueName } from '../utils/timeSignature'
import type { ExplanationContext } from './types'

const getTimeSignatureExplanation = (timeSignature: TimeSignatureType): string => {
  if (timeSignature === 'common') {
    const { beatCount, noteValueName } = getNonnumberedTimeSignature('common')
    return `This time signature (Common time) means ${beatCount} ${noteValueName} beats per bar.\n\nTop number = beats per bar\nBottom number = one beat equals one ${noteValueName}`
  }
  
  if (timeSignature === 'cut') {
    const { beatCount, noteValueName } = getNonnumberedTimeSignature('cut')
    return `This time signature (Cut time) means ${beatCount} ${noteValueName} beats per bar.\n\nTop number = beats per bar\nBottom number = one beat equals one ${noteValueName}`
  }
  
  const topNumber = timeSignature.topNumber
  const bottomNumber = timeSignature.bottomNumber
  const noteValueName = getNoteValueName(bottomNumber)
  
  return `This time signature means ${topNumber} ${noteValueName} beats per bar.\n\nTop number = beats per bar\nBottom number = one beat equals one ${noteValueName}`
}

export const explanationText = (context: ExplanationContext): string => {
  if (!context.timeSignature) {
    throw new Error('Time signature is required for time signature explanation')
  }
  
  return getTimeSignatureExplanation(context.timeSignature)
}

export const explanationVisual = (context: ExplanationContext, questionVisualComponent?: VisualComponent): VisualComponent => {
  if (!context.timeSignature) {
    throw new Error('Time signature is required for time signature explanation visual')
  }
  
  // If question already has a timeSignature visual component, use it
  if (questionVisualComponent?.type === 'timeSignature') {
    return {
      ...questionVisualComponent,
      size: 'sml'
    }
  }
  
  // Otherwise create a time signature visual component
  return {
    type: 'timeSignature',
    timeSignatureValue: formatAsNotation(context.timeSignature),
    size: 'sml'
  }
}

