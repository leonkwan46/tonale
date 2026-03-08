import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'
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

export const createNoteValueNameQuestions = (questionsCount: number, stage: StageNumber, layoutType?: 'grid' | 'row'): Question[] => {
  const stageNoteTypes = getAllNoteTypes(stage)

  const noteNameQuestions = stageNoteTypes.map(noteType =>
    createNoteValueQuestion(stage, noteType, layoutType)
  )

  const noteValueQuestions = stageNoteTypes.map(noteType =>
      createValueBeatQuestion({
        stage,
        timeValue: noteType,
        isRest: false,
        choiceStages: [0],
        layoutType
    })
  )

  const uniquePool = [
    ...noteNameQuestions,
    ...noteValueQuestions
  ]

  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}

