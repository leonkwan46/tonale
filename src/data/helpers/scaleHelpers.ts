import { ALL_HARMONIC_MINOR_SCALES, AllHarmonicMinorScale, ALL_MAJOR_SCALES, AllMajorScale, AllMelodicMinorScale, ALL_MELODIC_MINOR_SCALES } from '../../config/gradeSyllabus/Scales'

export function getScale(key: string, direction: 'ascending' | 'descending' = 'ascending'): readonly string[] {
  return ALL_MAJOR_SCALES[direction][key as AllMajorScale] || []
}

export function getHarmonicMinorScale(key: string, direction: 'ascending' | 'descending' = 'ascending'): readonly string[] {
  return ALL_HARMONIC_MINOR_SCALES[direction][key as AllHarmonicMinorScale] || []
}

export function getMelodicMinorScale(key: string, direction: 'ascending' | 'descending' = 'ascending'): readonly string[] {
  return ALL_MELODIC_MINOR_SCALES[direction][key as AllMelodicMinorScale] || []
}
