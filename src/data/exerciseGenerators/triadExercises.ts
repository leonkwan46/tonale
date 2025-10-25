// Triad exercise generators
import { NOTES } from '@leonkwan46/music-notation'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Triad definitions for GRADE 1 (tonic triads in root position)
const TRIAD_DEFINITIONS = {
  'C major': 'C-E-G',
  'G major': 'G-B-D',
  'D major': 'D-F#-A',
  'F major': 'F-A-C'
} as const

// Create a triad identification question
export const createTriadQuestion = (stage: StageNumber): Question => {
  const triads = Object.keys(TRIAD_DEFINITIONS)
  const correctTriad = getRandomItem(triads)
  const correctDefinition = TRIAD_DEFINITIONS[correctTriad as keyof typeof TRIAD_DEFINITIONS]
  
  return {
    id: generateQuestionId('triad'),
    question: 'What are the notes in this tonic triad?',
    correctAnswer: correctDefinition,
    choices: generateWrongChoices(Object.values(TRIAD_DEFINITIONS), correctDefinition),
    explanation: `The ${correctTriad} tonic triad consists of ${correctDefinition}.`,
    type: 'multipleChoice',
    visualComponent: {
      clef: 'treble',
      elements: [
        { pitch: getTriadNotes(correctTriad)[0], type: NOTES.CROTCHET },
        { pitch: getTriadNotes(correctTriad)[1], type: NOTES.CROTCHET },
        { pitch: getTriadNotes(correctTriad)[2], type: NOTES.CROTCHET }
      ]
    }
  }
}

// Helper function to get the notes for a given triad
const getTriadNotes = (triad: string): string[] => {
  const triadMap: Record<string, string[]> = {
    'C major': ['C4', 'E4', 'G4'],
    'G major': ['G4', 'B4', 'D5'],
    'D major': ['D4', 'F#4', 'A4'],
    'F major': ['F4', 'A4', 'C5']
  }
  
  return triadMap[triad] || ['C4', 'E4', 'G4']
}

// Create multiple triad questions
export const createTriadQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return Array.from({ length: questionsCount }, () => createTriadQuestion(stage))
}
