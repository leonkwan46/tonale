import { 
  generateQuestionsFromPool, 
  getAllNoteTypes,
  getTimeValueKeyFromComponent,
  getQuestionTypeFromId,
  getValueKindFromId
} from '../helpers/exerciseHelpers'
import { createValueBeatQuestion } from '../helpers/timeValueQuestionHelpers'
import { Question, StageNumber } from '../theoryData/types'
import { createNoteValueQuestion } from './noteValueExercises'

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

