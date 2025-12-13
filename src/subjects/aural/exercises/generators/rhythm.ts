import { generateQuestionId } from '@/subjects/theory/exercises/utils/question';
import { Question, StageNumber, type QuestionInterface } from '../../curriculum/types';

interface RhythmPattern {
  notes: { type: string; dots?: number }[]
}

const getBeats = (noteType: string | { type: string; dots?: number }): number => {
  const type = typeof noteType === 'string' ? noteType : noteType.type
  
  const beatMap: Record<string, number> = {
    minim: 2,
    crotchet: 1,
    quaver: 0.5
  }
  
  return beatMap[type] || 1
}

const generateRhythmPattern = (stage: StageNumber): RhythmPattern => {
  const simpleNoteTypes = ['crotchet', 'minim', 'quaver'] as const
  const totalBeats = 4
  const maxNotes = 6
  
  const pattern: { type: string }[] = []
  let remainingBeats = totalBeats
  
  while (remainingBeats > 0.01 && pattern.length < maxNotes) {
    const validNotes = simpleNoteTypes.filter(note => getBeats(note) <= remainingBeats + 0.01)
    if (validNotes.length === 0) break
    
    const weights = validNotes.map(note => note === 'crotchet' ? 3 : note === 'minim' ? 2 : 1)
    const totalWeight = weights.reduce((sum, w) => sum + w, 0)
    let random = Math.random() * totalWeight
    
    let selectedNote = validNotes[0]
    for (let i = 0; i < validNotes.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        selectedNote = validNotes[i]
        break
      }
    }
    
    pattern.push({ type: selectedNote })
    remainingBeats -= getBeats(selectedNote)
  }
  
  if (pattern.length < 2) {
    pattern.push({ type: 'crotchet' })
    if (remainingBeats >= 1) {
      pattern.push({ type: 'crotchet' })
    }
  }
  
  return { notes: pattern }
}

const patternToString = (pattern: RhythmPattern): string => {
  return pattern.notes.map(note => {
    const dots = note.dots ? '.'.repeat(note.dots) : ''
    return `${note.type}${dots}`
  }).join(' - ')
}

const patternToTimestamps = (pattern: RhythmPattern, tempo: number = 120): number[] => {
  const beatDuration = 60 / tempo
  const timestamps: number[] = [0]
  let currentTime = 0
  
  for (let i = 0; i < pattern.notes.length - 1; i++) {
    currentTime += getBeats(pattern.notes[i]) * beatDuration
    timestamps.push(currentTime)
  }
  
  return timestamps
}

const rhythmPatternToMelody = (pattern: RhythmPattern, tempo: number = 120): { note: string; duration: number }[] => {
  const beatDuration = 60 / tempo
  return pattern.notes.map(note => ({
    note: 'C4',
    duration: getBeats(note) * beatDuration
  }))
}

export const compareRhythmPattern = (
  userTimestamps: number[],
  expectedTimestamps: number[],
  tolerance: number = 0.15
): boolean => {
  if (userTimestamps.length === 0 || expectedTimestamps.length === 0) {
    return false
  }

  const normalizedUser = userTimestamps.map(ts => ts - (userTimestamps[0] || 0))
  const normalizedExpected = expectedTimestamps.map(ts => ts - (expectedTimestamps[0] || 0))
  
  if (Math.abs(normalizedUser.length - normalizedExpected.length) > 1) {
    return false
  }
  
  const userIntervals: number[] = []
  const expectedIntervals: number[] = []
  
  for (let i = 1; i < normalizedUser.length; i++) {
    userIntervals.push(normalizedUser[i] - normalizedUser[i - 1])
  }
  
  for (let i = 1; i < normalizedExpected.length; i++) {
    expectedIntervals.push(normalizedExpected[i] - normalizedExpected[i - 1])
  }
  
  const minLength = Math.min(userIntervals.length, expectedIntervals.length)
  const userTotalDuration = normalizedUser[normalizedUser.length - 1] || 0
  const expectedTotalDuration = normalizedExpected[normalizedExpected.length - 1] || 0
  const tempoScale = expectedTotalDuration > 0 ? userTotalDuration / expectedTotalDuration : 1
  
  if (tempoScale < 0.5 || tempoScale > 2.0) {
    return false
  }
  
  let matchCount = 0
  for (let i = 0; i < minLength; i++) {
    const userInterval = userIntervals[i] || 0
    const expectedInterval = expectedIntervals[i] || 0
    const scaledExpected = expectedInterval * tempoScale
    const difference = Math.min(
      Math.abs(userInterval - scaledExpected),
      Math.abs(userInterval - expectedInterval)
    )
    const relativeTolerance = Math.max(expectedInterval * 0.3, tolerance)
    
    if (difference <= relativeTolerance) {
      matchCount++
    }
  }
  
  const requiredMatches = Math.ceil(minLength * 0.7)
  return matchCount >= requiredMatches
}

export const createRhythmQuestions = (
  count: number,
  stage: StageNumber
): Question[] => {
  const tempo = 120
  const questions: Question[] = []
  
  for (let i = 0; i < count; i++) {
    const pattern = generateRhythmPattern(stage)
    const patternString = patternToString(pattern)
    const timestamps = patternToTimestamps(pattern, tempo)
    const melody = rhythmPatternToMelody(pattern, tempo)
    
    questions.push({
      id: generateQuestionId('rhythm-echo'),
      title: 'Clap back the rhythm you hear.',
      correctAnswer: timestamps,
      choices: [],
      explanation: `The rhythm pattern is: ${patternString}`,
      answerInterface: 'rhythmTap',
      questionInterface: {
        type: 'playback',
        rhythmMelody: melody
      } as QuestionInterface
    })
  }
  
  return questions
}
