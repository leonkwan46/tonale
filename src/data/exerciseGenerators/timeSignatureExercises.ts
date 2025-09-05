// Time signature exercise generators
import {
    generateQuestionId,
    generateWrongChoices,
    getGrade1TimeSignatures,
    getRandomItem
} from '../helpers/questionHelpers'
import { Question } from '../theoryData/types'

// Create a time signature identification question
export const createTimeSignatureQuestion = (): Question => {
  const timeSignatures = getGrade1TimeSignatures()
  const correctTimeSig = getRandomItem(timeSignatures)
  
  return {
    id: generateQuestionId('time-sig'),
    question: `What time signature is this?`,
    correctAnswer: correctTimeSig,
    choices: generateWrongChoices(timeSignatures, correctTimeSig),
    explanation: `${correctTimeSig} means ${correctTimeSig.split('/')[0]} beats per measure.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'staff',
      clef: 'treble',
      notes: [],
      timeSignature: correctTimeSig
    }
  }
}

// Create multiple time signature questions
export const createTimeSignatureQuestions = (count: number): Question[] => {
  return Array.from({ length: count }, () => createTimeSignatureQuestion())
}
