// Note value exercise generators
import { NOTES } from '@leonkwan46/music-notation'
import { getNoteTypes } from '../helpers/exerciseHelpers'
import {
    generateQuestionId,
    generateWrongChoices,
    getRandomItem
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Create a note value identification question
export const createNoteValueQuestion = (stage: StageNumber = 1): Question => {
  const stageNoteTypes = getNoteTypes(stage)
  const correctNoteType = getRandomItem(stageNoteTypes)
  
  // Convert note type constant to readable string for choices
  const noteTypeToString = (noteType: string) => {
    switch (noteType) {
      case NOTES.SEMIBREVE: return 'Semibreve'
      case NOTES.MINIM: return 'Minim'
      case NOTES.CROTCHET: return 'Crotchet'
      case NOTES.QUAVER: return 'Quaver'
      case NOTES.SEMIQUAVER: return 'Semiquaver'
      default: return noteType.toLowerCase()
    }
  }
  
  const correctAnswerString = noteTypeToString(correctNoteType)
  const choiceStrings = stageNoteTypes.map(noteTypeToString)
  
  return {
    id: generateQuestionId('note-value'),
    question: 'What is this note value?',
    correctAnswer: correctAnswerString,
    choices: generateWrongChoices(choiceStrings, correctAnswerString),
    explanation: `This is a ${correctAnswerString}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'noteValue',
      noteType: correctNoteType
    }
  }
}

// Create multiple note value questions
export const createNoteValueQuestions = (questionsCount: number, stage: StageNumber = 1): Question[] => {
  return Array.from({ length: questionsCount }, () => createNoteValueQuestion(stage))
}
