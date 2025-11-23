import { FOUR_FOUR_QUESTIONS, THREE_FOUR_QUESTIONS, TWO_FOUR_QUESTIONS } from './customGroupingQuestions'

export const STAGE_TWO_GROUPING_QUESTIONS = [
  ...TWO_FOUR_QUESTIONS,
  ...THREE_FOUR_QUESTIONS,
  ...FOUR_FOUR_QUESTIONS
] as const

// Future stages can be added here as needed
// export const STAGE_THREE_GROUPING_QUESTIONS = [
//   // Add stage three questions here
// ] as const

