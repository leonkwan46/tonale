import { GRADE_ONE_ACCIDENTAL_SIGNS, GRADE_ONE_ARTICULATION_SIGNS, GRADE_ONE_DYNAMIC_SYMBOLS, TERM_DISPLAY_NAMES } from '@/config/gradeSyllabus'
import { formatAsNotation } from '@/theory/exercises/utils/timeSignature'
import {
  CommonTime,
  CutTime,
  TimeSignature as LibraryTimeSignature,
  MusicStaff,
  parseTimeSignature,
  parseTimeSignature as parseTimeSignatureFromLibrary,
  type MusicElementData
} from '@leonkwan46/music-notation'
import type { VisualComponent } from '@types'
import { renderNoteComponent } from '../../VisualQuestion/visualRenderHelper'
import { ExplanationCard, ExplanationSymbolContainer, ExplanationSymbolText, TabletNoteScaleContainer } from './VisualExplanation.styles'

interface VisualExplanationProps {
  visualComponent: VisualComponent
}

const WIDE_DYNAMIC_SYMBOLS = ['crescendo', 'decrescendo', 'diminuendo', 'cresc.', 'decresc.', 'dim.'] as const

const getSymbolText = (symbolType: string | undefined, renderAsSymbol: boolean): string => {
  if (!symbolType || !renderAsSymbol) return ''
  
  return GRADE_ONE_DYNAMIC_SYMBOLS[symbolType as keyof typeof GRADE_ONE_DYNAMIC_SYMBOLS] ||
    GRADE_ONE_ARTICULATION_SIGNS[symbolType as keyof typeof GRADE_ONE_ARTICULATION_SIGNS] ||
    GRADE_ONE_ACCIDENTAL_SIGNS[symbolType as keyof typeof GRADE_ONE_ACCIDENTAL_SIGNS] || 
    ''
}

const isTextTerm = (symbolType: string | undefined, renderAsSymbol: boolean): boolean => {
  if (!symbolType) return false
  if (!renderAsSymbol) return true
  
  return !(symbolType in GRADE_ONE_DYNAMIC_SYMBOLS) &&
    !(symbolType in GRADE_ONE_ARTICULATION_SIGNS) &&
    !(symbolType in GRADE_ONE_ACCIDENTAL_SIGNS)
}

const getDisplayText = (symbolType: string | undefined): string => {
  if (!symbolType) return ''
  return TERM_DISPLAY_NAMES[symbolType as keyof typeof TERM_DISPLAY_NAMES] || symbolType
}

const isWideDynamic = (symbolType: string | undefined): boolean => {
  return Boolean(symbolType && WIDE_DYNAMIC_SYMBOLS.includes(symbolType as typeof WIDE_DYNAMIC_SYMBOLS[number]))
}

const formatMusicStaffElements = (
  elements: MusicElementData[] | undefined,
  isChord: boolean | undefined
): MusicElementData[][] => {
  if (!elements) return []
  
  return isChord 
    ? [elements] 
    : elements.map((element: MusicElementData) => [element])
}

export const VisualExplanation = ({ 
  visualComponent
}: VisualExplanationProps) => {
  const shouldRenderMusicStaff = Boolean(
    visualComponent.elements && 
    visualComponent.elements.length > 0 &&
    (visualComponent.clef || visualComponent.timeSignature)
  )

  const shouldRenderTimeSignature = visualComponent.type === 'timeSignature' && visualComponent.timeSignatureValue
  const shouldRenderNoteValue = visualComponent.type === 'noteValue' && visualComponent.noteType
  const shouldRenderTermAndSign = visualComponent.type === 'termAndSign' && visualComponent.symbolType

  if (shouldRenderTimeSignature && visualComponent.timeSignatureValue) {
    const timeSignatureValue = visualComponent.timeSignatureValue
    const timeSignatureString = typeof timeSignatureValue === 'string' ? timeSignatureValue : formatAsNotation(timeSignatureValue)
    const parsedTimeSignature = parseTimeSignature(timeSignatureString)
    
    const renderTimeSignature = () => {
      if (typeof parsedTimeSignature === 'string') {
        return parsedTimeSignature === 'common' ? (
          <CommonTime centered={true} />
        ) : (
          <CutTime centered={true} />
        )
      }
      
      return (
        <LibraryTimeSignature 
          topNumber={parsedTimeSignature.topNumber}
          bottomNumber={parsedTimeSignature.bottomNumber}
          centered={true}
        />
      )
    }
    
    return (
      <ExplanationCard>
        <TabletNoteScaleContainer>
          {renderTimeSignature()}
        </TabletNoteScaleContainer>
      </ExplanationCard>
    )
  }

  if (shouldRenderMusicStaff) {
    const timeSignatureString = visualComponent.timeSignature
      ? typeof visualComponent.timeSignature === 'string'
        ? visualComponent.timeSignature
        : formatAsNotation(visualComponent.timeSignature)
      : undefined
    
    return (
      <MusicStaff
        size={visualComponent.size}
        clef={visualComponent.clef}
        timeSignature={timeSignatureString 
          ? parseTimeSignatureFromLibrary(timeSignatureString) 
          : undefined}
        keyName={visualComponent.keyName}
        elements={formatMusicStaffElements(visualComponent.elements, visualComponent.isChord)}
        showStaff={visualComponent.showStaff}
      />
    )
  }

  if (shouldRenderNoteValue) {
    return (
      <ExplanationCard>
        <TabletNoteScaleContainer>
          {renderNoteComponent(visualComponent.noteType)}
        </TabletNoteScaleContainer>
      </ExplanationCard>
    )
  }

  if (shouldRenderTermAndSign) {
    const renderAsSymbol = visualComponent.renderAsSymbol !== false
    const symbolType = visualComponent.symbolType
    const symbolText = getSymbolText(symbolType, renderAsSymbol)
    const textTerm = isTextTerm(symbolType, renderAsSymbol)
    const displayText = getDisplayText(symbolType)
    const wideDynamic = isWideDynamic(symbolType)

    return (
      <ExplanationCard isTextTerm={textTerm}>
        <ExplanationSymbolContainer isTextTerm={textTerm}>
          <ExplanationSymbolText isTextTerm={textTerm} isWideDynamic={wideDynamic}>
            {textTerm ? displayText : symbolText}
          </ExplanationSymbolText>
        </ExplanationSymbolContainer>
      </ExplanationCard>
    )
  }

  return null
}
