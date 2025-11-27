import {
  generateQuestionsFromPool,
  getAllRestTypes,
  getQuestionTypeFromId,
  getTimeValueKeyFromComponent,
  getValueKindFromId
} from '../../utils/exercise'
import { createValueBeatQuestion } from '../../utils/timeValueQuestion'
import { Question, StageNumber } from '../../curriculum/types'
import { createRestValueQuestion } from './restValue'

const getDuplicateIdentifier = (question: Question): string | null => {
  const typeKey = getTimeValueKeyFromComponent(question)
  if (!typeKey) return null
  
  const questionType = getQuestionTypeFromId(question.id)
  const valueKind = getValueKindFromId(question.id)
  
  return `${typeKey}|${questionType}|${valueKind}`
}

export const createRestValueNameQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const stageRestTypes = getAllRestTypes(stage)

  const restNameQuestions = stageRestTypes.map(restType =>
    createRestValueQuestion(stage, restType)
  )

  const restValueQuestions = stageRestTypes.map(restType =>
      createValueBeatQuestion({
        stage,
        timeValue: restType,
        isRest: true,
        choiceStages: [0]
    })
  )

  const uniquePool = [
    ...restNameQuestions,
    ...restValueQuestions
  ]

  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}

