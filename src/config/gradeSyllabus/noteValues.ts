import { NOTES } from '@leonkwan46/music-notation'

// ======================
// GRADE ONE NOTE VALUES
// ======================
export const GRADE_ONE_NOTE_VALUES = [
    { type: NOTES.SEMIBREVE },
    { type: NOTES.MINIM },
    { type: NOTES.CROTCHET },
    { type: NOTES.QUAVER },
    { type: NOTES.SEMIQUAVER }
] as const
export type GradeOneNoteValue = (typeof GRADE_ONE_NOTE_VALUES)[number]

export const GRADE_ONE_DOTTED_NOTE_VALUES = [
    { type: NOTES.MINIM, dots: 1 },
    { type: NOTES.CROTCHET, dots: 1 },
    { type: NOTES.QUAVER, dots: 1 }
    
] as const
export type GradeOneDottedNoteValue = (typeof GRADE_ONE_DOTTED_NOTE_VALUES)[number]

export const GRADE_ONE_ALL_NOTE_VALUES = [
    ...GRADE_ONE_NOTE_VALUES,
    ...GRADE_ONE_DOTTED_NOTE_VALUES
] as const
export type GradeOneAllNoteValue = (typeof GRADE_ONE_ALL_NOTE_VALUES)[number]

// ======================
// GRADE TWO NOTE VALUES
// ======================
export const GRADE_TWO_DOTTED_NOTE_VALUES = [
    { type: NOTES.SEMIBREVE, dots: 1 }
] as const
export type GradeTwoDottedNoteValue = (typeof GRADE_TWO_DOTTED_NOTE_VALUES)[number]

export const GRADE_TWO_TRIPLET_NOTE_VALUES = [
    { type: NOTES.MINIM, isTuplet: true, numberOfNotes: 3 },
    { type: NOTES.CROTCHET, isTuplet: true, numberOfNotes: 3 },
    { type: NOTES.QUAVER, isTuplet: true, numberOfNotes: 3 },
    { type: NOTES.SEMIQUAVER, isTuplet: true, numberOfNotes: 3 }
] as const
export type GradeTwoTripletNoteValue = (typeof GRADE_TWO_TRIPLET_NOTE_VALUES)[number]

export const GRADE_TWO_ALL_NOTE_VALUES = [
    ...GRADE_TWO_DOTTED_NOTE_VALUES,
    ...GRADE_TWO_TRIPLET_NOTE_VALUES
] as const
export type GradeTwoAllNoteValue = (typeof GRADE_TWO_ALL_NOTE_VALUES)[number]

// ======================
// GRADE THREE NOTE VALUES
// ======================
export const GRADE_THREE_NOTE_VALUES = [
    { type: NOTES.DEMISEMIQUAVER }
] as const
export type GradeThreeNoteValue = (typeof GRADE_THREE_NOTE_VALUES)[number]

export const GRADE_THREE_DOTTED_NOTE_VALUES = [
    { type: NOTES.SEMIQUAVER, dots: 1 }
] as const
export type GradeThreeDottedNoteValue = (typeof GRADE_THREE_DOTTED_NOTE_VALUES)[number]

export const GRADE_THREE_TRIPLET_NOTE_VALUES = [
    { type: NOTES.DEMISEMIQUAVER, isTuplet: true, numberOfNotes: 3 }
] as const
export type GradeThreeTripletNoteValue = (typeof GRADE_THREE_TRIPLET_NOTE_VALUES)[number]

export const GRADE_THREE_ALL_NOTE_VALUES = [
    ...GRADE_THREE_NOTE_VALUES,
    ...GRADE_THREE_DOTTED_NOTE_VALUES,
    ...GRADE_THREE_TRIPLET_NOTE_VALUES
] as const
export type GradeThreeAllNoteValue = (typeof GRADE_THREE_ALL_NOTE_VALUES)[number]

// ======================
// GRADE FOUR NOTE VALUES
// ======================
export const GRADE_FOUR_NOTE_VALUES = [
    { type: NOTES.BREVE }
] as const
export type GradeFourNoteValue = (typeof GRADE_FOUR_NOTE_VALUES)[number]

export const GRADE_FOUR_DOUBLE_DOTTED_NOTE_VALUES = [
    { type: NOTES.BREVE, dots: 2 },
    { type: NOTES.SEMIBREVE, dots: 2 },
    { type: NOTES.MINIM, dots: 2 },
    { type: NOTES.CROTCHET, dots: 2 },
    { type: NOTES.QUAVER, dots: 2 },
    { type: NOTES.SEMIQUAVER, dots: 2 },
    { type: NOTES.DEMISEMIQUAVER, dots: 2 }
] as const
export type GradeFourDoubleDottedNoteValue = (typeof GRADE_FOUR_DOUBLE_DOTTED_NOTE_VALUES)[number]

export const GRADE_FOUR_DUPLET_NOTE_VALUES = [
    { type: NOTES.BREVE, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.SEMIBREVE, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.MINIM, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.CROTCHET, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.QUAVER, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.SEMIQUAVER, isTuplet: true, numberOfNotes: 2 },
    { type: NOTES.DEMISEMIQUAVER, isTuplet: true, numberOfNotes: 2 }
] as const
export type GradeFourDupletNoteValue = (typeof GRADE_FOUR_DUPLET_NOTE_VALUES)[number]

export const GRADE_FOUR_ALL_NOTE_VALUES = [
    ...GRADE_FOUR_NOTE_VALUES,
    ...GRADE_FOUR_DOUBLE_DOTTED_NOTE_VALUES,
    ...GRADE_FOUR_DUPLET_NOTE_VALUES
] as const
export type GradeFourAllNoteValue = (typeof GRADE_FOUR_ALL_NOTE_VALUES)[number]

// ======================
// GRADE FIVE NOTE VALUES
// ======================
export const GRADE_FIVE_QUINTUPLET_NOTE_VALUES = [
    { type: NOTES.BREVE, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.SEMIBREVE, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.MINIM, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.CROTCHET, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.QUAVER, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.SEMIQUAVER, isTuplet: true, numberOfNotes: 5 },
    { type: NOTES.DEMISEMIQUAVER, isTuplet: true, numberOfNotes: 5 }
] as const
export type GradeFiveQuintupletNoteValue = (typeof GRADE_FIVE_QUINTUPLET_NOTE_VALUES)[number]

export const GRADE_FIVE_SEXTUPLET_NOTE_VALUES = [
    { type: NOTES.BREVE, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.SEMIBREVE, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.MINIM, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.CROTCHET, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.QUAVER, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.SEMIQUAVER, isTuplet: true, numberOfNotes: 6 },
    { type: NOTES.DEMISEMIQUAVER, isTuplet: true, numberOfNotes: 6 }
] as const
export type GradeFiveSextupletNoteValue = (typeof GRADE_FIVE_SEXTUPLET_NOTE_VALUES)[number]

export const GRADE_FIVE_ALL_NOTE_VALUES = [
    ...GRADE_FIVE_QUINTUPLET_NOTE_VALUES,
    ...GRADE_FIVE_SEXTUPLET_NOTE_VALUES
] as const
export type GradeFiveAllNoteValue = (typeof GRADE_FIVE_ALL_NOTE_VALUES)[number]
