// Stage One time signatures configuration
import { COMMON_TIME, createTimeSignature, CUT_TIME } from '@leonkwan46/music-notation'

export const STAGE_ONE_TIME_SIGNATURES = [
  createTimeSignature(2, 4),
  createTimeSignature(3, 4),
  createTimeSignature(4, 4),
  COMMON_TIME
]

export const STAGE_TWO_TIME_SIGNATURES = [
  createTimeSignature(2, 4),
  createTimeSignature(3, 4),
  createTimeSignature(4, 4),
  createTimeSignature(3, 8),
  createTimeSignature(2, 2),
  createTimeSignature(3, 2),
  createTimeSignature(4, 2),
  COMMON_TIME,
  CUT_TIME
]

export const STAGE_THREE_TIME_SIGNATURES = [
  createTimeSignature(2, 4),
  createTimeSignature(3, 4),
  createTimeSignature(4, 4),
  createTimeSignature(3, 8),
  createTimeSignature(2, 2),
  createTimeSignature(3, 2),
  createTimeSignature(4, 2),
  createTimeSignature(6, 8),
  createTimeSignature(9, 8),
  createTimeSignature(12, 8),
  COMMON_TIME,
  CUT_TIME
]