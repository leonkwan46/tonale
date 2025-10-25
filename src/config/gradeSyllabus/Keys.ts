import { KEY_NAMES } from '@leonkwan46/music-notation'

// ======================
// GRADE ONE KEYS
// ======================
export const GRADE_ONE_MAJOR_KEYS = [
  KEY_NAMES.C_MAJOR,
  KEY_NAMES.G_MAJOR,
  KEY_NAMES.D_MAJOR,
  KEY_NAMES.F_MAJOR
] as const
export type GradeOneMajorKey = (typeof GRADE_ONE_MAJOR_KEYS)[number]

export const GRADE_ONE_MINOR_KEYS = [
  // No minor keys in Grade 1
] as const
export type GradeOneMinorKey = (typeof GRADE_ONE_MINOR_KEYS)[number]

export const GRADE_ONE_KEYS = [
  ...GRADE_ONE_MAJOR_KEYS,
  ...GRADE_ONE_MINOR_KEYS
] as const
export type GradeOneKey = (typeof GRADE_ONE_KEYS)[number]

export const GRADE_ONE_RELATIVE_KEYS = {} as const
export type GradeOneRelativeKeys = typeof GRADE_ONE_RELATIVE_KEYS

// ======================
// GRADE TWO KEYS
// ======================
export const GRADE_TWO_MAJOR_KEYS = [
  KEY_NAMES.A_MAJOR,
  KEY_NAMES.E_FLAT_MAJOR,
  KEY_NAMES.B_FLAT_MAJOR
] as const
export type GradeTwoMajorKey = (typeof GRADE_TWO_MAJOR_KEYS)[number]

export const GRADE_TWO_MINOR_KEYS = [
  KEY_NAMES.A_MINOR,
  KEY_NAMES.E_MINOR,
  KEY_NAMES.D_MINOR
] as const
export type GradeTwoMinorKey = (typeof GRADE_TWO_MINOR_KEYS)[number]

export const GRADE_TWO_KEYS = [
  ...GRADE_TWO_MAJOR_KEYS,
  ...GRADE_TWO_MINOR_KEYS
] as const
export type GradeTwoKey = (typeof GRADE_TWO_KEYS)[number]

export const GRADE_TWO_RELATIVE_KEYS = {
  [KEY_NAMES.A_MINOR]: KEY_NAMES.C_MAJOR,
  [KEY_NAMES.C_MAJOR]: KEY_NAMES.A_MINOR,
  [KEY_NAMES.E_MINOR]: KEY_NAMES.G_MAJOR,
  [KEY_NAMES.G_MAJOR]: KEY_NAMES.E_MINOR,
  [KEY_NAMES.D_MINOR]: KEY_NAMES.F_MAJOR,
  [KEY_NAMES.F_MAJOR]: KEY_NAMES.D_MINOR
} as const
export type GradeTwoRelativeKeys = typeof GRADE_TWO_RELATIVE_KEYS

// ======================
// GRADE THREE KEYS
// ======================
export const GRADE_THREE_MAJOR_KEYS = [
  KEY_NAMES.E_MAJOR,
  KEY_NAMES.A_FLAT_MAJOR
] as const
export type GradeThreeMajorKey = (typeof GRADE_THREE_MAJOR_KEYS)[number]

export const GRADE_THREE_MINOR_KEYS = [
  KEY_NAMES.C_SHARP_MINOR,
  KEY_NAMES.F_SHARP_MINOR,
  KEY_NAMES.F_MINOR,
  KEY_NAMES.B_MINOR,
  KEY_NAMES.G_MINOR,
  KEY_NAMES.C_MINOR
] as const
export type GradeThreeMinorKey = (typeof GRADE_THREE_MINOR_KEYS)[number]

export const GRADE_THREE_KEYS = [
  ...GRADE_THREE_MAJOR_KEYS,
  ...GRADE_THREE_MINOR_KEYS
] as const
export type GradeThreeKey = (typeof GRADE_THREE_KEYS)[number]

export const GRADE_THREE_RELATIVE_KEYS = {
  [KEY_NAMES.E_MAJOR]: KEY_NAMES.C_SHARP_MINOR,
  [KEY_NAMES.C_SHARP_MINOR]: KEY_NAMES.E_MAJOR,
  [KEY_NAMES.A_FLAT_MAJOR]: KEY_NAMES.F_MINOR,
  [KEY_NAMES.F_MINOR]: KEY_NAMES.A_FLAT_MAJOR,
  [KEY_NAMES.B_MINOR]: KEY_NAMES.D_MAJOR,
  [KEY_NAMES.D_MAJOR]: KEY_NAMES.B_MINOR,
  [KEY_NAMES.G_MINOR]: KEY_NAMES.B_FLAT_MAJOR,
  [KEY_NAMES.B_FLAT_MAJOR]: KEY_NAMES.G_MINOR,
  [KEY_NAMES.C_MINOR]: KEY_NAMES.E_FLAT_MAJOR,
  [KEY_NAMES.E_FLAT_MAJOR]: KEY_NAMES.C_MINOR,
  [KEY_NAMES.F_SHARP_MINOR]: KEY_NAMES.A_MAJOR,
  [KEY_NAMES.A_MAJOR]: KEY_NAMES.F_SHARP_MINOR
} as const
export type GradeThreeRelativeKeys = typeof GRADE_THREE_RELATIVE_KEYS

// ======================
// GRADE FOUR KEYS
// ======================
export const GRADE_FOUR_MAJOR_KEYS = [
  KEY_NAMES.B_MAJOR,
  KEY_NAMES.D_FLAT_MAJOR
] as const
export type GradeFourMajorKey = (typeof GRADE_FOUR_MAJOR_KEYS)[number]

export const GRADE_FOUR_MINOR_KEYS = [
  KEY_NAMES.G_SHARP_MINOR,
  KEY_NAMES.B_FLAT_MINOR
] as const
export type GradeFourMinorKey = (typeof GRADE_FOUR_MINOR_KEYS)[number]

export const GRADE_FOUR_KEYS = [
  ...GRADE_FOUR_MAJOR_KEYS,
  ...GRADE_FOUR_MINOR_KEYS
] as const
export type GradeFourKey = (typeof GRADE_FOUR_KEYS)[number]

export const GRADE_FOUR_RELATIVE_KEYS = {
  [KEY_NAMES.B_MAJOR]: KEY_NAMES.G_SHARP_MINOR,
  [KEY_NAMES.G_SHARP_MINOR]: KEY_NAMES.B_MAJOR,
  [KEY_NAMES.D_FLAT_MAJOR]: KEY_NAMES.B_FLAT_MINOR,
  [KEY_NAMES.B_FLAT_MINOR]: KEY_NAMES.D_FLAT_MAJOR
} as const
export type GradeFourRelativeKeys = typeof GRADE_FOUR_RELATIVE_KEYS

// ======================
// GRADE FIVE KEYS
// ======================
export const GRADE_FIVE_MAJOR_KEYS = [
  KEY_NAMES.F_SHARP_MAJOR,
  KEY_NAMES.G_FLAT_MAJOR
] as const
export type GradeFiveMajorKey = (typeof GRADE_FIVE_MAJOR_KEYS)[number]

export const GRADE_FIVE_MINOR_KEYS = [
  KEY_NAMES.D_SHARP_MINOR,
  KEY_NAMES.E_FLAT_MINOR
] as const
export type GradeFiveMinorKey = (typeof GRADE_FIVE_MINOR_KEYS)[number]

export const GRADE_FIVE_KEYS = [
  ...GRADE_FIVE_MAJOR_KEYS,
  ...GRADE_FIVE_MINOR_KEYS
] as const
export type GradeFiveKey = (typeof GRADE_FIVE_KEYS)[number]

export const GRADE_FIVE_RELATIVE_KEYS = {
  [KEY_NAMES.F_SHARP_MAJOR]: KEY_NAMES.D_SHARP_MINOR,
  [KEY_NAMES.D_SHARP_MINOR]: KEY_NAMES.F_SHARP_MAJOR,
  [KEY_NAMES.G_FLAT_MAJOR]: KEY_NAMES.E_FLAT_MINOR,
  [KEY_NAMES.E_FLAT_MINOR]: KEY_NAMES.G_FLAT_MAJOR
} as const
export type GradeFiveRelativeKeys = typeof GRADE_FIVE_RELATIVE_KEYS

// =========================
// FULL MAP OF RELATIVE KEYS
// =========================
export const FULL_MAP_OF_RELATIVE_KEYS = {
  ...GRADE_ONE_RELATIVE_KEYS,
  ...GRADE_TWO_RELATIVE_KEYS,
  ...GRADE_THREE_RELATIVE_KEYS,
  ...GRADE_FOUR_RELATIVE_KEYS,
  ...GRADE_FIVE_RELATIVE_KEYS
} as const
export type FullMapOfRelativeKeys = typeof FULL_MAP_OF_RELATIVE_KEYS
