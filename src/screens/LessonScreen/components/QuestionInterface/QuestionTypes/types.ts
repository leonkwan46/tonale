export const QUESTION_TYPE = {
  PLAYBACK: 'playback' as const,
  NOTATION: 'notation' as const,
  SYMBOLS: 'symbols' as const
}

export type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE]
