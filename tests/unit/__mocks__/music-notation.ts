// Mock for @leonkwan46/music-notation package
// Only includes the constants and types needed for testing

export const NOTES = {
  SEMIBREVE: 'semibreve',
  MINIM: 'minim',
  CROTCHET: 'crotchet',
  QUAVER: 'quaver',
  SEMIQUAVER: 'semiquaver'
}

export const CLEFS = {
  TREBLE: 'treble',
  BASS: 'bass',
  ALTO: 'alto',
  TENOR: 'tenor'
}

export const ACCIDENTALS = {
  SHARP: 'sharp',
  FLAT: 'flat',
  NATURAL: 'natural'
}

export const COMMON_TIME = { topNumber: 4, bottomNumber: 4, notation: '4/4' }
export const CUT_TIME = { topNumber: 2, bottomNumber: 2, notation: '2/2' }

export const createTimeSignature = (top: number, bottom: number) => ({
  topNumber: top,
  bottomNumber: bottom,
  notation: `${top}/${bottom}`
})

// Mock pitch definitions for testing
interface MockNote {
  pitch: string
  name: string
  letterName: string
  stem: 'up' | 'down'
  ledgerLines: number
}

export const TREBLE_PITCH_DEFINITIONS: MockNote[] = [
  { pitch: 'C4', name: 'C', letterName: 'C', stem: 'up', ledgerLines: 0 },
  { pitch: 'D4', name: 'D', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'E4', name: 'E', letterName: 'E', stem: 'up', ledgerLines: 0 },
  { pitch: 'F4', name: 'F', letterName: 'F', stem: 'up', ledgerLines: 0 },
  { pitch: 'G4', name: 'G', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'A4', name: 'A', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'B4', name: 'B', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'C5', name: 'C', letterName: 'C', stem: 'up', ledgerLines: 0 },
  { pitch: 'D5', name: 'D', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'E5', name: 'E', letterName: 'E', stem: 'up', ledgerLines: 0 },
  { pitch: 'F5', name: 'F', letterName: 'F', stem: 'up', ledgerLines: 0 },
  { pitch: 'G5', name: 'G', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'G3', name: 'G', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'G#3', name: 'G#', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'G♯3', name: 'G♯', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'G♭3', name: 'G♭', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'A3', name: 'A', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'A#3', name: 'A#', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'A♯3', name: 'A♯', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'A♭3', name: 'A♭', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'B3', name: 'B', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'B#3', name: 'B#', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'B♯3', name: 'B♯', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'B♭3', name: 'B♭', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'C4', name: 'C', letterName: 'C', stem: 'up', ledgerLines: 0 },
  { pitch: 'C#4', name: 'C#', letterName: 'C', stem: 'up', ledgerLines: 0 },
  { pitch: 'C♯4', name: 'C♯', letterName: 'C', stem: 'up', ledgerLines: 0 },
  { pitch: 'D4', name: 'D', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'D#4', name: 'D#', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'D♯4', name: 'D♯', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'E4', name: 'E', letterName: 'E', stem: 'up', ledgerLines: 0 },
  { pitch: 'F4', name: 'F', letterName: 'F', stem: 'up', ledgerLines: 0 },
  { pitch: 'F#4', name: 'F#', letterName: 'F', stem: 'up', ledgerLines: 0 },
  { pitch: 'F♯4', name: 'F♯', letterName: 'F', stem: 'up', ledgerLines: 0 },
  { pitch: 'G4', name: 'G', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'G#4', name: 'G#', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'G♯4', name: 'G♯', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'A4', name: 'A', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'A#4', name: 'A#', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'A♯4', name: 'A♯', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'B4', name: 'B', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'C5', name: 'C', letterName: 'C', stem: 'up', ledgerLines: 0 },
  { pitch: 'A5', name: 'A', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'A#5', name: 'A#', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'A♯5', name: 'A♯', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'A♭5', name: 'A♭', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'B5', name: 'B', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'B#5', name: 'B#', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'B♯5', name: 'B♯', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'B♭5', name: 'B♭', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'C6', name: 'C', letterName: 'C', stem: 'up', ledgerLines: 0 },
  { pitch: 'C#6', name: 'C#', letterName: 'C', stem: 'up', ledgerLines: 0 },
  { pitch: 'C♯6', name: 'C♯', letterName: 'C', stem: 'up', ledgerLines: 0 },
  { pitch: 'C♭6', name: 'C♭', letterName: 'C', stem: 'up', ledgerLines: 0 },
  { pitch: 'D6', name: 'D', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'D#6', name: 'D#', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'D♯6', name: 'D♯', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'D♭6', name: 'D♭', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'Db4', name: 'Db', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'D♭4', name: 'D♭', letterName: 'D', stem: 'up', ledgerLines: 0 },
  { pitch: 'Eb4', name: 'Eb', letterName: 'E', stem: 'up', ledgerLines: 0 },
  { pitch: 'E♭4', name: 'E♭', letterName: 'E', stem: 'up', ledgerLines: 0 },
  { pitch: 'Gb4', name: 'Gb', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'G♭4', name: 'G♭', letterName: 'G', stem: 'up', ledgerLines: 0 },
  { pitch: 'Ab4', name: 'Ab', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'A♭4', name: 'A♭', letterName: 'A', stem: 'up', ledgerLines: 0 },
  { pitch: 'Bb4', name: 'Bb', letterName: 'B', stem: 'up', ledgerLines: 0 },
  { pitch: 'B♭4', name: 'B♭', letterName: 'B', stem: 'up', ledgerLines: 0 }
]

export const BASS_PITCH_DEFINITIONS: MockNote[] = [
  { pitch: 'B1', name: 'B', letterName: 'B', stem: 'down', ledgerLines: 0 },
  { pitch: 'C2', name: 'C', letterName: 'C', stem: 'down', ledgerLines: 0 },
  { pitch: 'D2', name: 'D', letterName: 'D', stem: 'down', ledgerLines: 0 },
  { pitch: 'E2', name: 'E', letterName: 'E', stem: 'down', ledgerLines: 0 },
  { pitch: 'F2', name: 'F', letterName: 'F', stem: 'down', ledgerLines: 0 },
  { pitch: 'F#2', name: 'F#', letterName: 'F', stem: 'down', ledgerLines: 0 },
  { pitch: 'F♯2', name: 'F♯', letterName: 'F', stem: 'down', ledgerLines: 0 },
  { pitch: 'F♭2', name: 'F♭', letterName: 'F', stem: 'down', ledgerLines: 0 },
  { pitch: 'G2', name: 'G', letterName: 'G', stem: 'down', ledgerLines: 0 },
  { pitch: 'G#2', name: 'G#', letterName: 'G', stem: 'down', ledgerLines: 0 },
  { pitch: 'G♯2', name: 'G♯', letterName: 'G', stem: 'down', ledgerLines: 0 },
  { pitch: 'G♭2', name: 'G♭', letterName: 'G', stem: 'down', ledgerLines: 0 },
  { pitch: 'A2', name: 'A', letterName: 'A', stem: 'down', ledgerLines: 0 },
  { pitch: 'A#2', name: 'A#', letterName: 'A', stem: 'down', ledgerLines: 0 },
  { pitch: 'A♯2', name: 'A♯', letterName: 'A', stem: 'down', ledgerLines: 0 },
  { pitch: 'A♭2', name: 'A♭', letterName: 'A', stem: 'down', ledgerLines: 0 },
  { pitch: 'B2', name: 'B', letterName: 'B', stem: 'down', ledgerLines: 0 },
  { pitch: 'B#2', name: 'B#', letterName: 'B', stem: 'down', ledgerLines: 0 },
  { pitch: 'B♯2', name: 'B♯', letterName: 'B', stem: 'down', ledgerLines: 0 },
  { pitch: 'B♭2', name: 'B♭', letterName: 'B', stem: 'down', ledgerLines: 0 },
  { pitch: 'C3', name: 'C', letterName: 'C', stem: 'down', ledgerLines: 0 },
  { pitch: 'C#3', name: 'C#', letterName: 'C', stem: 'down', ledgerLines: 0 },
  { pitch: 'C♯3', name: 'C♯', letterName: 'C', stem: 'down', ledgerLines: 0 },
  { pitch: 'D3', name: 'D', letterName: 'D', stem: 'down', ledgerLines: 0 },
  { pitch: 'D#3', name: 'D#', letterName: 'D', stem: 'down', ledgerLines: 0 },
  { pitch: 'D♯3', name: 'D♯', letterName: 'D', stem: 'down', ledgerLines: 0 },
  { pitch: 'E3', name: 'E', letterName: 'E', stem: 'down', ledgerLines: 0 },
  { pitch: 'F3', name: 'F', letterName: 'F', stem: 'down', ledgerLines: 0 },
  { pitch: 'F#3', name: 'F#', letterName: 'F', stem: 'down', ledgerLines: 0 },
  { pitch: 'F♯3', name: 'F♯', letterName: 'F', stem: 'down', ledgerLines: 0 },
  { pitch: 'G3', name: 'G', letterName: 'G', stem: 'down', ledgerLines: 0 },
  { pitch: 'G#3', name: 'G#', letterName: 'G', stem: 'down', ledgerLines: 0 },
  { pitch: 'G♯3', name: 'G♯', letterName: 'G', stem: 'down', ledgerLines: 0 },
  { pitch: 'A3', name: 'A', letterName: 'A', stem: 'down', ledgerLines: 0 },
  { pitch: 'A#3', name: 'A#', letterName: 'A', stem: 'down', ledgerLines: 0 },
  { pitch: 'A♯3', name: 'A♯', letterName: 'A', stem: 'down', ledgerLines: 0 },
  { pitch: 'B3', name: 'B', letterName: 'B', stem: 'down', ledgerLines: 0 },
  { pitch: 'C4', name: 'C', letterName: 'C', stem: 'down', ledgerLines: 0 },
  { pitch: 'E4', name: 'E', letterName: 'E', stem: 'down', ledgerLines: 0 },
  { pitch: 'F4', name: 'F', letterName: 'F', stem: 'down', ledgerLines: 0 },
  { pitch: 'Db3', name: 'Db', letterName: 'D', stem: 'down', ledgerLines: 0 },
  { pitch: 'D♭3', name: 'D♭', letterName: 'D', stem: 'down', ledgerLines: 0 },
  { pitch: 'Eb3', name: 'Eb', letterName: 'E', stem: 'down', ledgerLines: 0 },
  { pitch: 'E♭3', name: 'E♭', letterName: 'E', stem: 'down', ledgerLines: 0 },
  { pitch: 'Gb3', name: 'Gb', letterName: 'G', stem: 'down', ledgerLines: 0 },
  { pitch: 'G♭3', name: 'G♭', letterName: 'G', stem: 'down', ledgerLines: 0 },
  { pitch: 'Ab3', name: 'Ab', letterName: 'A', stem: 'down', ledgerLines: 0 },
  { pitch: 'A♭3', name: 'A♭', letterName: 'A', stem: 'down', ledgerLines: 0 },
  { pitch: 'Bb3', name: 'Bb', letterName: 'B', stem: 'down', ledgerLines: 0 },
  { pitch: 'B♭3', name: 'B♭', letterName: 'B', stem: 'down', ledgerLines: 0 }
]

export const ALTO_PITCH_DEFINITIONS: MockNote[] = []
export const TENOR_PITCH_DEFINITIONS: MockNote[] = []

export const KEY_NAMES = {
  C_MAJOR: 'C major',
  G_MAJOR: 'G major',
  D_MAJOR: 'D major',
  F_MAJOR: 'F major',
  A_MAJOR: 'A major',
  E_FLAT_MAJOR: 'E flat major',
  B_FLAT_MAJOR: 'B flat major',
  A_MINOR: 'A minor',
  E_MINOR: 'E minor',
  D_MINOR: 'D minor',
  E_MAJOR: 'E major',
  A_FLAT_MAJOR: 'A flat major',
  C_SHARP_MINOR: 'C sharp minor',
  F_SHARP_MINOR: 'F sharp minor',
  F_MINOR: 'F minor',
  B_MINOR: 'B minor',
  G_MINOR: 'G minor',
  C_MINOR: 'C minor',
  B_MAJOR: 'B major',
  D_FLAT_MAJOR: 'D flat major',
  G_SHARP_MINOR: 'G sharp minor',
  B_FLAT_MINOR: 'B flat minor',
  F_SHARP_MAJOR: 'F sharp major',
  G_FLAT_MAJOR: 'G flat major',
  D_SHARP_MINOR: 'D sharp minor',
  E_FLAT_MINOR: 'E flat minor'
}

// Type exports (empty objects for type-only imports)
export type ClefType = 'treble' | 'bass' | 'alto' | 'tenor'
export type AccidentalType = 'sharp' | 'flat' | 'natural'
export type StemDirection = 'up' | 'down'
export type TimeSignatureType = string | { topNumber: number; bottomNumber: number; notation?: string }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeyName = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Note = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MusicElementData = any

