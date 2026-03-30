import { ALL_HARMONIC_MINOR_SCALES, ALL_MAJOR_SCALES, ALL_MELODIC_MINOR_SCALES, AllHarmonicMinorScale, AllMajorScale, AllMelodicMinorScale } from '@/config/gradeSyllabus/scales'

export const getScale = (
  key: string,
  direction: 'ascending' | 'descending' = 'ascending'
): readonly string[] =>
  ALL_MAJOR_SCALES[direction][key as AllMajorScale] ||
  ALL_HARMONIC_MINOR_SCALES[direction][key as AllHarmonicMinorScale] ||
  ALL_MELODIC_MINOR_SCALES[direction][key as AllMelodicMinorScale] ||
  []

export const getHarmonicMinorScale = (
  key: string,
  direction: 'ascending' | 'descending' = 'ascending'
): readonly string[] =>
  ALL_HARMONIC_MINOR_SCALES[direction][key as AllHarmonicMinorScale] || []

export const getMelodicMinorScale = (
  key: string,
  direction: 'ascending' | 'descending' = 'ascending'
): readonly string[] =>
  ALL_MELODIC_MINOR_SCALES[direction][key as AllMelodicMinorScale] || []
