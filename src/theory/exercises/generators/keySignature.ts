import { CLEFS } from '@leonkwan46/music-notation'
import type { Question, StageNumber } from '@types'
import { generateQuestionsFromPool, getKeys } from '../utils/exercise'
import {
  generateQuestionId,
  generateWrongChoices
} from '../utils/question'
import { generateExplanation } from '../utils/explanation'

type StageKey = ReturnType<typeof getKeys>[number]

export const createKeySignatureQuestion = (stage: StageNumber, key?: StageKey): Question => {
  const keys = getKeys(stage)
  const correctKey = key || keys[0]
  const keyNames = keys.map(k => k.toString())
  
  const visualComponent = {
    clef: CLEFS.TREBLE,
    size: 'xs' as const,
    elements: [],
    keyName: correctKey
  }
  
  return {
    id: generateQuestionId('key-sig'),
    question: 'What key signature is this?',
    correctAnswer: correctKey.toString(),
    choices: generateWrongChoices(keyNames, correctKey.toString()),
    explanation: generateExplanation('keySignature', {
      correctAnswer: correctKey.toString(),
      key: correctKey
    }, visualComponent),
    type: 'multipleChoice',
    visualComponent
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
