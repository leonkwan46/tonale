import { ALTO_PITCH_DEFINITIONS, BASS_PITCH_DEFINITIONS, TENOR_PITCH_DEFINITIONS, TREBLE_PITCH_DEFINITIONS, type ClefType, type Note } from '@leonkwan46/music-notation'
import { STAGE_ONE_INTERVALS, STAGE_THREE_INTERVALS, STAGE_TWO_INTERVALS } from '../stageSyllabus/intervals'
import { StageNumber } from '../theoryData/types'

const NOTE_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

const PERFECT_INTERVALS = {
  1: 0, 4: 5, 5: 7, 8: 12
}

const MAJOR_INTERVALS = {
  2: 2, 3: 4, 6: 9, 7: 11
}

const MINOR_INTERVALS = {
  2: 1, 3: 3, 6: 8, 7: 10
}

type IntervalType = 'perfect' | 'major' | 'minor' | 'augmented' | 'diminished'
type IntervalNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export interface Interval {
  number: IntervalNumber
  type: IntervalType
  semitones: number
  compound: boolean
  simpleName: string
}

interface ParsedPitch {
  noteLetter: string
  accidental: string
  octave: number
}

function parsePitch(pitch: string): ParsedPitch {
  if (typeof pitch === 'object' && pitch !== null) {
    const note = pitch as Note
    return {
      noteLetter: note.pitch.charAt(0),
      accidental: note.pitch.slice(1).replace(/\d+/, ''),
      octave: parseInt(note.pitch.replace(/\D/g, '')) || 4
    }
  }

  const pitchStr = pitch.toString()
  const octaveMatch = pitchStr.match(/\d+/)
  const octave = octaveMatch ? parseInt(octaveMatch[0]) : 4
  const noteLetter = pitchStr.charAt(0).toUpperCase()
  const accidental = pitchStr.slice(1).replace(/\d+/, '')
  
  return { noteLetter, accidental, octave }
}

function normalizeAccidental(accidental: string): number {
  switch (accidental) {
    case '𝄪': return 2
    case '♯': case '#': return 1
    case '': return 0
    case '♭': case 'b': return -1
    case '𝄫': return -2
    default: return 0
  }
}

export function getSemitoneDistance(pitch1: string | Note, pitch2: string | Note): number {
  const parsed1 = parsePitch(pitch1 as string)
  const parsed2 = parsePitch(pitch2 as string)
  
  const baseSemitonesMap: Record<string, number> = {
    'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11
  }
  
  const semitones1 = baseSemitonesMap[parsed1.noteLetter] + normalizeAccidental(parsed1.accidental) + (parsed1.octave * 12)
  const semitones2 = baseSemitonesMap[parsed2.noteLetter] + normalizeAccidental(parsed2.accidental) + (parsed2.octave * 12)
  
  return Math.abs(semitones2 - semitones1)
}

function getIntervalNumber(noteLetter1: string, noteLetter2: string, octave1: number, octave2: number): number {
  const index1 = NOTE_LETTERS.indexOf(noteLetter1.toUpperCase())
  const index2 = NOTE_LETTERS.indexOf(noteLetter2.toUpperCase())
  
  if (index1 === -1 || index2 === -1) {
    throw new Error(`Invalid note letters: ${noteLetter1}, ${noteLetter2}`)
  }
  
  const octaveDifference = octave2 - octave1
  
  let letterDistance = index2 - index1
  if (letterDistance < 0) {
    letterDistance += 7
  }
  
  if (index1 === index2) {
    letterDistance = 0
  }
  
  const totalDistance = letterDistance + (octaveDifference * 7)
  
  return totalDistance + 1
}

function isCompoundInterval(intervalNumber: number): boolean {
  return intervalNumber > 8
}

function getSimpleInterval(intervalNumber: number): number {
  if (intervalNumber <= 8) return intervalNumber
  return ((intervalNumber - 1) % 7) + 1
}

function getIntervalType(intervalNumber: number, semitones: number): IntervalType {
  const simpleInterval = getSimpleInterval(intervalNumber)
  
  if (simpleInterval in PERFECT_INTERVALS) {
    const expectedSemitones = PERFECT_INTERVALS[simpleInterval as keyof typeof PERFECT_INTERVALS]
    if (semitones === expectedSemitones) return 'perfect'
    if (semitones > expectedSemitones) return 'augmented'
    if (semitones < expectedSemitones) return 'diminished'
  }
  
  if (simpleInterval in MAJOR_INTERVALS) {
    const majorSemitones = MAJOR_INTERVALS[simpleInterval as keyof typeof MAJOR_INTERVALS]
    const minorSemitones = MINOR_INTERVALS[simpleInterval as keyof typeof MINOR_INTERVALS]
    
    if (semitones === majorSemitones) return 'major'
    if (semitones === minorSemitones) return 'minor'
    if (semitones > majorSemitones) return 'augmented'
    if (semitones < minorSemitones) return 'diminished'
  }
  
  return 'perfect'
}

function getIntervalName(interval: Interval): string {
  const { number, type, compound } = interval
  const simpleNumber = getSimpleInterval(number)
  
  const capitalisedType = type.charAt(0).toUpperCase() + type.slice(1)
  let name = `${capitalisedType} ${getOrdinal(simpleNumber)}`
  
  if (compound) {
    name = `Compound ${name}`
  }
  
  return name
}

function getOrdinal(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const v = num % 100
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
}

export function calculateInterval(
  fromPitch: string | Note,
  toPitch: string | Note
): Interval {
  const parsed1 = parsePitch(fromPitch as string)
  const parsed2 = parsePitch(toPitch as string)
  
  const intervalNumber = getIntervalNumber(parsed1.noteLetter, parsed2.noteLetter, parsed1.octave, parsed2.octave) as IntervalNumber
  const semitones = getSemitoneDistance(fromPitch, toPitch)
  const compound = isCompoundInterval(intervalNumber)
  const type = getIntervalType(intervalNumber, semitones)
  const simpleName = getIntervalName({ number: intervalNumber, type, semitones, compound, simpleName: '' })
  
  return {
    number: intervalNumber,
    type,
    semitones,
    compound,
    simpleName
  }
}

export function invertInterval(interval: Interval): Interval {
  const { number, type, semitones } = interval
  
  const simpleNumber = getSimpleInterval(number)
  const invertedSimple = 9 - simpleNumber
  const invertedNumber = (invertedSimple + (number > 8 ? 7 : 0)) as IntervalNumber
  const invertedSemitones = 12 - semitones
  
  let invertedType: IntervalType
  if (type === 'perfect') {
    invertedType = 'perfect'
  } else if (type === 'major') {
    invertedType = 'minor'
  } else if (type === 'minor') {
    invertedType = 'major'
  } else if (type === 'augmented') {
    invertedType = 'diminished'
  } else if (type === 'diminished') {
    invertedType = 'augmented'
  } else {
    invertedType = 'perfect'
  }
  
  const compound = isCompoundInterval(invertedNumber)
  const simpleName = getIntervalName({ 
    number: invertedNumber, 
    type: invertedType, 
    semitones: invertedSemitones, 
    compound, 
    simpleName: '' 
  })
  
  return {
    number: invertedNumber,
    type: invertedType,
    semitones: invertedSemitones,
    compound,
    simpleName
  }
}

export function intervalsAreEnharmonic(interval1: Interval, interval2: Interval): boolean {
  return interval1.semitones === interval2.semitones
}

export function transposeByInterval(pitch: string | Note, interval: Interval): string {
  const parsed = parsePitch(pitch as string)
  const { number, semitones } = interval
  
  const currentIndex = NOTE_LETTERS.indexOf(parsed.noteLetter)
  const newIndex = (currentIndex + number - 1) % 7
  const newNoteLetter = NOTE_LETTERS[newIndex]
  
  const octaveIncrease = Math.floor((currentIndex + number - 1) / 7)
  const newOctave = parsed.octave + octaveIncrease
  
  const baseSemitonesMap: Record<string, number> = {
    'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11
  }
  
  const currentSemitones = baseSemitonesMap[parsed.noteLetter] + normalizeAccidental(parsed.accidental)
  const targetSemitones = currentSemitones + semitones
  const newBaseSemitones = baseSemitonesMap[newNoteLetter]
  const accidentalOffset = targetSemitones - newBaseSemitones - (newOctave * 12)
  
  let newAccidental = ''
  if (accidentalOffset > 0) {
    newAccidental = accidentalOffset === 2 ? '𝄪' : '♯'
  } else if (accidentalOffset < 0) {
    newAccidental = accidentalOffset === -2 ? '𝄫' : '♭'
  }
  
  return `${newNoteLetter}${newAccidental}${newOctave}`
}

export type { IntervalNumber, IntervalType }

// ======================
// PITCH DEFINITIONS HELPERS
// ======================

export const getPitchDefinitionsForClef = (clef: ClefType): Note[] => {
  switch (clef) {
    case 'treble':
      return TREBLE_PITCH_DEFINITIONS
    case 'bass':
      return BASS_PITCH_DEFINITIONS
    case 'alto':
      return ALTO_PITCH_DEFINITIONS
    case 'tenor':
      return TENOR_PITCH_DEFINITIONS
    default:
      return TREBLE_PITCH_DEFINITIONS
  }
}

export const findNoteFromPitch = (pitch: string, pitchDefinitions: Note[]): Note | undefined => {
  return pitchDefinitions.find((note: Note) => note.pitch === pitch)
}

export const getNotesForPitches = (tonic: string, target: string, clef: ClefType) => {
  const pitchDefinitions = getPitchDefinitionsForClef(clef)
  const tonicNote = findNoteFromPitch(tonic, pitchDefinitions)
  const targetNote = findNoteFromPitch(target, pitchDefinitions)
  
  if (!tonicNote || !targetNote) {
    throw new Error(`Could not find pitch definitions for tonic: ${tonic} or target: ${target} in clef: ${clef}`)
  }
  
  return { tonicNote, targetNote }
}

// ======================
// STAGE INTERVALS HELPERS
// ======================

export const getStageIntervals = (stage: StageNumber): readonly string[] => {
  switch (stage) {
    case 1:
      return STAGE_ONE_INTERVALS
    case 2:
      return STAGE_TWO_INTERVALS
    case 3:
      return STAGE_THREE_INTERVALS
    default:
      return STAGE_ONE_INTERVALS
  }
}

const getOrdinalIntervalName = (interval: Interval, stageIntervals: readonly string[]): string => {
  const simpleNumber = interval.number <= 8 ? interval.number : ((interval.number - 1) % 7) + 1
  // Map interval number to index in stage intervals array: 2nd=0, 3rd=1, ..., 8ve=6
  const index = simpleNumber === 8 ? 6 : simpleNumber - 2
  if (index >= 0 && index < stageIntervals.length) {
    return stageIntervals[index]
  }
  // Fallback (should not happen)
  return simpleNumber === 8 ? '8ve' : `${simpleNumber}${simpleNumber === 2 ? 'nd' : simpleNumber === 3 ? 'rd' : 'th'}`
}

const getQualityIntervalName = (interval: Interval, stageIntervals: readonly string[]): string => {
  // Handle "Perfect 8th" -> "Perfect Octave" mapping for Stage 3
  const normalisedSimpleName = interval.simpleName.replace(/8th$/, 'Octave')
  return stageIntervals.find(name => name === normalisedSimpleName || name === interval.simpleName) || interval.simpleName
}

export const getIntervalNameForStage = (interval: Interval, stage: StageNumber, stageIntervals: readonly string[]): string => {
  if (stage === 1 || stage === 2) {
    return getOrdinalIntervalName(interval, stageIntervals)
  }
  
  return getQualityIntervalName(interval, stageIntervals)
}
