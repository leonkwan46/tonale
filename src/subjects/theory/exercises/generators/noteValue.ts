import { generateQuestionsFromPool, getAllNoteTypes } from '../utils/exercise'
import {
  generateQuestionId,
  generateWrongChoices
} from '../utils/question'
import { ensureFourChoicesForStage2, noteTypeToString } from '../utils/timeValue'
import { Question, StageNumber } from '../../curriculum/types'

export const createNoteValueQuestion = (
  stage: StageNumber,
  noteType?: string | { type: string; dots?: number }
): Question => {
  const stageNoteTypes = getAllNoteTypes(stage)
  const correctNoteType = noteType || stageNoteTypes[0]
  
  const correctAnswerString = noteTypeToString(correctNoteType)
  let choiceStrings = stageNoteTypes.map(noteTypeToString)
  choiceStrings = ensureFourChoicesForStage2(stage, choiceStrings, correctAnswerString, false)
  
  return {
    id: generateQuestionId('note-value'),
    question: 'What is this note value?',
    correctAnswer: correctAnswerString,
    choices: generateWrongChoices(choiceStrings, correctAnswerString),
    explanation: `The correct answer is ${correctAnswerString}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'noteValue',
      noteType: correctNoteType
    }
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const noteType = question.visualComponent?.noteType
  if (noteType !== undefined) {
    return typeof noteType === 'string' ? noteType : JSON.stringify(noteType)
  }
  return question.correctAnswer ?? null
}

export const createNoteValueQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const stageNoteTypes = getAllNoteTypes(stage)
  const uniquePool = stageNoteTypes.map(noteType => 
    createNoteValueQuestion(stage, noteType)
  )
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}
