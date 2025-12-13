export const QUESTION_TYPE = {
  MULTIPLE_CHOICE: 'multipleChoice' as const,
  TRUE_FALSE: 'trueFalse' as const,
  KEY_PRESS: 'keyPress' as const,
  RHYTHM_TAP: 'rhythmTap' as const
}

export type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE]
