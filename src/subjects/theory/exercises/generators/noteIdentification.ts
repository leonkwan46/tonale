import { NOTES, type AccidentalType, type ClefType, type StemDirection } from '@leonkwan46/music-notation'
import { extractNotePrefix } from '../utils/interval'
import { getNewNotesForStage } from '../../curriculum/config/noteRange'
import { Question, StageNumber } from '../../curriculum/types'
import { generateQuestionsFromPool } from '../utils/exercise'
import {
  generateQuestionId,
  generateWrongChoices
} from '../utils/question'

interface Note {
  pitch: string
  name: string
  letterName?: string
  stem: StemDirection
  ledgerLines: number
  accidental?: AccidentalType
}

interface AnswerTypeDistribution {
  keyPress: number
  multipleChoice: number
}

const DEFAULT_DISTRIBUTION: AnswerTypeDistribution = {
  keyPress: 0,
  multipleChoice: 100
}

export const createNoteIdentificationQuestion = (
  stage: StageNumber,
  clef: ClefType,
  noteData?: Note,
  questionType: 'multipleChoice' | 'keyPress' = 'multipleChoice'
): Question => {
  const stagePitches = getNewNotesForStage(stage, clef)
  const correctNoteData = noteData || stagePitches[0]

  if (!correctNoteData.letterName) {
    throw new Error('Note data missing letterName')
  }

  const allLetterNames = stagePitches.map((note: Note) => note.letterName)
  const validLetterNames = allLetterNames.filter((name: string | undefined): name is string => Boolean(name))
  const noteLetterNames = [...new Set(validLetterNames)]

  const questionText =
    questionType === 'keyPress'
      ? `Press the key for this note in the ${clef} clef:`
      : `What note is this in the ${clef} clef?`

  const correctAnswer = questionType === 'keyPress' 
    ? extractNotePrefix(correctNoteData.pitch)
    : correctNoteData.letterName

  return {
    id: generateQuestionId('note-id'),
    question: questionText,
    correctAnswer,
    choices: questionType === 'keyPress' ? [] : generateWrongChoices(noteLetterNames, correctNoteData.letterName),
    explanation: `This note is ${correctNoteData.letterName} on the ${clef} clef.`,
    type: questionType,
    visualComponent: {
      clef: clef,
      size: 'xs',
      elements: [
        {
          pitch: correctNoteData.pitch,
          type: NOTES.CROTCHET,
          accidental: correctNoteData.accidental,
          stem: correctNoteData.stem,
          ledgerLines: correctNoteData.ledgerLines
        }
      ]
    }
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const pitch = question.visualComponent?.elements?.[0]?.pitch
  if (pitch) return pitch
  return question.correctAnswer ?? null
}

export const createNoteIdentificationQuestions = (
  questionsCount: number,
  stage: StageNumber,
  clef: ClefType,
  answerTypeDistribution?: AnswerTypeDistribution
): Question[] => {
  const stagePitches = getNewNotesForStage(stage, clef)
  const distribution = answerTypeDistribution || DEFAULT_DISTRIBUTION
  const totalPercentage = distribution.keyPress + distribution.multipleChoice

  const keyPressCount = Math.floor((questionsCount * distribution.keyPress) / totalPercentage)
  const multipleChoiceCount = questionsCount - keyPressCount

  const keyPressPool = stagePitches.map((note) => createNoteIdentificationQuestion(stage, clef, note, 'keyPress'))
  const multipleChoicePool = stagePitches.map((note) => createNoteIdentificationQuestion(stage, clef, note, 'multipleChoice'))

  const keyPressQuestions = generateQuestionsFromPool(keyPressPool, keyPressCount, getDuplicateIdentifier)
  const multipleChoiceQuestions = generateQuestionsFromPool(multipleChoicePool, multipleChoiceCount, getDuplicateIdentifier)

  return [...keyPressQuestions, ...multipleChoiceQuestions]
}
