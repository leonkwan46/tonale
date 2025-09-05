// Key signature exercise generators
import {
    generateQuestionId,
    generateWrongChoices,
    getGrade1Keys,
    getRandomItem
} from '../helpers/questionHelpers'
import { Question } from '../theoryData/types'

// Create a key signature identification question
export const createKeySignatureQuestion = (): Question => {
  const keys = getGrade1Keys()
  const correctKey = getRandomItem(keys)
  
  return {
    id: generateQuestionId('key-sig'),
    question: `What key signature is this?`,
    correctAnswer: correctKey,
    choices: generateWrongChoices(keys, correctKey),
    explanation: `${correctKey} is one of the Grade 1 key signatures.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'staff',
      clef: 'treble',
      notes: [],
      timeSignature: '4/4',
      keyName: correctKey
    }
  }
}

// Create multiple key signature questions
export const createKeySignatureQuestions = (count: number): Question[] => {
  return Array.from({ length: count }, () => createKeySignatureQuestion())
}
