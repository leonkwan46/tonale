import { NOTES } from '@leonkwan46/music-notation'

// ======================
// GRADE ONE TIME VALUES
// ======================
export const GRADE_ONE_TIME_VALUES = [
    { type: NOTES.SEMIBREVE },
    { type: NOTES.MINIM },
    { type: NOTES.CROTCHET },
    { type: NOTES.QUAVER },
    { type: NOTES.SEMIQUAVER }
] as const
export type GradeOneTimeValue = (typeof GRADE_ONE_TIME_VALUES)[number]

export const GRADE_ONE_DOTTED_TIME_VALUES = [
    { type: NOTES.MINIM, dots: 1 },
    { type: NOTES.CROTCHET, dots: 1 },
    { type: NOTES.QUAVER, dots: 1 }
    
] as const
export type GradeOneDottedTimeValue = (typeof GRADE_ONE_DOTTED_TIME_VALUES)[number]

export const GRADE_ONE_ALL_TIME_VALUES = [
    ...GRADE_ONE_TIME_VALUES,
    ...GRADE_ONE_DOTTED_TIME_VALUES
] as const
export type GradeOneAllTimeValue = (typeof GRADE_ONE_ALL_TIME_VALUES)[number]

// ======================
// GRADE TWO TIME VALUES
// ======================
export const GRADE_TWO_DOTTED_TIME_VALUES = [
    { type: NOTES.SEMIBREVE, dots: 1 }
] as const
export type GradeTwoDottedTimeValue = (typeof GRADE_TWO_DOTTED_TIME_VALUES)[number]

export const GRADE_TWO_TRIPLET_TIME_VALUES = [
    { type: NOTES.MINIM, isTuplet: true, numberOfNotes: 3 },
    { type: NOTES.CROTCHET, isTuplet: true, numberOfNotes: 3 },
    { type: NOTES.QUAVER, isTuplet: true, numberOfNotes: 3 },
    { type: NOTES.SEMIQUAVER, isTuplet: true, numberOfNotes: 3 }
] as const
export type GradeTwoTripletTimeValue = (typeof GRADE_TWO_TRIPLET_TIME_VALUES)[number]

export const GRADE_TWO_ALL_TIME_VALUES = [
    ...GRADE_TWO_DOTTED_TIME_VALUES,
    ...GRADE_TWO_TRIPLET_TIME_VALUES
] as const
export type GradeTwoAllTimeValue = (typeof GRADE_TWO_ALL_TIME_VALUES)[number]

// ======================
// GRADE THREE TIME VALUES
// ======================
export const GRADE_THREE_TIME_VALUES = [
    { type: NOTES.DEMISEMIQUAVER }
] as const
export type GradeThreeTimeValue = (typeof GRADE_THREE_TIME_VALUES)[number]

export const GRADE_THREE_DOTTED_TIME_VALUES = [
    { type: NOTES.SEMIQUAVER, dots: 1 }
] as const
export type GradeThreeDottedTimeValue = (typeof GRADE_THREE_DOTTED_TIME_VALUES)[number]

export const GRADE_THREE_TRIPLET_TIME_VALUES = [
    { type: NOTES.DEMISEMIQUAVER, isTuplet: true, numberOfNotes: 3 }
] as const
export type GradeThreeTripletTimeValue = (typeof GRADE_THREE_TRIPLET_TIME_VALUES)[number]

export const GRADE_THREE_ALL_TIME_VALUES = [
    ...GRADE_THREE_TIME_VALUES,
    ...GRADE_THREE_DOTTED_TIME_VALUES,
    ...GRADE_THREE_TRIPLET_TIME_VALUES
] as const
export type GradeThreeAllTimeValue = (typeof GRADE_THREE_ALL_TIME_VALUES)[number]

// ======================
// GRADE FOUR TIME VALUES
// ======================
export const GRADE_FOUR_TIME_VALUES = [
    { type: NOTES.BREVE }
] as const
export type GradeFourTimeValue = (typeof GRADE_FOUR_TIME_VALUES)[number]

export const GRADE_FOUR_DOUBLE_DOTTED_TIME_VALUES = [
    { type: NOTES.BREVE, dots: 2 },
    { type: NOTES.SEMIBREVE, dots: 2 },
    { type: NOTES.MINIM, dots: 2 },
    { type: NOTES.CROTCHET, dots: 2 },
    { type: NOTES.QUAVER, dots: 2 },
    { type: NOTES.SEMIQUAVER, dots: 2 },
    { type: NOTES.DEMISEMIQUAVER, dots: 2 }
] as const
export type GradeFourDoubleDottedTimeValue = (typeof GRADE_FOUR_DOUBLE_DOTTED_TIME_VALUES)[number]

export const GRADE_FOUR_DUPLET_TIME_VALUES = [
    { type: NOTES.BREVE, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.SEMIBREVE, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.MINIM, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.CROTCHET, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.QUAVER, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.SEMIQUAVER, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.DEMISEMIQUAVER, isTuplet: true, numberOfNotes: 2 }
] as const
export type GradeFourDupletTimeValue = (typeof GRADE_FOUR_DUPLET_TIME_VALUES)[number]

export const GRADE_FOUR_ALL_TIME_VALUES = [
    ...GRADE_FOUR_TIME_VALUES,
    ...GRADE_FOUR_DOUBLE_DOTTED_TIME_VALUES,
    ...GRADE_FOUR_DUPLET_TIME_VALUES
] as const
export type GradeFourAllTimeValue = (typeof GRADE_FOUR_ALL_TIME_VALUES)[number]

// ======================
// GRADE FIVE TIME VALUES
// ======================
export const GRADE_FIVE_QUINTUPLET_TIME_VALUES = [
    { type: NOTES.BREVE, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.SEMIBREVE, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.MINIM, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.CROTCHET, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.QUAVER, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.SEMIQUAVER, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.DEMISEMIQUAVER, isTuplet: true, numberOfNotes: 5 }
] as const
export type GradeFiveQuintupletTimeValue = (typeof GRADE_FIVE_QUINTUPLET_TIME_VALUES)[number]

export const GRADE_FIVE_SEXTUPLET_TIME_VALUES = [
    { type: NOTES.BREVE, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.SEMIBREVE, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.MINIM, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.CROTCHET, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.QUAVER, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.SEMIQUAVER, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.DEMISEMIQUAVER, isTuplet: true, numberOfNotes: 6 }
] as const
export type GradeFiveSextupletTimeValue = (typeof GRADE_FIVE_SEXTUPLET_TIME_VALUES)[number]

export const GRADE_FIVE_ALL_TIME_VALUES = [
    ...GRADE_FIVE_QUINTUPLET_TIME_VALUES,
    ...GRADE_FIVE_SEXTUPLET_TIME_VALUES
] as const
export type GradeFiveAllTimeValue = (typeof GRADE_FIVE_ALL_TIME_VALUES)[number]
