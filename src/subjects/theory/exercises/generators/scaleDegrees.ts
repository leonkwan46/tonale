import { KEY_NAMES, NOTES, type ClefType } from '@leonkwan46/music-notation'
import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'
import { generateQuestionsFromPool, getKeys, getPitchDefinitionsForClef } from '../utils/exercise'
import { generateQuestionId, generateWrongChoices } from '../utils/question'
import { getNoteAtScaleDegree, getScaleDegreeName } from '../utils/scaleDegree'
import { generateExplanation } from '../utils/explanation'

type MusicNotationKey = (typeof KEY_NAMES)[keyof typeof KEY_NAMES]
const SCALE_DEGREES = [1, 2, 3, 4, 5, 6, 7] as const

export const createScaleDegreeQuestion = (
  stage: StageNumber,
  clef: ClefType,
  key?: MusicNotationKey,
  degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  layoutType?: 'grid' | 'row'
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
  
  const visualComponent = {
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
  
  return {
    id: generateQuestionId('scale-degree'),
    question: `What scale degree is this note in ${keyDisplayName}?`,
    correctAnswer,
    choices: generateWrongChoices(allDegrees, correctAnswer),
    explanation: generateExplanation('scaleDegrees', {
      correctAnswer,
      key: selectedKey,
      degree: correctAnswer
    }, visualComponent),
    type: 'multipleChoice',
    visualComponent,
    layoutType
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const visualComponent = question.visualComponent
  const keyName = visualComponent && 'keyName' in visualComponent
    ? (visualComponent as { keyName?: unknown }).keyName
    : undefined
  
  if (!keyName) return null
  
  const keyStr = typeof keyName === 'string' 
    ? keyName 
    : (keyName && typeof keyName === 'object' && 'toString' in keyName && typeof keyName.toString === 'function')
      ? keyName.toString()
      : String(keyName)
  
  const correctAnswer = question.correctAnswer
  if (!correctAnswer) return keyStr
  
  return `${keyStr}|${correctAnswer}`
}

export const createScaleDegreeQuestions = (
  questionsCount: number,
  stage: StageNumber,
  layoutType?: 'grid' | 'row'
): Question[] => {
  const availableKeys = getKeys(stage)
  const treblePool: Question[] = []
  const bassPool: Question[] = []
  for (const key of availableKeys) {
    for (const degree of SCALE_DEGREES) {
      treblePool.push(createScaleDegreeQuestion(stage, 'treble', key, degree, layoutType))
      bassPool.push(createScaleDegreeQuestion(stage, 'bass', key, degree, layoutType))
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
