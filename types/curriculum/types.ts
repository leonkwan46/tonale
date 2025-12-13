import type { ClefType, KeyName, MusicElementData } from '@leonkwan46/music-notation'

export type AnswerType = 'multipleChoice' | 'trueFalse' | 'keyPress' | 'rhythmTap'

export interface QuestionInterface {
  // Type identification
  type?: 'musicStaff' | 'timeSignature' | 'noteValue' | 'termAndSign' | 'triplet' | 'playback'
  
  // Notation properties (for musicStaff, individual notes)
  clef?: ClefType
  elements?: MusicElementData[]
  timeSignature?: string
  keyName?: KeyName
  isChord?: boolean
  showStaff?: boolean
  size?: 'xs' | 'sml' | 'med' | 'lg' | 'xl' | 'xxl'
  
  // TimeSignature specific
  timeSignatureValue?: string
  
  // NoteValue specific
  noteType?: string | { type: string; dots?: number; isTuplet?: boolean }
  
  // Triplet specific
  tupletConfig?: {
    noteType: string  // Base note type for the tuplet
    numberOfNotes: number  // Number of notes in the tuplet (3 for triplets, 2 for duplets, etc.)
  }
  
  // TermAndSign specific
  symbolType?: string
  renderAsSymbol?: boolean
  enableTTS?: boolean
  
  // Playback specific
  rhythmMelody?: { note: string; duration: number }[]
}

export interface Question {
  id: string
  title: string
  correctAnswer: string | number[]
  choices: string[]
  explanation?: string
  answerInterface: AnswerType
  questionInterface?: QuestionInterface
}

