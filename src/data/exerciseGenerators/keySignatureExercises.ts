import { CLEFS, type KeyName } from '@leonkwan46/music-notation'
import { getKeys } from '../helpers/exerciseHelpers'
import {
  generateMultipleChoiceOptions,
  generateQuestionId,
  selectRandomItems
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

const isSameKey = (key1: KeyName, key2: KeyName): boolean => {
  return key1 === key2
}

const buildQuestion = (keyToTest: KeyName, stage: StageNumber): Question => {
  return {
    id: generateQuestionId('key-sig'),
    question: 'What key signature is this?',
    correctAnswer: keyToTest,
    choices: generateMultipleChoiceOptions(
      getKeys(stage),
      keyToTest
    ),
    explanation: `${keyToTest} is one of the Grade 1 key signatures.`,
    type: 'multipleChoice',
    visualComponent: {
      clef: CLEFS.TREBLE,
      elements: [],
      keyName: keyToTest
    }
  }
}

export const createKeySignatureQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const availableKeys = getKeys(stage)
  const keysToTest = selectRandomItems(availableKeys, questionsCount, isSameKey)
  return keysToTest.map(keyToTest => buildQuestion(keyToTest, stage))
}

