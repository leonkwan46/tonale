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
    title: 'What key signature is this?',
    correctAnswer: correctKey.toString(),
    choices: generateWrongChoices(keyNames, correctKey.toString()),
    explanation: `${correctKey.toString()} is one of the Grade 1 key signatures.`,
    answerInterface: 'multipleChoice',
    questionInterface: {
      clef: CLEFS.TREBLE,
      elements: [],
      keyName: correctKey
    }
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  if (typeof question.correctAnswer === 'string') {
    return question.correctAnswer
  }

  const questionInterface = question.questionInterface
  const keyName =
    questionInterface && 'keyName' in questionInterface
      ? (questionInterface as { keyName?: unknown }).keyName
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
