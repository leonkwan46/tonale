// Key signature exercise generators
import { CLEFS } from '@leonkwan46/music-notation'
import { getKeys } from '../helpers/exerciseHelpers'
import {
  generateQuestionId,
  generateWrongChoices,
  getRandomItem
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Create a key signature identification question
export const createKeySignatureQuestion = (stage: StageNumber = 1): Question => {
  const keys = getKeys(stage)
  const correctKey = getRandomItem(keys)
  
  // Use full key names for choices (e.g., "C Major", "D Minor")
  const keyNames = keys.map(key => key.toString())
  
  return {
    id: generateQuestionId('key-sig'),
    question: 'What key signature is this?',
    correctAnswer: correctKey.toString(),
    choices: generateWrongChoices(keyNames, correctKey.toString()),
    explanation: `${correctKey.toString()} is one of the Grade 1 key signatures.`,
    type: 'multipleChoice',
    visualComponent: {
      clef: CLEFS.TREBLE,
      elements: [],
      keyName: correctKey
    }
  }
}

// Create multiple key signature questions
export const createKeySignatureQuestions = (questionsCount: number, stage: StageNumber = 1): Question[] => {
  return Array.from({ length: questionsCount }, () => createKeySignatureQuestion(stage))
}
