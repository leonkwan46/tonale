// Interval exercise generators
import { NOTES } from '@leonkwan46/music-notation'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Interval definitions for GRADE 1
const INTERVAL_DEFINITIONS = {
  '2nd': 'Second',
  '3rd': 'Third', 
  '4th': 'Fourth',
  '5th': 'Fifth',
  '6th': 'Sixth',
  '7th': 'Seventh',
  '8th': 'Octave'
} as const

// Create an interval identification question
export const createIntervalQuestion = (stage: StageNumber): Question => {
  const intervals = Object.keys(INTERVAL_DEFINITIONS)
  const correctInterval = getRandomItem(intervals)
  const correctDefinition = INTERVAL_DEFINITIONS[correctInterval as keyof typeof INTERVAL_DEFINITIONS]
  
  return {
    id: generateQuestionId('interval'),
    question: 'What interval is this above the tonic?',
    correctAnswer: correctDefinition,
    choices: generateWrongChoices(Object.values(INTERVAL_DEFINITIONS), correctDefinition),
    explanation: `The interval above the tonic is a ${correctDefinition} (${correctInterval}).`,
    type: 'multipleChoice',
    visualComponent: {
      clef: 'treble',
      elements: [
        { pitch: 'C4', type: NOTES.CROTCHET },
        { pitch: getIntervalPitch('C4', correctInterval), type: NOTES.CROTCHET }
      ]
    }
  }
}

// Helper function to get the pitch for a given interval above a tonic
const getIntervalPitch = (tonic: string, interval: string): string => {
  const pitchMap: Record<string, Record<string, string>> = {
    'C4': {
      '2nd': 'D4',
      '3rd': 'E4', 
      '4th': 'F4',
      '5th': 'G4',
      '6th': 'A4',
      '7th': 'B4',
      '8th': 'C5'
    }
  }
  
  return pitchMap[tonic]?.[interval] || 'C4'
}

// Create multiple interval questions
export const createIntervalQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return Array.from({ length: questionsCount }, () => createIntervalQuestion(stage))
}
