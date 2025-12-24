import type { Question, StageNumber } from '@types'
import {
  generateQuestionsFromPool,
  getAllNoteTypes,
  getQuestionTypeFromId,
  getTimeValueKeyFromComponent,
  getValueKindFromId
} from '../utils/exercise'
import { createValueBeatQuestion } from '../utils/timeValueQuestion'
import { createNoteValueQuestion } from './utils/noteValue'

const getDuplicateIdentifier = (question: Question): string | null => {
  const typeKey = getTimeValueKeyFromComponent(question)
  if (!typeKey) return null
  
  const questionType = getQuestionTypeFromId(question.id)
  const valueKind = getValueKindFromId(question.id)
  
  return `${typeKey}|${questionType}|${valueKind}`
}

export const createNoteValueNameQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const stageNoteTypes = getAllNoteTypes(stage)

  const noteNameQuestions = stageNoteTypes.map(noteType =>
    createNoteValueQuestion(stage, noteType)
  )

  const noteValueQuestions = stageNoteTypes.map(noteType =>
      createValueBeatQuestion({
        stage,
        timeValue: noteType,
        isRest: false,
        choiceStages: [0]
    })
  )

  const uniquePool = [
    ...noteNameQuestions,
    ...noteValueQuestions
  ]

  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}

