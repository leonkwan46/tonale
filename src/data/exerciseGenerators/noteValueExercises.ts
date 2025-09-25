// Note value exercise generators
import { NOTES } from '@leonkwan46/music-notation'
import { getAllNoteTypes } from '../helpers/exerciseHelpers'
import {
  generateQuestionId,
  generateWrongChoices,
  getRandomItem
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Create a note value identification question
export const createNoteValueQuestion = (stage: StageNumber): Question => {
  const stageNoteTypes = getAllNoteTypes(stage)
  const correctNoteType = getRandomItem(stageNoteTypes)
  
  // Convert note type constant or object to readable string for choices
  const noteTypeToString = (noteType: string | { type: string; dots?: number }) => {
    // Handle dotted note objects
    if (typeof noteType === 'object' && noteType.type) {
      const { type, dots = 0 } = noteType
      const baseName = getBaseNoteName(type)
      return dots > 0 ? `Dotted ${baseName}` : baseName
    }
    
    // Handle string note types
    return getBaseNoteName(noteType as string)
  }
  
  const getBaseNoteName = (noteType: string) => {
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
