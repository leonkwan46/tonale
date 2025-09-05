// Musical terms exercise generators
import {
    generateQuestionId,
    generateWrongChoices,
    getRandomItem
} from '../helpers/questionHelpers'
import { Question } from '../theoryData/types'

// Grade 1 musical terms
const GRADE_1_TERMS = {
  'Allegro': 'Fast tempo',
  'Andante': 'Walking pace',
  'Piano': 'Soft',
  'Forte': 'Loud',
  'Crescendo': 'Gradually getting louder',
  'Diminuendo': 'Gradually getting softer',
  'Legato': 'Smooth and connected',
  'Staccato': 'Short and detached'
}

// Create a musical term question
export const createMusicalTermQuestion = (): Question => {
  const terms = Object.keys(GRADE_1_TERMS)
  const correctTerm = getRandomItem(terms)
  const correctDefinition = GRADE_1_TERMS[correctTerm as keyof typeof GRADE_1_TERMS]
  
  return {
    id: generateQuestionId('musical-term'),
    question: `What does "${correctTerm}" mean?`,
    correctAnswer: correctDefinition,
    choices: generateWrongChoices(Object.values(GRADE_1_TERMS), correctDefinition),
    explanation: `"${correctTerm}" means ${correctDefinition.toLowerCase()}.`,
    type: 'multipleChoice'
  }
}

// Create multiple musical term questions
export const createMusicalTermQuestions = (count: number): Question[] => {
  return Array.from({ length: count }, () => createMusicalTermQuestion())
}
