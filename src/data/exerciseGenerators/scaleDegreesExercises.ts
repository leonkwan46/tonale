import { KEY_NAMES, NOTES, type ClefType } from '@leonkwan46/music-notation'
import { generateQuestionsFromPool, getKeys, getPitchDefinitionsForClef } from '../helpers/exerciseHelpers'
import { generateQuestionId, generateWrongChoices } from '../helpers/questionHelpers'
import { getNoteAtScaleDegree, getScaleDegreeName } from '../helpers/scaleDegreeHelpers'
import { Question, StageNumber } from '../theoryData/types'

type MusicNotationKey = (typeof KEY_NAMES)[keyof typeof KEY_NAMES]
const SCALE_DEGREES = [1, 2, 3, 4, 5, 6, 7] as const

export const createScaleDegreeQuestion = (
  stage: StageNumber,
  clef: ClefType,
  key?: MusicNotationKey,
  degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7
): Question => {
  const availableKeys = getKeys(stage)
  const selectedKey = key || availableKeys[0]
  const selectedDegree = degree || SCALE_DEGREES[0]
  
  const scaleNoteName = getNoteAtScaleDegree(selectedKey, selectedDegree)
  const noteLetter = scaleNoteName.charAt(0)
  const accidental = scaleNoteName.slice(1)
  const pitchDefinitions = getPitchDefinitionsForClef(clef)
  const desiredOctave = clef === 'treble' ? 4 : 3
  const candidates = pitchDefinitions.filter(n => n.pitch.startsWith(`${noteLetter}${accidental}`))
  const parseOct = (p: string) => {
    const m = p.match(/(\d+)$/)
    return m ? parseInt(m[1], 10) : desiredOctave
  }
  const targetNote = candidates
    .slice()
    .sort((a, b) => Math.abs(parseOct(a.pitch) - desiredOctave) - Math.abs(parseOct(b.pitch) - desiredOctave))[0]
  if (!targetNote) {
    throw new Error(`Could not find pitch definition for ${noteLetter}${accidental} in ${clef} clef`)
  }
  
  const correctAnswer = getScaleDegreeName(selectedDegree)
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
      keyName: selectedKey,
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

const getDuplicateIdentifier = (question: Question): string | null => {
  return question.visualComponent?.keyName ?? null
}

export const createScaleDegreeQuestions = (
  questionsCount: number,
  stage: StageNumber
): Question[] => {
  const availableKeys = getKeys(stage)
  const treblePool: Question[] = []
  const bassPool: Question[] = []
  for (const key of availableKeys) {
    for (const degree of SCALE_DEGREES) {
      treblePool.push(createScaleDegreeQuestion(stage, 'treble', key, degree))
      bassPool.push(createScaleDegreeQuestion(stage, 'bass', key, degree))
    }
  }

  const half = Math.floor(questionsCount / 2)
  const remainder = questionsCount - half * 2
  const trebleCount = half + (remainder > 0 ? 1 : 0)
  const bassCount = half
  const treble = generateQuestionsFromPool(treblePool, trebleCount, getDuplicateIdentifier)
  const bass = generateQuestionsFromPool(bassPool, bassCount, getDuplicateIdentifier)
  const combined = [...treble, ...bass]
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[combined[i], combined[j]] = [combined[j], combined[i]]
  }
  return combined
}
