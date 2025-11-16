import { 
  generateQuestionsFromPool, 
  getAllNoteTypes, 
  getAllRestTypes,
  getTimeValueKeyFromComponent,
  getQuestionTypeFromId,
  getValueKindFromId
} from '../helpers/exerciseHelpers'
import { createValueBeatQuestion } from '../helpers/timeValueQuestionHelpers'
import { Question, StageNumber } from '../theoryData/types'
import { createNoteValueQuestion } from './noteValueExercises'
import { createRestValueQuestion } from './restValueExercises'

const getDottedValueKey = (question: Question): string | null => {
  const typeKey = getTimeValueKeyFromComponent(question)
  if (!typeKey) return null
  
  const questionType = getQuestionTypeFromId(question.id)
  const valueKind = getValueKindFromId(question.id)
  
  return `${typeKey}|${questionType}|${valueKind}`
}

export const createDottedValueQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const stageNoteTypes = getAllNoteTypes(stage)
  const stageRestTypes = getAllRestTypes(stage)

  const noteNameQuestions = stageNoteTypes.map(noteType =>
    createNoteValueQuestion(stage, noteType)
  )

  const restNameQuestions = stageRestTypes.map(restType =>
    createRestValueQuestion(stage, restType)
  )

  const noteValueQuestions = stageNoteTypes.map(noteType =>
      createValueBeatQuestion({
        stage,
        timeValue: noteType,
        isRest: false,
        choiceStages: [0, 1]
    })
  )

  const restValueQuestions = stageRestTypes.map(restType =>
      createValueBeatQuestion({
        stage,
        timeValue: restType,
        isRest: true,
        choiceStages: [0, 1]
    })
  )

  const uniquePool = [
    ...noteNameQuestions,
    ...restNameQuestions,
    ...noteValueQuestions,
    ...restValueQuestions
  ]

  return generateQuestionsFromPool(uniquePool, questionsCount, getDottedValueKey)
}

