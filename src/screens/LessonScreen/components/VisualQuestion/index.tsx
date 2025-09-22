import { VisualComponent } from '@/data/theoryData/types'
import { useDevice } from '@/hooks'
import { DisplayCard } from '@/sharedComponents/DisplayCard'
import { TimeSignature } from '@/sharedComponents/TimeSignature'
import {
  Crotchet,
  Minim,
  MusicStaff,
  Quaver,
  Semibreve,
  Semiquaver,
  parseTimeSignature as parseTimeSignatureFromLibrary
} from '@leonkwan46/music-notation'
import React from 'react'
import { VisualQuestionContainer } from './VisualQuestion.styles'

interface VisualQuestionProps {
  visualComponent: VisualComponent
}

// Helper function to render individual note components
const renderNoteComponent = (noteType: string) => {
  switch (noteType) {
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

  console.log('isTablet', isTablet)
  console.log('isNoteIdentification', isNoteIdentification)

  return (
    <VisualQuestionContainer isTablet={isTablet} isNoteIdentification={isNoteIdentification || false}>
      <DisplayCard extraHeight={isNoteIdentification}>
        {renderVisualContent()}
      </DisplayCard>
    </VisualQuestionContainer>
  )
}
