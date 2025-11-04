import { NOTES, type ClefType } from '@leonkwan46/music-notation'
import { getKeys } from '../helpers/exerciseHelpers'
import { findNoteFromPitch, getPitchDefinitionsForClef } from '../helpers/intervalHelpers'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { getNoteAtScaleDegree, getScaleDegreeName } from '../helpers/scaleDegreeHelpers'
import { Question, StageNumber } from '../theoryData/types'

const SCALE_DEGREES = [1, 2, 3, 4, 5, 6, 7, 8] as const

export const createScaleDegreeQuestion = (
  stage: StageNumber,
  clef: ClefType
): Question => {
  const availableKeys = getKeys(stage)
  const selectedKey = getRandomItem(availableKeys)
  const degree = getRandomItem(SCALE_DEGREES)
  
  const scaleNoteName = getNoteAtScaleDegree(selectedKey, degree)
  const noteLetter = scaleNoteName.charAt(0)
  const accidental = scaleNoteName.slice(1)
  const targetPitch = `${noteLetter}${accidental}4`
  
  const pitchDefinitions = getPitchDefinitionsForClef(clef)
  const targetNote = findNoteFromPitch(targetPitch, pitchDefinitions)
  
  if (!targetNote) {
    throw new Error(`Could not find pitch definition for ${targetPitch} in ${clef} clef`)
  }
  
  const correctAnswer = getScaleDegreeName(degree)
  const allDegrees = SCALE_DEGREES.map(getScaleDegreeName)
  const keyDisplayName = selectedKey.toString()
  
  return {
    id: generateQuestionId('scale-degree'),
    question: `What scale degree is this note in ${keyDisplayName}?`,
    correctAnswer,
    choices: generateWrongChoices(allDegrees, correctAnswer),
    explanation: `In ${keyDisplayName}, this note is the ${correctAnswer} degree.`,
    type: 'multipleChoice',
    visualComponent: {
      clef,
      elements: [
        {
          pitch: targetNote.pitch,
          type: NOTES.SEMIBREVE,
          accidental: targetNote.accidental,
          stem: targetNote.stem,
          ledgerLines: targetNote.ledgerLines
        }
      ]
    }
  }
}

export const createScaleDegreeQuestions = (
  questionsCount: number,
  stage: StageNumber,
  clef: ClefType
): Question[] => {
  return Array.from({ length: questionsCount }, () => createScaleDegreeQuestion(stage, clef))
}
