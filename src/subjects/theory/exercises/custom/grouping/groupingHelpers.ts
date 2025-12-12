import { NOTES, TimeSignatureType, type MusicElementData } from '@leonkwan46/music-notation'

export type GroupingQuestion = {
  elements: MusicElementData[]
  timeSignature: TimeSignatureType | string
  correctAnswer: 'True' | 'False'
  explanation?: string
  size?: 'xs' | 'sml' | 'med' | 'lg' | 'xl' | 'xxl'
}

type RestrictedNoteTypes = typeof NOTES.QUAVER | typeof NOTES.SEMIBREVE | typeof NOTES.DEMISEMIQUAVER

const DEFAULT_PITCH = 'F4'
const DEFAULT_STEM = 'up' as const
const DEFAULT_SPACING = 60

/**
 * Creates a note element with common defaults that can be overridden.
 * Defaults: pitch: 'F4', stem: 'up', spacing: 60
 */
export const createNote = (overrides: Partial<MusicElementData> & { type: MusicElementData['type'] }): MusicElementData => {
  return {
    pitch: DEFAULT_PITCH,
    stem: DEFAULT_STEM,
    spacing: DEFAULT_SPACING,
    ...overrides
  }
}

export const createBeamedGroup = (noteType: RestrictedNoteTypes, numberOfNotes: number, spacing = 40): MusicElementData[] => {
  return Array.from({ length: numberOfNotes }, (_, index) => ({
    pitch: DEFAULT_PITCH,
    type: noteType,
    stem: DEFAULT_STEM,
    spacing,
    showFlag: false,
    endGroup: index === numberOfNotes - 1
  }))
}

