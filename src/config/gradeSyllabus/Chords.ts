import { KEY_NAMES } from '@leonkwan46/music-notation'
import { ALL_MAJOR_KEYS, ALL_MINOR_KEYS, GRADE_ONE_MINOR_KEYS } from './Keys'
import { ALL_HARMONIC_MINOR_SCALES, ALL_MAJOR_SCALES, AllHarmonicMinorScale, AllMajorScale } from './Scales'

// ======================
// HELPER FUNCTIONS
// ======================

const getTonicTriad = (scale: readonly string[]): readonly (readonly string[])[] => {
  return [[scale[0]], [scale[2]], [scale[4]]] as const
}

const getChordFromScaleDegree = (scale: readonly string[], degree: 1 | 2 | 4 | 5): readonly string[] => {
  const rootIndex = degree - 1
  const thirdIndex = (rootIndex + 2) % 7
  const fifthIndex = (rootIndex + 4) % 7
  
  return [scale[rootIndex], scale[thirdIndex], scale[fifthIndex]] as const
}

const getChordInversions = (chord: readonly string[]): { root: readonly string[], firstInversion: readonly string[], secondInversion: readonly string[] } => {
  return {
    root: chord,
    firstInversion: [chord[1], chord[2], chord[0]] as const,
    secondInversion: [chord[2], chord[0], chord[1]] as const
  }
}

const generateChords = (keys: readonly string[], scaleType: 'major' | 'minor') => {
  const chords: Record<string, readonly (readonly string[])[]> = {}
  
  for (const key of keys) {
    const scale = scaleType === 'major' 
      ? ALL_MAJOR_SCALES.ascending[key as AllMajorScale]
      : ALL_HARMONIC_MINOR_SCALES.ascending[key as AllHarmonicMinorScale]
    
    if (scale) {
      chords[key] = getTonicTriad(scale)
    }
  }
  
  return chords
}

const generatePrimaryChordsWithInversions = (keys: readonly string[], scaleType: 'major' | 'minor') => {
  const chords: Record<string, { 
    I: { root: readonly string[], firstInversion: readonly string[], secondInversion: readonly string[] },
    II: { root: readonly string[], firstInversion: readonly string[], secondInversion: readonly string[] },
    IV: { root: readonly string[], firstInversion: readonly string[], secondInversion: readonly string[] },
    V: { root: readonly string[], firstInversion: readonly string[], secondInversion: readonly string[] }
  }> = {}
  
  for (const key of keys) {
    const scale = scaleType === 'major' 
      ? ALL_MAJOR_SCALES.ascending[key as AllMajorScale]
      : ALL_HARMONIC_MINOR_SCALES.ascending[key as AllHarmonicMinorScale]
    
    if (scale) {
      const I = getChordFromScaleDegree(scale, 1)
      const II = getChordFromScaleDegree(scale, 2)
      const IV = getChordFromScaleDegree(scale, 4)
      const V = getChordFromScaleDegree(scale, 5)
      
      chords[key] = {
        I: getChordInversions(I),
        II: getChordInversions(II),
        IV: getChordInversions(IV),
        V: getChordInversions(V)
      }
    }
  }
  
  return chords
}

// ======================
// GRADE ONE CHORDS
// ======================

export const GRADE_ONE_MAJOR_KEYS = [
  KEY_NAMES.C_MAJOR,
  KEY_NAMES.G_MAJOR,
  KEY_NAMES.D_MAJOR,
  KEY_NAMES.F_MAJOR
] as const

export const GRADE_ONE_CHORDS = generateChords(GRADE_ONE_MAJOR_KEYS, 'major')
export type GradeOneChord = typeof GRADE_ONE_CHORDS

// ======================
// GRADE TWO CHORDS
// ======================

export const GRADE_TWO_MAJOR_KEYS = [
  KEY_NAMES.A_MAJOR,
  KEY_NAMES.E_FLAT_MAJOR,
  KEY_NAMES.B_FLAT_MAJOR
] as const

export const GRADE_TWO_MINOR_KEYS = [
  KEY_NAMES.A_MINOR,
  KEY_NAMES.E_MINOR,
  KEY_NAMES.D_MINOR
] as const

export const GRADE_TWO_MAJOR_CHORDS = generateChords(GRADE_TWO_MAJOR_KEYS, 'major')
export const GRADE_TWO_MINOR_CHORDS = generateChords(GRADE_TWO_MINOR_KEYS, 'minor')

export const GRADE_TWO_CHORDS = {
  ...GRADE_TWO_MAJOR_CHORDS,
  ...GRADE_TWO_MINOR_CHORDS
} as const
export type GradeTwoChord = typeof GRADE_TWO_CHORDS

// ======================
// GRADE THREE CHORDS
// ======================

export const GRADE_THREE_MAJOR_KEYS = [
  KEY_NAMES.E_MAJOR,
  KEY_NAMES.A_FLAT_MAJOR
] as const

export const GRADE_THREE_MINOR_KEYS = [
  KEY_NAMES.C_SHARP_MINOR,
  KEY_NAMES.F_SHARP_MINOR,
  KEY_NAMES.F_MINOR,
  KEY_NAMES.B_MINOR,
  KEY_NAMES.G_MINOR,
  KEY_NAMES.C_MINOR
] as const

export const GRADE_THREE_MAJOR_CHORDS = generateChords(GRADE_THREE_MAJOR_KEYS, 'major')
export const GRADE_THREE_MINOR_CHORDS = generateChords(GRADE_THREE_MINOR_KEYS, 'minor')

export const GRADE_THREE_CHORDS = {
  ...GRADE_THREE_MAJOR_CHORDS,
  ...GRADE_THREE_MINOR_CHORDS
} as const
export type GradeThreeChord = typeof GRADE_THREE_CHORDS

// ======================
// GRADE FOUR CHORDS
// ======================

export const GRADE_FOUR_MAJOR_KEYS = [
  KEY_NAMES.B_MAJOR,
  KEY_NAMES.D_FLAT_MAJOR
] as const

export const GRADE_FOUR_MINOR_KEYS = [
  KEY_NAMES.G_SHARP_MINOR,
  KEY_NAMES.B_FLAT_MINOR
] as const


export const GRADE_FOUR_MAJOR_PRIMARY_CHORDS = generatePrimaryChordsWithInversions([...GRADE_ONE_MAJOR_KEYS, ...GRADE_TWO_MAJOR_KEYS, ...GRADE_THREE_MAJOR_KEYS, ...GRADE_FOUR_MAJOR_KEYS], 'major')
export const GRADE_FOUR_MINOR_PRIMARY_CHORDS = generatePrimaryChordsWithInversions([...GRADE_ONE_MINOR_KEYS, ...GRADE_TWO_MINOR_KEYS, ...GRADE_THREE_MINOR_KEYS, ...GRADE_FOUR_MINOR_KEYS], 'minor')

export const GRADE_FOUR_CHORDS = {
  ...GRADE_FOUR_MAJOR_PRIMARY_CHORDS,
  ...GRADE_FOUR_MINOR_PRIMARY_CHORDS
} as const
export type GradeFourChord = typeof GRADE_FOUR_CHORDS

// ======================
// GRADE FIVE CHORDS
// ======================

export const GRADE_FIVE_MAJOR_KEYS = [
  KEY_NAMES.F_SHARP_MAJOR,
  KEY_NAMES.G_FLAT_MAJOR
] as const

export const GRADE_FIVE_MINOR_KEYS = [
  KEY_NAMES.D_SHARP_MINOR,
  KEY_NAMES.E_FLAT_MINOR
] as const

export const GRADE_FIVE_MAJOR_CHORDS = generatePrimaryChordsWithInversions(ALL_MAJOR_KEYS, 'major')
export const GRADE_FIVE_MINOR_CHORDS = generatePrimaryChordsWithInversions(ALL_MINOR_KEYS, 'minor')

export const GRADE_FIVE_CHORDS = {
  ...GRADE_FIVE_MAJOR_CHORDS,
  ...GRADE_FIVE_MINOR_CHORDS
} as const
export type GradeFiveChord = typeof GRADE_FIVE_CHORDS
