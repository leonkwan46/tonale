import { GRADE_ONE_ACCIDENTAL_SIGNS, GRADE_ONE_ARTICULATION_SIGNS, GRADE_ONE_DYNAMIC_SYMBOLS, TERM_DISPLAY_NAMES } from '@/config/gradeSyllabus'
import { useDevice } from '@/hooks'
import { DisplayCard } from '@/sharedComponents/DisplayCard'
import { TimeSignature } from '@/sharedComponents/TimeSignature'
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
import { type FC } from 'react'
import { scale } from 'react-native-size-matters'
import { SMuFLCard } from '../../../../sharedComponents/SMuFLCard'
import { PlaybackCard, PlaybackText, PlayButton, SMuFLSymbolContainer, SMuFLSymbolText, TTSButton, VisualQuestionContainer } from './VisualQuestion.styles'
import { generateTripletElements, renderNoteComponent } from './visualRenderHelper'

interface VisualQuestionProps {
  visualComponent: VisualComponent
  onPlaybackPress?: () => void
  isPlaying?: boolean
}

export const VisualQuestion: FC<VisualQuestionProps> = ({ 
  visualComponent, 
  onPlaybackPress,
  isPlaying = false
}: VisualQuestionProps) => {
  const { isTablet } = useDevice()
  const theme = useTheme()

  const needsExtraHeight = visualComponent.clef && 
    visualComponent.elements && 
    visualComponent.elements.length > 0 &&
    visualComponent.elements.some(element => element.pitch) &&
    visualComponent.type !== 'termAndSign'

  const shouldRenderIndividualNotes = visualComponent.type !== 'timeSignature' && 
    visualComponent.type !== 'noteValue' && 
    visualComponent.type !== 'termAndSign' && 
    visualComponent.type !== 'playback' &&
    visualComponent.elements?.length === 1 && 
    !visualComponent.clef

  const shouldRenderMusicStaff = visualComponent.type !== 'timeSignature' && 
    visualComponent.type !== 'noteValue' && 
    visualComponent.type !== 'termAndSign' && 
    visualComponent.type !== 'playback' &&
    !onPlaybackPress &&
    !(visualComponent.elements?.length === 1 && !visualComponent.clef)

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

  const shouldShowTTSButton =
    visualComponent.symbolType &&
    visualComponent.enableTTS !== false &&
    canPronounceTerm(visualComponent.symbolType)

  const handleTTS = () => {
    if (visualComponent.symbolType && visualComponent.enableTTS !== false && canPronounceTerm(visualComponent.symbolType)) {
      pronounceTerm(visualComponent.symbolType)
    }
  }

  const shouldShowPlayback = visualComponent.type === 'playback' || onPlaybackPress

  return (
    <VisualQuestionContainer isTablet={isTablet} isSMuFLSymbol={visualComponent.type === 'termAndSign'} needsExtraSpacing={needsExtraHeight || false}>
      {visualComponent.type === 'timeSignature' && (
        <DisplayCard extraHeight={false}>
          <TimeSignature timeSignature={visualComponent.timeSignatureValue || ''} />
        </DisplayCard>
      )}
      
      {visualComponent.type === 'noteValue' && visualComponent.noteType && (
        <DisplayCard extraHeight={false}>
          {renderNoteComponent(visualComponent.noteType)}
        </DisplayCard>
      )}
      
      {visualComponent.type === 'triplet' && visualComponent.tupletConfig && (
        <DisplayCard extraHeight={false}>
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
      
      {shouldShowPlayback && (
        <PlaybackCard isTablet={isTablet}>
          <PlaybackText isTablet={isTablet}>
            Listen to the question
          </PlaybackText>
          <PlayButton 
            isTablet={isTablet}
            onPress={onPlaybackPress}
            disabled={isPlaying || !onPlaybackPress}
            style={{ opacity: (isPlaying || !onPlaybackPress) ? 0.6 : 1 }}
          >
            <Ionicons 
              name={isPlaying ? 'pause' : 'play'} 
              size={isTablet ? scale(40) : scale(50)} 
              color="#fff"
              style={{ marginLeft: isPlaying ? 0 : scale(2) }}
            />
          </PlayButton>
        </PlaybackCard>
      )}
      
      {shouldRenderIndividualNotes && visualComponent.elements?.[0]?.type && (
        <DisplayCard extraHeight={false}>
          {renderNoteComponent(visualComponent.elements[0].type)}
        </DisplayCard>
      )}
      
      {shouldRenderMusicStaff && (
        <DisplayCard extraHeight={needsExtraHeight}>
          <MusicStaff
            size={visualComponent.size}
            clef={visualComponent.clef}
            timeSignature={visualComponent.timeSignature ? parseTimeSignatureFromLibrary(visualComponent.timeSignature) : undefined}
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

