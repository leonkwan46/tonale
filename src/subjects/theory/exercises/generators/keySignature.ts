import { CLEFS } from '@leonkwan46/music-notation'
import { Question, StageNumber } from '../../curriculum/types'
import { generateQuestionsFromPool, getKeys } from '../utils/exercise'
import {
  generateQuestionId,
  generateWrongChoices
} from '../utils/question'

type StageKey = ReturnType<typeof getKeys>[number]

export const createKeySignatureQuestion = (stage: StageNumber, key?: StageKey): Question => {
  const keys = getKeys(stage)
  const correctKey = key || keys[0]
  const keyNames = keys.map(k => k.toString())
  
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

const getDuplicateIdentifier = (question: Question): string | null => {
  if (question.correctAnswer) {
    return question.correctAnswer
  }

  const visualComponent = question.visualComponent
  const keyName =
    visualComponent && 'keyName' in visualComponent
      ? (visualComponent as { keyName?: unknown }).keyName
      : undefined

  if (typeof keyName === 'string') {
    return keyName
  }

  if (
    keyName &&
    typeof keyName === 'object' &&
    'toString' in keyName &&
    typeof keyName.toString === 'function'
  ) {
    return keyName.toString()
  }

  return null
}

export const createKeySignatureQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const keys = getKeys(stage)
  const uniquePool = keys.map(key => 
    createKeySignatureQuestion(stage, key)
  )
  
  const deduplicationWindow = uniquePool.length <= 4 ? 1 : undefined
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier, { deduplicationWindow })
}
