import { type ClefType, type Note } from '@leonkwan46/music-notation'
import { LESS_COMMON_ACCIDENTALS } from '../../config/gradeSyllabus/PitchRange'
import { StageNumber } from '../theoryData/types'
import { getNoteRange } from './exerciseHelpers'
import { getSemitoneDistance } from './intervalHelpers'

interface ParsedPitch {
  letter: string
  accidental: string
  octave: number
}

export const parsePitch = (pitch: string): ParsedPitch => {
  const match = pitch.match(/^([A-G])([#♯♭b♮𝄪𝄫]?)(\d+)$/)
  if (!match) {
    throw new Error(`Invalid pitch format: ${pitch}`)
  }
  return {
    letter: match[1],
    accidental: match[2] || '',
    octave: parseInt(match[3], 10)
  }
}

export const hasLessCommonAccidental = (pitch: string): boolean => {
  const parsed = parsePitch(pitch)
  const noteWithAccidental = `${parsed.letter}${parsed.accidental}`
  return (LESS_COMMON_ACCIDENTALS as readonly string[]).includes(noteWithAccidental)
}

export const isValidIntervalPair = (pitch1: string, pitch2: string): boolean => {
  if (hasLessCommonAccidental(pitch1) || hasLessCommonAccidental(pitch2)) {
    return false
  }
  
  const parsed1 = parsePitch(pitch1)
  const parsed2 = parsePitch(pitch2)
  const isNaturalSemitone = (parsed1.letter === 'E' && parsed2.letter === 'F') ||
                            (parsed1.letter === 'F' && parsed2.letter === 'E') ||
                            (parsed1.letter === 'B' && parsed2.letter === 'C') ||
                            (parsed1.letter === 'C' && parsed2.letter === 'B')
  
  if (isNaturalSemitone) {
    const hasAcc1 = parsed1.accidental !== '' && parsed1.accidental !== '♮'
    const hasAcc2 = parsed2.accidental !== '' && parsed2.accidental !== '♮'
    
    if (hasAcc1 !== hasAcc2) {
      return false
    }
    
    if (hasAcc1 && hasAcc2) {
      const isSharp1 = parsed1.accidental === '#' || parsed1.accidental === '♯'
      const isSharp2 = parsed2.accidental === '#' || parsed2.accidental === '♯'
      if (isSharp1 !== isSharp2) {
        return false
      }
    }
  }
  
  return true
}

export const getIntervalPairs = (stage: StageNumber, clef: ClefType): {pitch1: string, pitch2: string, intervalType: 'semitone' | 'tone'}[] => {
  const stagePitches = getNoteRange(stage, clef) as Note[]
  const availablePitches = stagePitches.map(n => n.pitch)
  const pairs: {pitch1: string, pitch2: string, intervalType: 'semitone' | 'tone'}[] = []
  
  for (let i = 0; i < availablePitches.length; i++) {
    for (let j = i + 1; j < availablePitches.length; j++) {
      const pitch1 = availablePitches[i]
      const pitch2 = availablePitches[j]
      
      if (!isValidIntervalPair(pitch1, pitch2)) {
        continue
      }
      
      const semitones = getSemitoneDistance(pitch1, pitch2)
      if (semitones === 1 || semitones === 2) {
        pairs.push({ 
          pitch1, 
          pitch2, 
          intervalType: semitones === 1 ? 'semitone' : 'tone' 
        })
      }
    }
  }
  
  return pairs
}

