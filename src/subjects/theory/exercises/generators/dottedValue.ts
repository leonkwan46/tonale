import { 
  generateQuestionsFromPool, 
  getAllNoteTypes, 
  getAllRestTypes,
  getTimeValueKeyFromComponent,
  getQuestionTypeFromId,
  getValueKindFromId
} from '../utils/exercise'
import { createValueBeatQuestion } from '../utils/timeValueQuestion'
import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'
import { createNoteValueQuestion } from './utils/noteValue'
import { createRestValueQuestion } from './utils/restValue'

const getDuplicateIdentifier = (question: Question): string | null => {
  const typeKey = getTimeValueKeyFromComponent(question)
  if (!typeKey) return null
  
  const questionType = getQuestionTypeFromId(question.id)
  const valueKind = getValueKindFromId(question.id)
  
  return `${typeKey}|${questionType}|${valueKind}`
}

export const createDottedValueQuestions = (questionsCount: number, stage: StageNumber, layoutType?: 'grid' | 'row'): Question[] => {
  const stageNoteTypes = getAllNoteTypes(stage)
  const stageRestTypes = getAllRestTypes(stage)

  const noteNameQuestions = stageNoteTypes.map(noteType =>
    createNoteValueQuestion(stage, noteType, layoutType)
  )

  const restNameQuestions = stageRestTypes.map(restType =>
    createRestValueQuestion(stage, restType, layoutType)
  )

  const noteValueQuestions = stageNoteTypes.map(noteType =>
      createValueBeatQuestion({
        stage,
        timeValue: noteType,
        isRest: false,
        choiceStages: [0, 1],
        layoutType
    })
  )

  const restValueQuestions = stageRestTypes.map(restType =>
      createValueBeatQuestion({
        stage,
        timeValue: restType,
        isRest: true,
        choiceStages: [0, 1],
        layoutType
    })
  )

  const uniquePool = [
    ...noteNameQuestions,
    ...restNameQuestions,
    ...noteValueQuestions,
    ...restValueQuestions
  ]

  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}

