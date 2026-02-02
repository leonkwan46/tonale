import { type TimeSignatureType } from '@leonkwan46/music-notation'
import { capitalize } from './question'

export const getNonnumberedTimeSignature = (timeSignature: 'common' | 'cut') => {
  return timeSignature === 'common' 
    ? { beatCount: 4, noteValueName: 'crotchet' }
    : { beatCount: 2, noteValueName: 'minim' }
}

export const formatAsNotation = (timeSignature: TimeSignatureType): string => {
  if (timeSignature === 'common' || timeSignature === 'cut') {
    return timeSignature
  }
  return `${timeSignature.topNumber}/${timeSignature.bottomNumber}`
}

export const getNoteValueName = (bottomNumber: number): string => {
  switch (bottomNumber) {
    case 1: return 'semibreve'
    case 2: return 'minim'
    case 4: return 'crotchet'
    case 8: return 'quaver'
    case 16: return 'semiquaver'
    default: 
      throw new Error(`Unsupported time signature bottom number: ${bottomNumber}`)
  }
}

export const formatAsText = (timeSignature: TimeSignatureType): string => {
  if (timeSignature === 'common' || timeSignature === 'cut') {
    const { beatCount, noteValueName } = getNonnumberedTimeSignature(timeSignature)
    return `${beatCount} ${capitalize(noteValueName)} Beats`
  }
  const beatCount = timeSignature.topNumber
  const noteValueName = getNoteValueName(timeSignature.bottomNumber)
  return `${beatCount} ${capitalize(noteValueName)} Beats`
}

export const generateWrongAnswers = (timeSignature: TimeSignatureType): string[] => {
  const { beatCount, noteValueName } = timeSignature === 'common' || timeSignature === 'cut'
    ? getNonnumberedTimeSignature(timeSignature)
    : { beatCount: timeSignature.topNumber, noteValueName: getNoteValueName(timeSignature.bottomNumber) }
  
  const allNoteValues = ['minim', 'crotchet', 'quaver']
  const alternativeNoteValues = allNoteValues.filter(value => value !== noteValueName)
  const alternativeBeatCounts = [2, 3, 4].filter(count => count !== beatCount)
  
  const wrongAnswers: string[] = []
  
  alternativeNoteValues.slice(0, 1).forEach(noteValue => {
    wrongAnswers.push(`${beatCount} ${capitalize(noteValue)} Beats`)
  })
  
  alternativeBeatCounts.slice(0, 1).forEach(count => {
    wrongAnswers.push(`${count} ${capitalize(noteValueName)} Beats`)
  })
  
  if (alternativeBeatCounts.length > 1 && alternativeNoteValues.length > 0) {
    wrongAnswers.push(`${alternativeBeatCounts[1]} ${capitalize(alternativeNoteValues[0])} Beats`)
  }
  
  return wrongAnswers
}

