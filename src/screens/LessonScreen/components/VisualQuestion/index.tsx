import { GRADE_ONE_ACCIDENTAL_SIGNS, GRADE_ONE_ARTICULATION_SIGNS, GRADE_ONE_DYNAMIC_SYMBOLS, TERM_DISPLAY_NAMES } from '@/config/gradeSyllabus'
import { useDevice } from '@/hooks'
import { DisplayCard } from '@/sharedComponents/DisplayCard'
import { TimeSignature } from '@/sharedComponents/TimeSignature'
import { formatAsNotation } from '@/theory/exercises/utils/timeSignature'
import { canPronounceTerm, pronounceTerm } from '@/utils/pronounce'
import { useTheme } from '@emotion/react'
import { Ionicons } from '@expo/vector-icons'
import {
  MusicStaff,
  NoteType,
  parseTimeSignature as parseTimeSignatureFromLibrary,
  Tuplets,
  type MusicElementData
} from '@leonkwan46/music-notation'
import type { VisualComponent } from '@types'
import * as React from 'react'
import { scale } from 'react-native-size-matters'
import { SMuFLCard } from '../SMuFLCard'
import { SMuFLSymbolContainer, SMuFLSymbolText, TTSButton, VisualQuestionContainer } from './VisualQuestion.styles'
import { generateTripletElements, renderNoteComponent } from './visualRenderHelper'

interface VisualQuestionProps {
  visualComponent: VisualComponent
}

export const VisualQuestion = ({ visualComponent }: VisualQuestionProps) => {
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
  const renderAsSymbol = visualComponent.renderAsSymbol !== false

  const symbolText = renderAsSymbol && visualComponent.symbolType ? 
    GRADE_ONE_DYNAMIC_SYMBOLS[visualComponent.symbolType as keyof typeof GRADE_ONE_DYNAMIC_SYMBOLS] ||
    GRADE_ONE_ARTICULATION_SIGNS[visualComponent.symbolType as keyof typeof GRADE_ONE_ARTICULATION_SIGNS] ||
    GRADE_ONE_ACCIDENTAL_SIGNS[visualComponent.symbolType as keyof typeof GRADE_ONE_ACCIDENTAL_SIGNS] || 
    '' : ''
  const isTextTerm = visualComponent.symbolType ? 
    !renderAsSymbol ||
    (!(visualComponent.symbolType in GRADE_ONE_DYNAMIC_SYMBOLS) && 
    !(visualComponent.symbolType in GRADE_ONE_ARTICULATION_SIGNS) &&
    !(visualComponent.symbolType in GRADE_ONE_ACCIDENTAL_SIGNS)) : false
  const displayText = visualComponent.symbolType ? TERM_DISPLAY_NAMES[visualComponent.symbolType as keyof typeof TERM_DISPLAY_NAMES] || visualComponent.symbolType : ''
  
  const isWideDynamic = visualComponent.symbolType === 'crescendo' || 
                        visualComponent.symbolType === 'decrescendo' || 
                        visualComponent.symbolType === 'diminuendo' ||
                        visualComponent.symbolType === 'cresc.' || 
                        visualComponent.symbolType === 'decresc.' || 
                        visualComponent.symbolType === 'dim.'

  // TTS helpers
  const shouldShowTTSButton =
    visualComponent.symbolType &&
    visualComponent.enableTTS !== false &&
    canPronounceTerm(visualComponent.symbolType)

  const handleTTS = () => {
    if (visualComponent.symbolType && visualComponent.enableTTS !== false && canPronounceTerm(visualComponent.symbolType)) {
      pronounceTerm(visualComponent.symbolType)
    }
  }

  return (
    <VisualQuestionContainer isTablet={isTablet} isSMuFLSymbol={visualComponent.type === 'termAndSign'} needsExtraSpacing={needsExtraHeight || false}>
      {visualComponent.type === 'timeSignature' && (
        <DisplayCard>
          <TimeSignature timeSignature={visualComponent.timeSignatureValue || ''} />
        </DisplayCard>
      )}
      
      {visualComponent.type === 'noteValue' && visualComponent.noteType && (
        <DisplayCard>
          {renderNoteComponent(visualComponent.noteType)}
        </DisplayCard>
      )}
      
      {visualComponent.type === 'triplet' && visualComponent.tupletConfig && (
        <DisplayCard>
          <Tuplets
            noteType={visualComponent.tupletConfig.noteType as NoteType}
            numberOfNotes={visualComponent.tupletConfig.numberOfNotes}
            elements={generateTripletElements(visualComponent.tupletConfig.noteType as NoteType, visualComponent.tupletConfig.numberOfNotes)}
          />
        </DisplayCard>
      )}
      
      {visualComponent.type === 'termAndSign' && visualComponent.symbolType && (
        <SMuFLCard isTablet={isTablet} isTextTerm={isTextTerm}>
          <SMuFLSymbolContainer isTablet={isTablet} isTextTerm={isTextTerm}>
            <SMuFLSymbolText isTablet={isTablet} isTextTerm={isTextTerm} isWideDynamic={isWideDynamic}>
              {isTextTerm ? displayText : symbolText}
            </SMuFLSymbolText>
          </SMuFLSymbolContainer>
          {shouldShowTTSButton && (
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
      
      {shouldRenderIndividualNotes && visualComponent.elements?.[0]?.type && (
        <DisplayCard>
          {renderNoteComponent(visualComponent.elements[0].type)}
        </DisplayCard>
      )}
      
      {shouldRenderMusicStaff && (
        <DisplayCard minHeight={needsExtraHeight ? 300 : 200}>
          <MusicStaff
            size={visualComponent.size}
            clef={visualComponent.clef}
            timeSignature={visualComponent.timeSignature 
              ? parseTimeSignatureFromLibrary(
                  typeof visualComponent.timeSignature === 'string'
                    ? visualComponent.timeSignature
                    : formatAsNotation(visualComponent.timeSignature)
                )
              : undefined}
            keyName={visualComponent.keyName}
            elements={visualComponent.isChord 
              ? [visualComponent.elements || []] 
              : (visualComponent.elements || []).map((element: MusicElementData) => [element])}
            showStaff={visualComponent.showStaff}
          />
        </DisplayCard>
      )}
    </VisualQuestionContainer>
  )
}

