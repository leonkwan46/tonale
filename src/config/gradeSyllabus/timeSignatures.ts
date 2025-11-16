import { COMMON_TIME, createTimeSignature, CUT_TIME } from '@leonkwan46/music-notation'

// ==========
// GRADE ONE
// ==========
export const GRADE_ONE_TIME_SIGNATURES = [
  createTimeSignature(2, 4),
  createTimeSignature(3, 4),
  createTimeSignature(4, 4),
  COMMON_TIME
]
export type GradeOneTimeSignature = (typeof GRADE_ONE_TIME_SIGNATURES)[number]

// ==========
// GRADE TWO
// ==========
export const GRADE_TWO_TIME_SIGNATURES = [
  createTimeSignature(3, 8),
  createTimeSignature(2, 2),
  createTimeSignature(3, 2),
  createTimeSignature(4, 2),
  CUT_TIME
]
export type GradeTwoTimeSignature = (typeof GRADE_TWO_TIME_SIGNATURES)[number]

// ===========
// GRADE THREE
// ===========
export const GRADE_THREE_TIME_SIGNATURES = [
  createTimeSignature(6, 8),
  createTimeSignature(9, 8),
  createTimeSignature(12, 8)
]
export type GradeThreeTimeSignature = (typeof GRADE_THREE_TIME_SIGNATURES)[number]

// ==========
// GRADE FOUR
// ==========
export const GRADE_FOUR_TIME_SIGNATURES = [
  createTimeSignature(4, 8),
  createTimeSignature(6, 4),
  createTimeSignature(9, 4),
  createTimeSignature(6, 16),
  createTimeSignature(9, 16),
  createTimeSignature(12, 16)
]
export type GradeFourTimeSignature = (typeof GRADE_FOUR_TIME_SIGNATURES)[number]

// ==========
// GRADE FIVE
// ==========
export const GRADE_FIVE_TIME_SIGNATURES = [
  createTimeSignature(5, 4),
  createTimeSignature(7, 4),
  createTimeSignature(5, 8),
  createTimeSignature(7, 8)
]
export type GradeFiveTimeSignature = (typeof GRADE_FIVE_TIME_SIGNATURES)[number]
