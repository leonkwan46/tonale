import { getAllNoteTypes } from '../../utils/exercise'
import {
  generateQuestionId,
  generateWrongChoices
} from '../../utils/question'
import { ensureFourChoicesForStage2, noteTypeToString } from '../../utils/timeValue'
import { generateExplanation } from '../../utils/explanation'
import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'

export const createNoteValueQuestion = (
  stage: StageNumber,
  noteType?: string | { type: string; dots?: number }
): Question => {
  const stageNoteTypes = getAllNoteTypes(stage)
  const correctNoteType = noteType || stageNoteTypes[0]
  
  const correctAnswerString = noteTypeToString(correctNoteType)
  let choiceStrings = stageNoteTypes.map(noteTypeToString)
  choiceStrings = ensureFourChoicesForStage2(stage, choiceStrings, correctAnswerString, false)
  
  const visualComponent = {
    type: 'noteValue' as const,
    noteType: correctNoteType
  }
  
  return {
    id: generateQuestionId('note-value'),
    question: 'What is this note value?',
    correctAnswer: correctAnswerString,
    choices: generateWrongChoices(choiceStrings, correctAnswerString),
    explanation: generateExplanation('noteValue', { correctAnswer: correctAnswerString }, visualComponent),
    type: 'multipleChoice',
    visualComponent
  }
}

