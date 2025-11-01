import { GRADE_ONE_ARTICULATION_SIGNS, GRADE_ONE_DYNAMIC_SYMBOLS, TERM_DISPLAY_NAMES } from '@/config/gradeSyllabus/MusicalTerms'
import { STAGE_ONE_MUSICAL_TERMS } from '@/data/stageSyllabus/musicalTerms'
import { VisualComponent } from '@/data/theoryData/types'
import { useDevice } from '@/hooks'
import { DisplayCard } from '@/sharedComponents/DisplayCard'
import { TimeSignature } from '@/sharedComponents/TimeSignature'
import { canPronounceTerm, pronounceTerm } from '@/utils/pronounce'
import { useTheme } from '@emotion/react'
import { Ionicons } from '@expo/vector-icons'
import {
  Crotchet,
  CrotchetRest,
  Minim,
  MinimRest,
  MusicStaff,
  NoteType,
  parseTimeSignature as parseTimeSignatureFromLibrary,
  Quaver,
  QuaverRest,
  Semibreve,
  SemibreveRest,
  Semiquaver,
  SemiquaverRest,
  Tuplets,
  type MusicElementData
} from '@leonkwan46/music-notation'
import * as React from 'react'
import { scale } from 'react-native-size-matters'
import { SMuFLCard } from '../../../../sharedComponents/SMuFLCard'
import { SMuFLSymbolContainer, SMuFLSymbolText, TTSButton, VisualQuestionContainer } from './VisualQuestion.styles'

interface VisualQuestionProps {
  visualComponent: VisualComponent
}

// Helper function to generate triplet elements for display
const generateTripletElements = (noteType: NoteType, numberOfNotes: number = 3): MusicElementData[][] => {
  const elements: MusicElementData[][] = []
  
  for (let i = 0; i < numberOfNotes; i++) {
    elements.push([{ type: noteType, pitch: 'C4' }])
  }
  
  return elements
}

// Helper function to render individual note/rest components
const renderNoteComponent = (noteType: any) => {
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

export const VisualQuestion: React.FC<VisualQuestionProps> = ({ visualComponent }: VisualQuestionProps) => {
  const { isTablet } = useDevice()
  const theme = useTheme()

  // Check if this visual needs extra height (complex music staff with pitch elements)
  const needsExtraHeight = visualComponent.clef && 
    visualComponent.elements && 
    visualComponent.elements.length > 0 &&
    visualComponent.elements.some(element => element.pitch) &&
    visualComponent.type !== 'termAndSign'

  // Check if this should render individual notes (single element, no clef)
  const shouldRenderIndividualNotes = visualComponent.type !== 'timeSignature' && 
    visualComponent.type !== 'noteValue' && 
    visualComponent.type !== 'termAndSign' && 
    visualComponent.elements?.length === 1 && 
    !visualComponent.clef

  // Check if this should render music staff (default case)
  const shouldRenderMusicStaff = visualComponent.type !== 'timeSignature' && 
    visualComponent.type !== 'noteValue' && 
    visualComponent.type !== 'termAndSign' && 
    !(visualComponent.elements?.length === 1 && !visualComponent.clef)

  // SMuFL symbol helpers
  const symbolText = visualComponent.symbolType ? 
    GRADE_ONE_DYNAMIC_SYMBOLS[visualComponent.symbolType as keyof typeof GRADE_ONE_DYNAMIC_SYMBOLS] ||
    GRADE_ONE_ARTICULATION_SIGNS[visualComponent.symbolType as keyof typeof GRADE_ONE_ARTICULATION_SIGNS] || 
    '' : ''
  const isTextTerm = visualComponent.symbolType ? 
    !(visualComponent.symbolType in GRADE_ONE_DYNAMIC_SYMBOLS) && 
    !(visualComponent.symbolType in GRADE_ONE_ARTICULATION_SIGNS) : false
  const displayText = visualComponent.symbolType ? TERM_DISPLAY_NAMES[visualComponent.symbolType as keyof typeof TERM_DISPLAY_NAMES] || visualComponent.symbolType : ''

  // TTS helpers
  const isItalianMusicalTerm = visualComponent.symbolType && 
    STAGE_ONE_MUSICAL_TERMS[visualComponent.symbolType as keyof typeof STAGE_ONE_MUSICAL_TERMS]
  
  const handleTTS = () => {
    if (visualComponent.symbolType && canPronounceTerm(visualComponent.symbolType)) {
      pronounceTerm(visualComponent.symbolType)
    }
  }

  return (
    <VisualQuestionContainer isTablet={isTablet} isSMuFLSymbol={visualComponent.type === 'termAndSign'} needsExtraSpacing={needsExtraHeight || false}>
      {visualComponent.type === 'timeSignature' && (
        <DisplayCard extraHeight={false}>
          <TimeSignature timeSignature={visualComponent.timeSignatureValue || ''} />
        </DisplayCard>
      )}
      
      {visualComponent.type === 'noteValue' && (
        <DisplayCard extraHeight={false}>
          {renderNoteComponent(visualComponent.noteType)}
        </DisplayCard>
      )}
      
      {visualComponent.type === 'triplet' && visualComponent.tupletConfig && (
        <DisplayCard extraHeight={false}>
          <Tuplets
            noteType={visualComponent.tupletConfig.noteType as any}
            numberOfNotes={visualComponent.tupletConfig.numberOfNotes}
            elements={generateTripletElements(visualComponent.tupletConfig.noteType as any, visualComponent.tupletConfig.numberOfNotes)}
          />
        </DisplayCard>
      )}
      
      {visualComponent.type === 'termAndSign' && visualComponent.symbolType && (
        <SMuFLCard isTablet={isTablet} isTextTerm={isTextTerm}>
          <SMuFLSymbolContainer isTablet={isTablet} isTextTerm={isTextTerm}>
            <SMuFLSymbolText isTablet={isTablet} isTextTerm={isTextTerm}>
              {isTextTerm ? displayText : symbolText}
            </SMuFLSymbolText>
          </SMuFLSymbolContainer>
          {isItalianMusicalTerm && (
            <TTSButton onPress={handleTTS}>
              <Ionicons 
                name="volume-high" 
                size={scale(20)} 
                color={theme.colors.text} 
              />
            </TTSButton>
          )}
        </SMuFLCard>
      )}
      
      {shouldRenderIndividualNotes && (
        <DisplayCard extraHeight={false}>
          {renderNoteComponent(visualComponent.elements?.[0]?.type)}
        </DisplayCard>
      )}
      
      {shouldRenderMusicStaff && (
        <DisplayCard extraHeight={needsExtraHeight}>
          <MusicStaff
            size={'xs'}
            clef={visualComponent.clef}
            timeSignature={visualComponent.timeSignature ? parseTimeSignatureFromLibrary(visualComponent.timeSignature) : undefined}
            keyName={visualComponent.keyName}
            elements={visualComponent.isChord 
              ? [visualComponent.elements || []] 
              : (visualComponent.elements || []).map((element: MusicElementData) => [element])}
          />
        </DisplayCard>
      )}
    </VisualQuestionContainer>
  )
}

