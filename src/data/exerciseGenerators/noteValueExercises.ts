import { NOTES, type NoteType } from '@leonkwan46/music-notation'
import { getAllNoteTypes } from '../helpers/exerciseHelpers'
import {
  generateMultipleChoiceOptions,
  generateQuestionId,
  selectRandomItems
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

const noteTypeToString = (noteType: NoteType | { type: NoteType; dots?: number }) => {
  if (typeof noteType === 'object' && noteType.type) {
    const { type, dots = 0 } = noteType
    const baseName = getBaseNoteName(type)
    return dots > 0 ? `Dotted ${baseName}` : baseName
  }
  
  return getBaseNoteName(noteType as NoteType)
}

const getBaseNoteName = (noteType: NoteType) => {
  switch (noteType) {
    case NOTES.SEMIBREVE: return 'Semibreve'
    case NOTES.MINIM: return 'Minim'
    case NOTES.CROTCHET: return 'Crotchet'
    case NOTES.QUAVER: return 'Quaver'
    case NOTES.SEMIQUAVER: return 'Semiquaver'
    default: return noteType.toLowerCase()
  }
}

const isSameNoteType = (noteType1: NoteType | { type: NoteType; dots?: number }, noteType2: NoteType | { type: NoteType; dots?: number }): boolean => {
  if (typeof noteType1 === 'string' && typeof noteType2 === 'string') {
    return noteType1 === noteType2
  }
  if (typeof noteType1 === 'object' && typeof noteType2 === 'object') {
    return noteType1.type === noteType2.type && noteType1.dots === noteType2.dots
  }
  return false
}

const buildQuestion = (noteTypeToTest: NoteType | { type: NoteType; dots?: number }, stage: StageNumber): Question => {
  const stageNoteTypes = getAllNoteTypes(stage)
  const correctAnswerString = noteTypeToString(noteTypeToTest)
  const choiceStrings = stageNoteTypes.map(noteTypeToString)
  
  return {
    id: generateQuestionId('note-value'),
    question: 'What is this note value?',
    correctAnswer: correctAnswerString,
    choices: generateMultipleChoiceOptions(choiceStrings, correctAnswerString),
    explanation: `The correct answer is ${correctAnswerString}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'noteValue',
      noteType: noteTypeToTest
    }
  }
}

export const createNoteValueQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const availableNoteTypes = getAllNoteTypes(stage)
  const noteTypesToTest = selectRandomItems(availableNoteTypes, questionsCount, isSameNoteType)
  return noteTypesToTest.map(noteTypeToTest => buildQuestion(noteTypeToTest, stage))
}
