import { ALTO_PITCH_DEFINITIONS, BASS_PITCH_DEFINITIONS, TENOR_PITCH_DEFINITIONS, TREBLE_PITCH_DEFINITIONS, type ClefType, type Note } from '@leonkwan46/music-notation'
import { getCumulativeNoteDefinitions } from '../../curriculum/config/noteRange'
import { STAGE_ONE_TRIADS, STAGE_THREE_TRIADS, STAGE_TWO_TRIADS } from '../../curriculum/config/triads'
import type { StageNumber } from '@types'

const NOTE_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const

// ======================
// STAGE AND CLEF HELPERS
// ======================

export const getChordsByStage = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_TRIADS
    case 2:
      return STAGE_TWO_TRIADS
    case 3:
      return STAGE_THREE_TRIADS
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}


const getPitchDefinitionsForClef = (clef: ClefType): Note[] => {
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

// ======================
// NOTE UTILITIES
// ======================

const normaliseNoteName = (note: string): string => {
  return note.replace(/[♯♭𝄪𝄫]/, '').charAt(0).toUpperCase()
}

const getAccidental = (note: string): string => {
  if (note.includes('♯') || note.includes('♭')) {
    return note.includes('♯') ? '♯' : '♭'
  }
  return ''
}

const getLetterPosition = (note: string): number => {
  const letter = normaliseNoteName(note)
  const index = NOTE_LETTERS.indexOf(letter as typeof NOTE_LETTERS[number])
  if (index === -1) {
    throw new Error(`Invalid note letter: ${letter}`)
  }
  return index
}

const parsePitchOctave = (pitch: string): number => {
  const match = pitch.match(/\d+/)
  return match ? parseInt(match[0], 10) : 4
}

// ======================
// PITCH FINDING LOGIC
// ======================

const findRootPitch = (rootNote: string, filteredPitches: Note[], pitchDefinitions: Note[]): string => {
  const rootLetter = normaliseNoteName(rootNote)
  const rootAccidental = getAccidental(rootNote)
  
  const matchesNote = (note: Note) => {
    const noteLetter = normaliseNoteName(note.pitch)
    const noteAccidental = getAccidental(note.pitch)
    return noteLetter === rootLetter && noteAccidental === rootAccidental
  }
  
  const rootCandidates = filteredPitches.filter(matchesNote)
  if (rootCandidates.length > 0) {
    const sortedByOctave = rootCandidates.sort((a, b) => {
      const octaveA = parsePitchOctave(a.pitch)
      const octaveB = parsePitchOctave(b.pitch)
      return octaveA - octaveB
    })
    return sortedByOctave[0].pitch
  }
  
  const allRootCandidates = pitchDefinitions.filter(matchesNote)
  if (allRootCandidates.length === 0) {
    throw new Error(`No pitch found for root note: ${rootNote}`)
  }
  
  const sortedByOctave = allRootCandidates.sort((a, b) => {
    const octaveA = parsePitchOctave(a.pitch)
    const octaveB = parsePitchOctave(b.pitch)
    return octaveA - octaveB
  })
  return sortedByOctave[0].pitch
}

const calculateTargetOctave = (
  index: number,
  rootOctave: number,
  rootLetterPos: number,
  noteLetterPos: number
): number => {
  if (index === 0) {
    return rootOctave
  }
  
  if (index === 1) {
    // Third: goes to next octave only if it wraps around (e.g., A -> C)
    return (rootLetterPos + 2 >= 7 || noteLetterPos < rootLetterPos)
      ? rootOctave + 1
      : rootOctave
  }
  
  if (index === 2) {
    // Fifth: goes to next octave only if it wraps around (e.g., G -> D, F -> C)
    return (rootLetterPos + 4 >= 7 || noteLetterPos < rootLetterPos)
      ? rootOctave + 1
      : rootOctave
  }
  
  return rootOctave
}

const findCandidatesInOctave = (
  octave: number,
  noteLetter: string,
  noteAccidental: string,
  searchList: Note[]
): Note[] => {
  return searchList.filter((note: Note) => {
    const pLetter = normaliseNoteName(note.pitch)
    const pAccidental = getAccidental(note.pitch)
    const pOctave = parsePitchOctave(note.pitch)
    return pLetter === noteLetter && pAccidental === noteAccidental && pOctave === octave
  })
}

const findCandidatesByNote = (
  noteLetter: string,
  noteAccidental: string,
  searchList: Note[]
): Note[] => {
  return searchList.filter((note: Note) => {
    const pLetter = normaliseNoteName(note.pitch)
    const pAccidental = getAccidental(note.pitch)
    return pLetter === noteLetter && pAccidental === noteAccidental
  })
}

const findChordNote = (
  note: string,
  targetOctave: number,
  filteredPitches: Note[],
  pitchDefinitions: Note[],
  rootPitch: string
): Note => {
  const noteLetter = normaliseNoteName(note)
  const noteAccidental = getAccidental(note)
  
  let candidates: Note[] = []
  
  // Try stage-filtered pitches first
  if (filteredPitches.length > 0) {
    candidates = findCandidatesInOctave(targetOctave, noteLetter, noteAccidental, filteredPitches)
    if (candidates.length === 0) {
      candidates = findCandidatesByNote(noteLetter, noteAccidental, filteredPitches)
    }
  }
  
  // Fallback to all pitch definitions
  if (candidates.length === 0) {
    candidates = findCandidatesInOctave(targetOctave, noteLetter, noteAccidental, pitchDefinitions)
    if (candidates.length === 0) {
      candidates = findCandidatesByNote(noteLetter, noteAccidental, pitchDefinitions)
    }
  }
  
  if (candidates.length === 0) {
    throw new Error(`Could not find pitch for note: ${note}. Available pitches: ${pitchDefinitions.length}`)
  }
  
  // If we have multiple candidates, prefer the one closest to target octave
  if (candidates.length > 1) {
    const sortedByOctave = candidates.sort((a, b) => {
      const octaveA = parsePitchOctave(a.pitch)
      const octaveB = parsePitchOctave(b.pitch)
      const distanceA = Math.abs(octaveA - targetOctave)
      const distanceB = Math.abs(octaveB - targetOctave)
      if (distanceA !== distanceB) {
        return distanceA - distanceB
      }
      return octaveA - octaveB
    })
    return sortedByOctave[0]
  }
  
  return candidates[0]
}

// ======================
// MAIN EXPORT FUNCTION
// ======================

export const addRegisterToChord = (notes: readonly string[], clef: ClefType, stage: StageNumber): Note[] => {
  const stageNoteRange = getCumulativeNoteDefinitions(stage, clef)
  const pitchDefinitions = getPitchDefinitionsForClef(clef)
  const filteredPitches = stageNoteRange
  
  const rootNote = notes[0]
  const rootPitch = findRootPitch(rootNote, filteredPitches, pitchDefinitions)
  const rootOctave = parsePitchOctave(rootPitch)
  const rootLetterPos = getLetterPosition(rootNote)
  
  const rootNoteObj = pitchDefinitions.find((p: Note) => p.pitch === rootPitch)
  if (!rootNoteObj) {
    throw new Error(`Root pitch not found in definitions: ${rootPitch}`)
  }
  
  return notes.map((note, index) => {
    if (index === 0) {
      return rootNoteObj
    }
    
    const noteLetterPos = getLetterPosition(note)
    const targetOctave = calculateTargetOctave(index, rootOctave, rootLetterPos, noteLetterPos)
    
    return findChordNote(note, targetOctave, filteredPitches, pitchDefinitions, rootPitch)
  })
}

