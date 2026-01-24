import type { ClefType, KeyName, MusicElementData, TimeSignatureType } from '@leonkwan46/music-notation'

export type VisualComponentType = 'musicStaff' | 'timeSignature' | 'noteValue' | 'termAndSign' | 'triplet'

export type NoteTypeConfig = {
  type: string
  dots?: number
  isTuplet?: boolean
}

export type NoteType = NoteTypeConfig

export type TupletConfig = {
  noteType: string
  numberOfNotes: number
}

export type VisualComponentSize = 'xs' | 'sml' | 'med' | 'lg' | 'xl' | 'xxl'

export interface VisualComponent {
  type?: VisualComponentType
  clef?: ClefType
  elements?: MusicElementData[]
  timeSignature?: TimeSignatureType
  keyName?: KeyName
  timeSignatureValue?: string
  noteType?: NoteType
  symbolType?: string
  isChord?: boolean
  tupletConfig?: TupletConfig
  enableTTS?: boolean
  renderAsSymbol?: boolean
  size?: VisualComponentSize
  showStaff?: boolean
}
