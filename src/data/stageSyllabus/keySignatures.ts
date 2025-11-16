// Stage One key signatures configuration
import { GRADE_FIVE_KEYS, GRADE_FOUR_KEYS, GRADE_ONE_KEYS, GRADE_ONE_MAJOR_KEYS, GRADE_THREE_KEYS } from '../../config/gradeSyllabus'

export const STAGE_ONE_KEYS = [
  ...GRADE_ONE_KEYS
] as const

export const STAGE_TWO_KEYS = [
  ...GRADE_ONE_MAJOR_KEYS
] as const

export const STAGE_THREE_KEYS = [
  ...GRADE_THREE_KEYS
] as const

export const STAGE_FOUR_KEYS = [
  ...GRADE_FOUR_KEYS
] as const

export const STAGE_FIVE_KEYS = [
  ...GRADE_FIVE_KEYS
] as const
