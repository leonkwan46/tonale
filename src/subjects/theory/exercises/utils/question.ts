import { randomUUID } from 'expo-crypto'
export { capitalize } from '@/utils/string'

export const THEORY_QUESTION_ID_PREFIX = {
  NOTE_VALUE_NAME: 'note-value-name',
  REST_VALUE_NAME: 'rest-value-name',
  NOTE_VALUE_BEATS: 'note-value-beats',
  REST_VALUE_BEATS: 'rest-value-beats',
  ACCIDENTAL: 'accidental',
  NOTE_IDENTIFICATION: 'note-identification',
  KEY_SIGNATURE: 'key-signature',
  TIME_SIGNATURE: 'time-signature',
  MUSICAL_TERM: 'musical-term',
  TRIAD: 'triad',
  NOTE_GROUPING: 'note-grouping',
  SCALE_DEGREE: 'scale-degree',
  SEMITONE_TONE: 'semitone-tone',
  INTERVAL: 'interval',
  TIE: 'tie',
  SLUR: 'slur'
} as const

export const AURAL_QUESTION_ID_PREFIX = {
  RHYTHM_ECHO: 'rhythm-echo'
} as const

export const getRandomItem = <T>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

export const generateWrongChoices = (
  allOptions: string[], 
  correctAnswer: string, 
  wrongChoicesCount: number = 3,
  preserveOrder: boolean = false
): string[] => {
  if (preserveOrder) return allOptions
  
  const wrongChoices = shuffleArray(allOptions
    .filter(option => option !== correctAnswer)
    .sort((a, b) => a.localeCompare(b))
  )
    .slice(0, wrongChoicesCount)
  
  return [...wrongChoices, correctAnswer]
    .sort(() => Math.random() - 0.5)
}

export const generateQuestionId = (prefix: string): string => {
  return `${prefix}-${randomUUID()}`
}

export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5)
}
