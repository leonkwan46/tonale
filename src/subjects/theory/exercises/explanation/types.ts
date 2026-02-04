import type { ClefType, KeyName, TimeSignatureType } from '@leonkwan46/music-notation'

export type SemitoneType = 'semitone' | 'semitones'
export type IntervalType = 'perfect' | 'major' | 'minor' | 'augmented' | 'diminished'
export type ExplanationType = SemitoneType | IntervalType

export interface ExplanationContext {
  correctAnswer: string
  term?: string
  definition?: string
  letterName?: string
  clef?: ClefType
  simpleName?: string
  semitones?: number
  answer?: string
  count?: string
  type?: ExplanationType
  key?: KeyName
  degree?: string
  timeSignature?: TimeSignatureType
  explanation?: string
  notation?: string
  notes?: string[]
  chordKey?: string
  valueDisplayName?: string
}

export type ExplanationText = (context: ExplanationContext) => string

