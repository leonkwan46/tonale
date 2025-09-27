import { getDisplayName, getSMuFLSymbol, isTextTerm, STAGE_ONE_ITALIAN_MUSICAL_TERMS, STAGE_THREE_ITALIAN_MUSICAL_TERMS, STAGE_TWO_ITALIAN_MUSICAL_TERMS } from '@/data/stageSyllabusConfigs/musicalTerms'
import { VisualComponent } from '@/data/theoryData/types'
import { useDevice } from '@/hooks'
import { DisplayCard } from '@/sharedComponents/DisplayCard'
import { SMuFLSymbolContainer, SMuFLSymbolText } from '@/sharedComponents/SMuFLSymbols/SMuFLSymbol.styles'
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
  parseTimeSignature as parseTimeSignatureFromLibrary,
  Quaver,
  QuaverRest,
  Semibreve,
  SemibreveRest,
  Semiquaver,
  SemiquaverRest,
  type MusicElementData
} from '@leonkwan46/music-notation'
import * as React from 'react'
import { scale } from 'react-native-size-matters'
import { SMuFLCard, TTSButton, VisualQuestionContainer } from './VisualQuestion.styles'

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

export const VisualQuestion: React.FC<VisualQuestionProps> = ({ visualComponent }: VisualQuestionProps) => {
  const { isTablet } = useDevice()
  const theme = useTheme()

  // Check if this visual needs extra height (complex music staff with pitch elements)
  const needsExtraHeight = visualComponent.clef && 
    visualComponent.elements && 
    visualComponent.elements.length > 0 &&
    visualComponent.elements.some(element => element.pitch) &&
    visualComponent.type !== 'smuflSymbol'

  // Check if this should render individual notes (single element, no clef)
  const shouldRenderIndividualNotes = visualComponent.type !== 'timeSignature' && 
    visualComponent.type !== 'noteValue' && 
    visualComponent.type !== 'smuflSymbol' && 
    visualComponent.elements?.length === 1 && 
    !visualComponent.clef

  // Check if this should render music staff (default case)
  const shouldRenderMusicStaff = visualComponent.type !== 'timeSignature' && 
    visualComponent.type !== 'noteValue' && 
    visualComponent.type !== 'smuflSymbol' && 
    !(visualComponent.elements?.length === 1 && !visualComponent.clef)

  // SMuFL symbol helpers
  const symbolText = visualComponent.symbolType ? getSMuFLSymbol(visualComponent.symbolType) : ''
  const isTempoText = visualComponent.symbolType ? isTextTerm(visualComponent.symbolType) : false
  const displayText = visualComponent.symbolType ? getDisplayName(visualComponent.symbolType) : ''

  // TTS helpers
  const isItalianMusicalTerm = visualComponent.symbolType && 
    (STAGE_ONE_ITALIAN_MUSICAL_TERMS[visualComponent.symbolType as keyof typeof STAGE_ONE_ITALIAN_MUSICAL_TERMS] ||
     STAGE_TWO_ITALIAN_MUSICAL_TERMS[visualComponent.symbolType as keyof typeof STAGE_TWO_ITALIAN_MUSICAL_TERMS] ||
     STAGE_THREE_ITALIAN_MUSICAL_TERMS[visualComponent.symbolType as keyof typeof STAGE_THREE_ITALIAN_MUSICAL_TERMS])
  
  const handleTTS = () => {
    if (visualComponent.symbolType && canPronounceTerm(visualComponent.symbolType)) {
      pronounceTerm(visualComponent.symbolType)
    }
  }

  return (
    <VisualQuestionContainer isTablet={isTablet} isSMuFLSymbol={visualComponent.type === 'smuflSymbol'} needsExtraSpacing={needsExtraHeight || false}>
      {visualComponent.type === 'timeSignature' && (
        <DisplayCard extraHeight={false}>
          <TimeSignature timeSignature={visualComponent.timeSignatureValue || ''} />
        </DisplayCard>
      )}
      
      {visualComponent.type === 'noteValue' && (
        <DisplayCard extraHeight={false}>
          {renderNoteComponent(visualComponent.noteType || '')}
        </DisplayCard>
      )}
      
      {visualComponent.type === 'smuflSymbol' && visualComponent.symbolType && (
        <SMuFLCard isTablet={isTablet} isTempoText={isTempoText}>
          <SMuFLSymbolContainer isTablet={isTablet} isTempoText={isTempoText}>
            <SMuFLSymbolText isTablet={isTablet} isTempoText={isTempoText}>
              {isTempoText ? displayText : symbolText}
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
          {renderNoteComponent(visualComponent.elements?.[0]?.type || '')}
        </DisplayCard>
      )}
      
      {shouldRenderMusicStaff && (
        <DisplayCard extraHeight={needsExtraHeight}>
          <MusicStaff
            size={'xs'}
            clef={visualComponent.clef}
            timeSignature={visualComponent.timeSignature ? parseTimeSignatureFromLibrary(visualComponent.timeSignature) : undefined}
            keyName={visualComponent.keyName}
            elements={(visualComponent.elements || []).map((element: MusicElementData) => [element])}
          />
        </DisplayCard>
      )}
    </VisualQuestionContainer>
  )
}
