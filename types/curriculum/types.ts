import type { ClefType, KeyName, MusicElementData } from '@leonkwan46/music-notation'

export interface VisualComponent {
  type?: 'musicStaff' | 'timeSignature' | 'noteValue' | 'termAndSign' | 'triplet'
  clef?: ClefType
  elements?: MusicElementData[]
  timeSignature?: string
  keyName?: KeyName
  timeSignatureValue?: string
  noteType?: string | { type: string; dots?: number; isTuplet?: boolean }
  symbolType?: string
  isChord?: boolean
  tupletConfig?: {
    noteType: string  // Base note type for the tuplet
    numberOfNotes: number  // Number of notes in the tuplet (3 for triplets, 2 for duplets, etc.)
  }
  enableTTS?: boolean
  renderAsSymbol?: boolean
  size?: 'xs' | 'sml' | 'med' | 'lg' | 'xl' | 'xxl'
  showStaff?: boolean
}

export interface Question {
  id: string
  question: string
  correctAnswer: string
  choices: string[]
  explanation?: string
  type: 'multipleChoice' | 'trueFalse' | 'keyPress'
  visualComponent?: VisualComponent
}

