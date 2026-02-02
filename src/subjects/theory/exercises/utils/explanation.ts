import type { Explanation, LessonContentType } from '@/types/lesson'
import type { VisualComponent } from '@/types/visual'
import type { ExplanationContext } from '../explanation/types'

import * as accidentals from '../explanation/accidentals'
import * as grouping from '../explanation/grouping'
import * as interval from '../explanation/interval'
import * as keySignature from '../explanation/keySignature'
import * as musicalTerm from '../explanation/musicalTerm'
import * as noteIdentification from '../explanation/noteIdentification'
import * as noteValue from '../explanation/noteValue'
import * as noteValueName from '../explanation/noteValueName'
import * as restValue from '../explanation/restValue'
import * as restValueName from '../explanation/restValueName'
import * as scaleDegrees from '../explanation/scaleDegrees'
import * as semitonesTones from '../explanation/semitonesTones'
import * as tieSlur from '../explanation/tieSlur'
import * as timeSignature from '../explanation/timeSignature'
import * as timeValueQuestion from '../explanation/timeValueQuestion'
import * as triad from '../explanation/triad'

const explanationTexts: Partial<Record<LessonContentType, (context: ExplanationContext) => string>> = {
  noteValue: noteValue.explanationText,
  restValue: restValue.explanationText,
  noteValueName: noteValueName.explanationText,
  restValueName: restValueName.explanationText,
  accidentals: accidentals.explanationText,
  musicalTerm: musicalTerm.explanationText,
  interval: interval.explanationText,
  scaleDegrees: scaleDegrees.explanationText,
  semitonesTones: semitonesTones.explanationText,
  keySignature: keySignature.explanationText,
  timeSignature: timeSignature.explanationText,
  noteIdentification: noteIdentification.explanationText,
  tieSlur: tieSlur.explanationText,
  triad: triad.explanationText,
  grouping: grouping.explanationText,
  timeValueQuestion: timeValueQuestion.explanationText
}

const explanationVisualComponents: Partial<Record<LessonContentType, (context: ExplanationContext, questionVisualComponent?: VisualComponent) => VisualComponent>> = {
  noteValue: noteValue.explanationVisual,
  restValue: restValue.explanationVisual,
  noteValueName: noteValueName.explanationVisual,
  restValueName: restValueName.explanationVisual,
  accidentals: accidentals.explanationVisual,
  musicalTerm: musicalTerm.explanationVisual,
  interval: interval.explanationVisual,
  scaleDegrees: scaleDegrees.explanationVisual,
  semitonesTones: semitonesTones.explanationVisual,
  keySignature: keySignature.explanationVisual,
  timeSignature: timeSignature.explanationVisual,
  noteIdentification: noteIdentification.explanationVisual,
  tieSlur: tieSlur.explanationVisual,
  triad: triad.explanationVisual,
  grouping: grouping.explanationVisual,
  timeValueQuestion: timeValueQuestion.explanationVisual
}

export const explanationFormattingConfig = {
  boldPatterns: {
    correctAnswer: true,
    noteRestNames: true,
    customPatterns: [] as string[]
  },
  noteRestNames: [
    'semibreve', 'minim', 'crotchet', 'quaver', 'semiquaver',
    'dotted semibreve', 'dotted minim', 'dotted crotchet', 'dotted quaver', 'dotted semiquaver',
    'semibreve rest', 'minim rest', 'crotchet rest', 'quaver rest', 'semiquaver rest',
    'dotted semibreve rest', 'dotted minim rest', 'dotted crotchet rest', 'dotted quaver rest', 'dotted semiquaver rest'
  ]
}

export const getExplanationFormattingConfig = () => {
  return explanationFormattingConfig
}

export const generateExplanation = (
  lessonContentType: LessonContentType,
  context: ExplanationContext,
  questionVisualComponent?: VisualComponent
): Explanation => {
  const explanationTextFn = explanationTexts[lessonContentType]
  
  let text: string
  if (!explanationTextFn) {
    text = `The correct answer is ${context.correctAnswer}.`
  } else {
    text = explanationTextFn(context)
  }
  
  const visualComponentFn = explanationVisualComponents[lessonContentType]
  const visualComponent = visualComponentFn 
    ? visualComponentFn(context, questionVisualComponent)
    : questionVisualComponent
  
  return {
    text,
    ...(visualComponent && { visualComponent })
  }
}

export const shouldShowVisualInExplanation = (
  visualComponent?: VisualComponent,
  explanation?: Explanation
): boolean => {
  if (explanation?.visualComponent) {
    return true
  }
  
  if (!visualComponent) return false
  
  const hasClefAndPitchElements = Boolean(
    visualComponent.clef && 
    visualComponent.elements?.length &&
    visualComponent.elements.some(element => element.pitch)
  )
  
  const hasTimeSignatureAndElements = Boolean(
    visualComponent.timeSignature &&
    visualComponent.elements?.length &&
    visualComponent.elements.some(element => element.pitch)
  )
  
  const isNoteValue = visualComponent.type === 'noteValue' && visualComponent.noteType
  const isTermAndSign = visualComponent.type === 'termAndSign' && visualComponent.symbolType
  
  return Boolean(hasClefAndPitchElements || hasTimeSignatureAndElements || isNoteValue || isTermAndSign)
}
