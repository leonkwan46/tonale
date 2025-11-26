import {
  Crotchet,
  CrotchetRest,
  Minim,
  MinimRest,
  NoteType,
  Quaver,
  QuaverRest,
  Semibreve,
  SemibreveRest,
  Semiquaver,
  SemiquaverRest,
  type MusicElementData
} from '@leonkwan46/music-notation'
import { VisualComponent } from '@/theory/curriculum/types'

// Helper function to generate triplet elements for display
export const generateTripletElements = (noteType: NoteType, numberOfNotes: number = 3): MusicElementData[][] => {
  const elements: MusicElementData[][] = []
  
  for (let i = 0; i < numberOfNotes; i++) {
    elements.push([{ type: noteType, pitch: 'F4' }])
  }
  
  return elements
}

export const renderNoteComponent = (noteType: VisualComponent['noteType']) => {
  // Handle dotted note/rest objects
  if (typeof noteType === 'object' && noteType.type) {
    const { type, dots = 0 } = noteType
    switch (type) {
      // Notes
      case 'semibreve':
        return <Semibreve centered={true} dots={dots} />
      case 'minim':
        return <Minim stem='up' centered={true} dots={dots} />
      case 'crotchet':
        return <Crotchet stem='up' centered={true} dots={dots} />
      case 'quaver':
        return <Quaver stem='up' centered={true} dots={dots} />
      case 'semiquaver':
        return <Semiquaver stem='up' centered={true} dots={dots} />
      // Rests
      case 'semibreve-rest':
        return <SemibreveRest centered={true} dots={dots} />
      case 'minim-rest':
        return <MinimRest centered={true} dots={dots} />
      case 'crotchet-rest':
        return <CrotchetRest centered={true} dots={dots} isOlderForm={false} />
      case 'quaver-rest':
        return <QuaverRest centered={true} dots={dots} />
      case 'semiquaver-rest':
        return <SemiquaverRest centered={true} dots={dots} />
      default:
        throw new Error(`Unknown note type in object: ${type}`)
    }
  }
  
  // Handle string note/rest types (legacy support)
  if (typeof noteType === 'string') {
    switch (noteType) {
    // Notes
    case 'semibreve':
      return <Semibreve centered={true} />
    case 'minim':
      return <Minim stem='up' centered={true} />
    case 'crotchet':
      return <Crotchet stem='up' centered={true} />
    case 'quaver':
      return <Quaver stem='up' centered={true} />
    case 'semiquaver':
      return <Semiquaver stem='up' centered={true} />
    // Rests
    case 'semibreve-rest':
      return <SemibreveRest centered={true} />
    case 'minim-rest':
      return <MinimRest centered={true} />
    case 'crotchet-rest':
      return <CrotchetRest centered={true} isOlderForm={false} />
    case 'quaver-rest':
      return <QuaverRest centered={true} />
    case 'semiquaver-rest':
      return <SemiquaverRest centered={true} />
    default:
      throw new Error(`Unknown note type: ${noteType}`)
    }
  }
  
  throw new Error(`Invalid noteType: ${JSON.stringify(noteType)}`)
}

