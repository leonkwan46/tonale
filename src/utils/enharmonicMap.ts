import { NOTE_NAME_TO_FREQ } from '../constants/pitchFrequencies'

type PianoKey = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

const PIANO_KEYS: PianoKey[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function getNoteFrequency(noteName: string): number | null {
  const trimmed = noteName.trim()
  return NOTE_NAME_TO_FREQ[trimmed] ?? null
}

function getPianoKeyForFrequency(frequency: number): PianoKey | null {
  for (const key of PIANO_KEYS) {
    const keyFreq = NOTE_NAME_TO_FREQ[key]
    if (keyFreq !== undefined && keyFreq === frequency) {
      return key
    }
  }
  return null
}

function getPianoKeyForNote(noteName: string): PianoKey | null {
  if (!noteName) return null
  
  const frequency = getNoteFrequency(noteName)
  if (frequency === null) return null
  
  return getPianoKeyForFrequency(frequency)
}

export function isEnharmonicEquivalent(noteName1: string, noteName2: string): boolean {
  const key1 = getPianoKeyForNote(noteName1)
  const key2 = getPianoKeyForNote(noteName2)
  
  if (!key1 || !key2) {
    return false
  }
  
  return key1 === key2
}

