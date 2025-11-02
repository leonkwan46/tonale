// Note value exercise generators
import { getAllNoteTypes } from '../helpers/exerciseHelpers'
import {
  generateQuestionId,
  generateWrongChoices,
  getRandomItem
} from '../helpers/questionHelpers'
import { ensureFourChoicesForStage2, noteTypeToString } from '../helpers/timeValueHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Create a note value identification question
export const createNoteValueQuestion = (stage: StageNumber): Question => {
  const stageNoteTypes = getAllNoteTypes(stage)
  const correctNoteType = getRandomItem(stageNoteTypes as (string | { type: string; dots?: number })[])
  
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

// Create multiple note value questions
export const createNoteValueQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return Array.from({ length: questionsCount }, () => createNoteValueQuestion(stage))
}
