// ======================
// GRADE ONE INTERVALS
// ======================
export const GRADE_ONE_INTERVALS = [
    '2nd', '3rd', '4th', '5th', '6th', '7th', '8ve'
] as const
export type GradeOneInterval = (typeof GRADE_ONE_INTERVALS)[number]

// ======================
// GRADE TWO INTERVALS
// ======================
export const GRADE_TWO_INTERVALS = [
    '2nd', '3rd', '4th', '5th', '6th', '7th', '8ve'
] as const
export type GradeTwoInterval = (typeof GRADE_TWO_INTERVALS)[number]

// ======================
// GRADE THREE INTERVALS
// ======================
export const GRADE_THREE_INTERVALS = [
    'Major 2nd',
    'Minor 3rd', 'Major 3rd',
    'Perfect 4th',
    'Perfect 5th', 
    'Minor 6th', 'Major 6th',
    'Minor 7th', 'Major 7th',
    'Perfect Octave'
] as const
export type GradeThreeInterval = (typeof GRADE_THREE_INTERVALS)[number]

// ======================
// GRADE FOUR INTERVALS
// ======================
export const GRADE_FOUR_INTERVALS = [
    'Minor 2nd',
    'Augmented 2nd',
    'Augmented 4th',
    'Diminished 4th',
    'Augmented 5th',
    'Diminished 5th',
    'Diminished 7th'
] as const
export type GradeFourInterval = (typeof GRADE_FOUR_INTERVALS)[number]

// ======================
// GRADE FIVE INTERVALS
// ======================
export const GRADE_FIVE_CHROMATIC_INTERVALS = [
    'Augmented 3rd',
    'Diminished 3rd',
    'Augmented 6th',
    'Diminished 6th',
    'Augmented 7th',
    'Augmented 8ve',
    'Diminished 8ve'
] as const
export type GradeFiveChromaticInterval = (typeof GRADE_FIVE_CHROMATIC_INTERVALS)[number]

export const GRADE_FIVE_COMPOUND_INTERVALS = [
    'Compound Minor 2nd', 'Compound Major 2nd',
    'Compound Minor 3rd', 'Compound Major 3rd',
    'Compound Minor 4th', 'Compound Major 4th',
    'Compound Minor 5th', 'Compound Major 5th',
    'Compound Minor 6th', 'Compound Major 6th',
    'Compound Minor 7th', 'Compound Major 7th',
    'Compound Minor 8ve', 'Compound Major 8ve'
] as const
export type GradeFiveCompoundInterval = (typeof GRADE_FIVE_COMPOUND_INTERVALS)[number]

export const GRADE_FIVE_COMPOUND_ALTERNATIVE_INTERVALS = [
    'Minor 9th', 'Major 9th',
    'Minor 10th', 'Major 10th',
    'Minor 11th', 'Major 11th',
    'Minor 12th', 'Major 12th',
    'Minor 13th', 'Major 13th',
    'Minor 14th', 'Major 14th',
    'Minor 15th', 'Major 15th'
] as const
export type GradeFiveCompoundAlternativeInterval = (typeof GRADE_FIVE_COMPOUND_ALTERNATIVE_INTERVALS)[number]

export const GRADE_FIVE_INTERVALS = [
    ...GRADE_FIVE_CHROMATIC_INTERVALS,
    ...GRADE_FIVE_COMPOUND_INTERVALS,
    ...GRADE_FIVE_COMPOUND_ALTERNATIVE_INTERVALS
] as const
export type GradeFiveInterval = (typeof GRADE_FIVE_INTERVALS)[number]
