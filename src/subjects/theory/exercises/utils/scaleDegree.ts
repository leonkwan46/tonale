import { getSemitoneDistance } from './interval'
import { getScale } from './scale'

// Get scale degree (1st-8th) for a note in a given key
export function getScaleDegree(note: string, key: string): number {
  const scale = getScale(key, 'ascending')
  
  // Extract note letter (ignore accidentals and octave)
  const noteLetter = note.charAt(0).toUpperCase()
  
  // Find the note in the scale
  const scaleIndex = scale.findIndex(scaleNote => 
    scaleNote.charAt(0).toUpperCase() === noteLetter
  )
  
  if (scaleIndex === -1) {
    throw new Error(`Note ${note} not found in scale for key ${key}`)
  }
  
  // Scale degrees are 1-indexed
  return scaleIndex + 1
}

// Get scale degree name (1st, 2nd, 3rd, etc.)
export function getScaleDegreeName(degree: number): string {
  const suffixes: Record<number, string> = {
    1: 'st',
    2: 'nd',
    3: 'rd'
  }
  
  const suffix = suffixes[degree] || 'th'
  return `${degree}${suffix}`
}

// Get all scale degrees for a key
export function getScaleDegrees(key: string): string[] {
  const scale = getScale(key, 'ascending')
  return scale.map((_, index) => getScaleDegreeName(index + 1))
}

// Get note at a specific scale degree
export function getNoteAtScaleDegree(key: string, degree: number): string {
  const scale = getScale(key, 'ascending')
  
  if (degree < 1 || degree > scale.length) {
    throw new Error(`Invalid scale degree: ${degree}. Must be between 1 and ${scale.length}`)
  }
  
  return scale[degree - 1]
}

// Check if two notes are a semitone or tone apart
export function getIntervalType(pitch1: string, pitch2: string): 'semitone' | 'tone' {
  const semitones = getSemitoneDistance(pitch1, pitch2)
  
  if (semitones === 1) {
    return 'semitone'
  } else if (semitones === 2) {
    return 'tone'
  } else {
    throw new Error(`Interval between ${pitch1} and ${pitch2} is ${semitones} semitones, not a semitone or tone`)
  }
}

