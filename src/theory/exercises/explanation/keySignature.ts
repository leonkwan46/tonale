// Used in: Stage 2
import { ALL_MAJOR_SCALES } from '@/config/gradeSyllabus/scales'
import type { KeyName } from '@leonkwan46/music-notation'
import type { VisualComponent } from '@types'
import type { ExplanationContext } from './types'

const keyToString = (key: KeyName | string): string => {
  if (typeof key === 'string') {
    return key
  }
  if (key && typeof key === 'object' && 'toString' in key) {
    return (key as { toString(): string }).toString()
  }
  return String(key)
}

const getKeySignatureAccidentals = (key: KeyName | string): { accidentals: string[], type: 'sharp' | 'flat' | 'none' } => {
  const keyName = keyToString(key)
  
  // Find the key in the scales by iterating over keys
  let scale: readonly string[] | undefined
  
  for (const scaleKey in ALL_MAJOR_SCALES.ascending) {
    const keyNameObj = scaleKey as unknown as KeyName
    const scaleKeyName = keyToString(keyNameObj)
    if (scaleKeyName === keyName) {
      scale = ALL_MAJOR_SCALES.ascending[scaleKey as keyof typeof ALL_MAJOR_SCALES.ascending]
      break
    }
  }
  
  if (!scale) {
    throw new Error(`Key signature not found for key: ${keyName}`)
  }
  
  const accidentals: string[] = []
  let hasSharp = false
  let hasFlat = false
  
  // Extract notes with accidentals (excluding the octave note at the end)
  for (let i = 0; i < scale.length - 1; i++) {
    const note = scale[i]
    if (note.includes('♯')) {
      accidentals.push(note)
      hasSharp = true
    } else if (note.includes('♭')) {
      accidentals.push(note)
      hasFlat = true
    }
  }
  
  // Determine type
  const type = hasSharp ? 'sharp' : hasFlat ? 'flat' : 'none'
  
  return { accidentals, type }
}

export const explanationText = (context: ExplanationContext): string => {
  const key = context.key || context.correctAnswer
  if (!key) {
    throw new Error('Key is required for key signature explanation')
  }
  
  const keyName = keyToString(key)
  const { accidentals, type } = getKeySignatureAccidentals(key)
  
  if (accidentals.length === 0) {
    return `${keyName} has no sharps or flats in its key signature.`
  }
  
  const accidentalType = accidentals.length === 1 
    ? (type === 'sharp' ? 'sharp' : 'flat')
    : (type === 'sharp' ? 'sharps' : 'flats')
  const verb = accidentals.length === 1 ? 'is' : 'are'
  const accidentalList = accidentals.join(', ')
  
  return `${keyName} has ${accidentals.length} ${accidentalType} in its key signature, which ${verb}\n${accidentalList}.`
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

