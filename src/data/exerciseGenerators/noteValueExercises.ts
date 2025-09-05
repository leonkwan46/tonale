// Note value exercise generators
import {
    generateQuestionId,
    generateWrongChoices,
    getGrade1NoteTypes,
    getRandomItem
} from '../helpers/questionHelpers'
import { Question } from '../theoryData/types'

// Create a note value identification question
export const createNoteValueQuestion = (): Question => {
  const grade1NoteTypes = getGrade1NoteTypes()
  const correctNoteType = getRandomItem(grade1NoteTypes)
  
  return {
    id: generateQuestionId('note-value'),
    question: 'What is this note value?',
    correctAnswer: correctNoteType,
    choices: generateWrongChoices(grade1NoteTypes, correctNoteType),
    explanation: `This is a ${correctNoteType}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'note',
      noteType: correctNoteType,
      pitch: 'C4'
    }
  }
}

// Create multiple note value questions
export const createNoteValueQuestions = (count: number): Question[] => {
  return Array.from({ length: count }, () => createNoteValueQuestion())
}
