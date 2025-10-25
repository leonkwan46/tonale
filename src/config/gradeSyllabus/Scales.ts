import { KEY_NAMES } from '@leonkwan46/music-notation'

// ======================
// SCALES CONFIGURATION
// ======================
export const ALL_MAJOR_SCALES = {
  ascending: {
    [KEY_NAMES.C_MAJOR]: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
    // Sharp keys
    [KEY_NAMES.G_MAJOR]: ['G', 'A', 'B', 'C', 'D', 'E', 'F♯', 'G'],
    [KEY_NAMES.D_MAJOR]: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯', 'D'],
    [KEY_NAMES.A_MAJOR]: ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯', 'A'],
    [KEY_NAMES.E_MAJOR]: ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯', 'E'],
    [KEY_NAMES.B_MAJOR]: ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯', 'B'],
    [KEY_NAMES.F_SHARP_MAJOR]: ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯', 'F♯'],
    // Flat keys
    [KEY_NAMES.F_MAJOR]: ['F', 'G', 'A', 'B♭', 'C', 'D', 'E', 'F'],
    [KEY_NAMES.B_FLAT_MAJOR]: ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A', 'B♭'],
    [KEY_NAMES.E_FLAT_MAJOR]: ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D', 'E♭'],
    [KEY_NAMES.A_FLAT_MAJOR]: ['A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F', 'G', 'A♭'],
    [KEY_NAMES.D_FLAT_MAJOR]: ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C', 'D♭'],
    [KEY_NAMES.G_FLAT_MAJOR]: ['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F', 'G♭']
  },
  descending: {
    [KEY_NAMES.C_MAJOR]: ['C', 'B', 'A', 'G', 'F', 'E', 'D', 'C'],
    // Sharp keys
    [KEY_NAMES.G_MAJOR]: ['G', 'F♯', 'E', 'D', 'C', 'B', 'A', 'G'],
    [KEY_NAMES.D_MAJOR]: ['D', 'C♯', 'B', 'A', 'G', 'F♯', 'E', 'D'],
    [KEY_NAMES.A_MAJOR]: ['A', 'G♯', 'F♯', 'E', 'D', 'C♯', 'B', 'A'],
    [KEY_NAMES.E_MAJOR]: ['E', 'D♯', 'C♯', 'B', 'A', 'G♯', 'F♯', 'E'],
    [KEY_NAMES.B_MAJOR]: ['B', 'A♯', 'G♯', 'F♯', 'E', 'D♯', 'C♯', 'B'],
    [KEY_NAMES.F_SHARP_MAJOR]: ['F♯', 'E♯', 'D♯', 'C♯', 'B', 'A♯', 'G♯', 'F♯'],
    // Flat keys
    [KEY_NAMES.F_MAJOR]: ['F', 'E', 'D', 'C', 'B♭', 'A', 'G', 'F'],
    [KEY_NAMES.B_FLAT_MAJOR]: ['B♭', 'A', 'G', 'F', 'E♭', 'D', 'C', 'B♭'],
    [KEY_NAMES.E_FLAT_MAJOR]: ['E♭', 'D', 'C', 'B♭', 'A♭', 'G', 'F', 'E♭'],
    [KEY_NAMES.A_FLAT_MAJOR]: ['A♭', 'G', 'F', 'E♭', 'D♭', 'C♭', 'B♭', 'A♭'],
    [KEY_NAMES.D_FLAT_MAJOR]: ['D♭', 'C', 'B♭', 'A♭', 'G♭', 'F', 'E♭', 'D♭'],
    [KEY_NAMES.G_FLAT_MAJOR]: ['G♭', 'F', 'E♭', 'D♭', 'C♭', 'B♭', 'A♭', 'G♭']
  }
} as const
export type AllMajorScale = keyof typeof ALL_MAJOR_SCALES.ascending
export type AllMajorScaleAscending = (typeof ALL_MAJOR_SCALES.ascending)[AllMajorScale]
export type AllMajorScaleDescending = (typeof ALL_MAJOR_SCALES.descending)[AllMajorScale]

export const ALL_HARMONIC_MINOR_SCALES = {
  ascending: {
    [KEY_NAMES.A_MINOR]: ['A', 'B', 'C', 'D', 'E', 'F', 'G♯', 'A'],
    // Sharp keys
    [KEY_NAMES.E_MINOR]: ['E', 'F♯', 'G', 'A', 'B', 'C', 'D♯', 'E'],
    [KEY_NAMES.B_MINOR]: ['B', 'C♯', 'D', 'E', 'F♯', 'G', 'A♯', 'B'],
    [KEY_NAMES.F_SHARP_MINOR]: ['F♯', 'G♯', 'A', 'B', 'C♯', 'D', 'E♯', 'F♯'],
    [KEY_NAMES.C_SHARP_MINOR]: ['C♯', 'D♯', 'E', 'F♯', 'G♯', 'A', 'B♯', 'C♯'],
    [KEY_NAMES.G_SHARP_MINOR]: ['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E', 'F𝄪', 'G♯'],
    [KEY_NAMES.D_SHARP_MINOR]: ['D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B', 'C𝄪', 'D♯'],
    // Flat keys
    [KEY_NAMES.D_MINOR]: ['D', 'E', 'F', 'G', 'A', 'B♭', 'C♯', 'D'],
    [KEY_NAMES.G_MINOR]: ['G', 'A', 'B♭', 'C', 'D', 'E♭', 'F♯', 'G'],
    [KEY_NAMES.C_MINOR]: ['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B', 'C'],
    [KEY_NAMES.F_MINOR]: ['F', 'G', 'A♭', 'B♭', 'C', 'D♭', 'E', 'F'],
    [KEY_NAMES.B_FLAT_MINOR]: ['B♭', 'C', 'D♭', 'E♭', 'F', 'G♭', 'A', 'B♭'],
    [KEY_NAMES.E_FLAT_MINOR]: ['E♭', 'F', 'G♭', 'A♭', 'B♭', 'C♭', 'D', 'E♭']
  },
  descending: {
    [KEY_NAMES.A_MINOR]: ['A', 'G♯', 'F', 'E', 'D', 'C', 'B', 'A'],
    // Sharp keys
    [KEY_NAMES.E_MINOR]: ['E', 'D♯', 'C', 'B', 'A', 'G', 'F♯', 'E'],
    [KEY_NAMES.B_MINOR]: ['B', 'A♯', 'G', 'F♯', 'E', 'D', 'C♯', 'B'],
    [KEY_NAMES.F_SHARP_MINOR]: ['F♯', 'E♯', 'D', 'C♯', 'B', 'A', 'G♯', 'F♯'],
    [KEY_NAMES.C_SHARP_MINOR]: ['C♯', 'B♯', 'A', 'G♯', 'F♯', 'E', 'D♯', 'C♯'],
    [KEY_NAMES.G_SHARP_MINOR]: ['G♯', 'F𝄪', 'E', 'D♯', 'C♯', 'B', 'A♯', 'G♯'],
    [KEY_NAMES.D_SHARP_MINOR]: ['D♯', 'C𝄪', 'B', 'A♯', 'G♯', 'F♯', 'E♯', 'D♯'],
    // Flat keys
    [KEY_NAMES.D_MINOR]: ['D', 'C♯', 'B♭', 'A', 'G', 'F', 'E', 'D'],
    [KEY_NAMES.G_MINOR]: ['G', 'F♯', 'E♭', 'D', 'C', 'B♭', 'A', 'G'],
    [KEY_NAMES.C_MINOR]: ['C', 'B', 'A♭', 'G', 'F', 'E♭', 'D', 'C'],
    [KEY_NAMES.F_MINOR]: ['F', 'E', 'D♭', 'C', 'B♭', 'A♭', 'G', 'F'],
    [KEY_NAMES.B_FLAT_MINOR]: ['B♭', 'A', 'G♭', 'F', 'E♭', 'D♭', 'C', 'B♭'],
    [KEY_NAMES.E_FLAT_MINOR]: ['E♭', 'D', 'C♭', 'B♭', 'A♭', 'G♭', 'F', 'E♭']
  }
} as const
export type AllHarmonicMinorScale = keyof typeof ALL_HARMONIC_MINOR_SCALES.ascending
export type AllHarmonicMinorScaleAscending = (typeof ALL_HARMONIC_MINOR_SCALES.ascending)[AllHarmonicMinorScale]
export type AllHarmonicMinorScaleDescending = (typeof ALL_HARMONIC_MINOR_SCALES.descending)[AllHarmonicMinorScale]

export const ALL_MELODIC_MINOR_SCALES = {
  ascending: {
    [KEY_NAMES.A_MINOR]: ['A', 'B', 'C', 'D', 'E', 'F♯', 'G♯', 'A'],
    // Sharp keys
    [KEY_NAMES.E_MINOR]: ['E', 'F♯', 'G', 'A', 'B', 'C♯', 'D♯', 'E'],
    [KEY_NAMES.B_MINOR]: ['B', 'C♯', 'D', 'E', 'F♯', 'G♯', 'A♯', 'B'],
    [KEY_NAMES.F_SHARP_MINOR]: ['F♯', 'G♯', 'A', 'B', 'C♯', 'D♯', 'E♯', 'F♯'],
    [KEY_NAMES.C_SHARP_MINOR]: ['C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯', 'B♯', 'C♯'],
    [KEY_NAMES.G_SHARP_MINOR]: ['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯', 'F𝄪', 'G♯'],
    [KEY_NAMES.D_SHARP_MINOR]: ['D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯', 'C𝄪', 'D♯'],
    // Flat keys
    [KEY_NAMES.D_MINOR]: ['D', 'E', 'F', 'G', 'A', 'B', 'C♯', 'D'],
    [KEY_NAMES.G_MINOR]: ['G', 'A', 'B♭', 'C', 'D', 'E', 'F♯', 'G'],
    [KEY_NAMES.C_MINOR]: ['C', 'D', 'E♭', 'F', 'G', 'A', 'B', 'C'],
    [KEY_NAMES.F_MINOR]: ['F', 'G', 'A♭', 'B♭', 'C', 'D', 'E', 'F'],
    [KEY_NAMES.B_FLAT_MINOR]: ['B♭', 'C', 'D♭', 'E♭', 'F', 'G', 'A', 'B♭'],
    [KEY_NAMES.E_FLAT_MINOR]: ['E♭', 'F', 'G♭', 'A♭', 'B♭', 'C', 'D', 'E♭']
  },
  descending: {
    [KEY_NAMES.A_MINOR]: ['A', 'G', 'F', 'E', 'D', 'C', 'B', 'A'],
    // Sharp keys
    [KEY_NAMES.E_MINOR]: ['E', 'D', 'C', 'B', 'A', 'G', 'F♯', 'E'],
    [KEY_NAMES.B_MINOR]: ['B', 'A', 'G', 'F♯', 'E', 'D', 'C♯', 'B'],
    [KEY_NAMES.F_SHARP_MINOR]: ['F♯', 'E', 'D', 'C♯', 'B', 'A', 'G♯', 'F♯'],
    [KEY_NAMES.C_SHARP_MINOR]: ['C♯', 'B', 'A', 'G♯', 'F♯', 'E', 'D♯', 'C♯'],
    [KEY_NAMES.G_SHARP_MINOR]: ['G♯', 'F♯', 'E', 'D♯', 'C♯', 'B', 'A♯', 'G♯'],
    [KEY_NAMES.D_SHARP_MINOR]: ['D♯', 'C♯', 'B', 'A♯', 'G♯', 'F♯', 'E♯', 'D♯'],
    // Flat keys
    [KEY_NAMES.D_MINOR]: ['D', 'C', 'B♭', 'A', 'G', 'F', 'E', 'D'],
    [KEY_NAMES.G_MINOR]: ['G', 'F', 'E♭', 'D', 'C', 'B♭', 'A', 'G'],
    [KEY_NAMES.C_MINOR]: ['C', 'B♭', 'A♭', 'G', 'F', 'E♭', 'D', 'C'],
    [KEY_NAMES.F_MINOR]: ['F', 'E♭', 'D♭', 'C', 'B♭', 'A♭', 'G', 'F'],
    [KEY_NAMES.B_FLAT_MINOR]: ['B♭', 'A♭', 'G♭', 'F', 'E♭', 'D♭', 'C', 'B♭'],
    [KEY_NAMES.E_FLAT_MINOR]: ['E♭', 'D♭', 'C♭', 'B♭', 'A♭', 'G♭', 'F', 'E♭']
  }
} as const
export type AllMelodicMinorScale = keyof typeof ALL_MELODIC_MINOR_SCALES.ascending
export type AllMelodicMinorScaleAscending = (typeof ALL_MELODIC_MINOR_SCALES.ascending)[AllMelodicMinorScale]
export type AllMelodicMinorScaleDescending = (typeof ALL_MELODIC_MINOR_SCALES.descending)[AllMelodicMinorScale]

// ======================
// GRADE ONE SCALES
// ======================
export const GRADE_ONE_MAJOR_SCALES = [
  KEY_NAMES.C_MAJOR,
  KEY_NAMES.G_MAJOR,
  KEY_NAMES.D_MAJOR,
  KEY_NAMES.F_MAJOR
] as const
export type GradeOneMajorScale = (typeof GRADE_ONE_MAJOR_SCALES)[number]

export const GRADE_ONE_SCALES = [...GRADE_ONE_MAJOR_SCALES] as const
export type GradeOneScale = (typeof GRADE_ONE_SCALES)[number]

// ======================
// GRADE TWO SCALES
// ======================
export const GRADE_TWO_MAJOR_SCALES = [
  KEY_NAMES.A_MAJOR,
  KEY_NAMES.E_FLAT_MAJOR,
  KEY_NAMES.B_FLAT_MAJOR
] as const
export type GradeTwoMajorScale = (typeof GRADE_TWO_MAJOR_SCALES)[number]

export const GRADE_TWO_MINOR_SCALES = [
  KEY_NAMES.A_MINOR,
  KEY_NAMES.E_MINOR,
  KEY_NAMES.D_MINOR
] as const
export type GradeTwoMinorScale = (typeof GRADE_TWO_MINOR_SCALES)[number]

export const GRADE_TWO_SCALES = [
  ...GRADE_TWO_MAJOR_SCALES,
  ...GRADE_TWO_MINOR_SCALES
] as const
export type GradeTwoScale = (typeof GRADE_TWO_SCALES)[number]

// ======================
// GRADE THREE SCALES
// ======================
export const GRADE_THREE_MAJOR_SCALES = [
  KEY_NAMES.E_MAJOR,
  KEY_NAMES.A_FLAT_MAJOR
] as const
export type GradeThreeMajorScale = (typeof GRADE_THREE_MAJOR_SCALES)[number]

export const GRADE_THREE_MINOR_SCALES = [
  KEY_NAMES.C_SHARP_MINOR,
  KEY_NAMES.F_SHARP_MINOR,
  KEY_NAMES.F_MINOR,
  KEY_NAMES.B_MINOR,
  KEY_NAMES.G_MINOR,
  KEY_NAMES.C_MINOR
] as const
export type GradeThreeMinorScale = (typeof GRADE_THREE_MINOR_SCALES)[number]

export const GRADE_THREE_SCALES = [
  ...GRADE_THREE_MAJOR_SCALES,
  ...GRADE_THREE_MINOR_SCALES
] as const
export type GradeThreeScale = (typeof GRADE_THREE_SCALES)[number]

// ======================
// GRADE FOUR SCALES
// ======================
export const GRADE_FOUR_MAJOR_SCALES = [
  KEY_NAMES.B_MAJOR,
  KEY_NAMES.D_FLAT_MAJOR
] as const
export type GradeFourMajorScale = (typeof GRADE_FOUR_MAJOR_SCALES)[number]

export const GRADE_FOUR_MINOR_SCALES = [
  KEY_NAMES.G_SHARP_MINOR,
  KEY_NAMES.B_FLAT_MINOR
] as const
export type GradeFourMinorScale = (typeof GRADE_FOUR_MINOR_SCALES)[number]

export const GRADE_FOUR_SCALES = [
  ...GRADE_FOUR_MAJOR_SCALES,
  ...GRADE_FOUR_MINOR_SCALES
] as const
export type GradeFourScale = (typeof GRADE_FOUR_SCALES)[number]

// ======================
// GRADE FIVE SCALES
// ======================
export const GRADE_FIVE_MAJOR_SCALES = [
  KEY_NAMES.F_SHARP_MAJOR,
  KEY_NAMES.G_FLAT_MAJOR
] as const
export type GradeFiveMajorScale = (typeof GRADE_FIVE_MAJOR_SCALES)[number]

export const GRADE_FIVE_MINOR_SCALES = [
  KEY_NAMES.D_SHARP_MINOR,
  KEY_NAMES.E_FLAT_MINOR
] as const
export type GradeFiveMinorScale = (typeof GRADE_FIVE_MINOR_SCALES)[number]

export const GRADE_FIVE_SCALES = [
  ...GRADE_FIVE_MAJOR_SCALES,
  ...GRADE_FIVE_MINOR_SCALES
] as const
export type GradeFiveScale = (typeof GRADE_FIVE_SCALES)[number]
