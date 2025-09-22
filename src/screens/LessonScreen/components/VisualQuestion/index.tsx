import { VisualComponent } from '@/data/theoryData/types'
import { useDevice } from '@/hooks'
import { DisplayCard } from '@/sharedComponents/DisplayCard'
import { TimeSignature } from '@/sharedComponents/TimeSignature'
import {
  Crotchet,
  CrotchetRest,
  Minim,
  MinimRest,
  MusicStaff,
  Quaver,
  QuaverRest,
  Semibreve,
  SemibreveRest,
  Semiquaver,
  SemiquaverRest,
  parseTimeSignature as parseTimeSignatureFromLibrary
} from '@leonkwan46/music-notation'
import React from 'react'
import { VisualQuestionContainer } from './VisualQuestion.styles'

interface VisualQuestionProps {
  visualComponent: VisualComponent
}

// Helper function to render individual note/rest components
const renderNoteComponent = (noteType: string | { type: string; dots?: number }) => {
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
        return <Crotchet stem='up' centered={true} dots={dots} />
    }
  }
  
  // Handle string note/rest types (legacy support)
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
      return <Crotchet stem='up' centered={true} />
  }
}

export const VisualQuestion: React.FC<VisualQuestionProps> = ({ visualComponent }) => {
  const { isTablet } = useDevice()
  if (!visualComponent) {
    return null
  }

  // Check if this is a note identification exercise (has clef + elements with ledger lines/accidentals)
  const isNoteIdentification = visualComponent.clef && 
    visualComponent.elements && 
    visualComponent.elements.length > 0 &&
    visualComponent.elements.some(element => element.ledgerLines > 0)

  const renderVisualContent = () => {
    // Handle specific visual types
    if (visualComponent.type === 'timeSignature') {
      return <TimeSignature timeSignature={visualComponent.timeSignatureValue || ''} />
    }
    
    if (visualComponent.type === 'noteValue') {
      return renderNoteComponent(visualComponent.noteType || '')
    }
    
    // Handle legacy MusicStaff usage
    const useIndividualNotes = visualComponent.elements?.length === 1 && !visualComponent.clef
    
    if (useIndividualNotes) {
      return renderNoteComponent(visualComponent.elements?.[0]?.type || '')
    }
    
    return (
      <MusicStaff
        size={'xs'}
        clef={visualComponent.clef}
        timeSignature={visualComponent.timeSignature ? parseTimeSignatureFromLibrary(visualComponent.timeSignature) : undefined}
        keyName={visualComponent.keyName}
        elements={(visualComponent.elements || []).map(element => [element])}
      />
    )
  }

  return (
    <VisualQuestionContainer isTablet={isTablet} isNoteIdentification={isNoteIdentification || false}>
      <DisplayCard extraHeight={isNoteIdentification}>
        {renderVisualContent()}
      </DisplayCard>
    </VisualQuestionContainer>
  )
}
