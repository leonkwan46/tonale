import {
  GRADE_ONE_ACCIDENTAL_SIGNS,
  GRADE_ONE_ARTICULATION_SIGNS,
  GRADE_ONE_DYNAMIC_SYMBOLS,
  TERM_DISPLAY_NAMES
} from '@/config/gradeSyllabus'
import { formatAsNotation } from '@/subjects/theory/exercises/utils/timeSignature'
import {
  MusicStaff,
  parseTimeSignature as parseTimeSignatureFromLibrary,
  type MusicElementData
} from '@leonkwan46/music-notation'
import type { VisualComponent } from '@types'
import { renderNoteComponent, renderTimeSignature } from '../../../utils/visualRender'
import { ExplanationCard, ExplanationSymbolContainer, ExplanationSymbolText } from './VisualExplanation.styles'

interface VisualExplanationProps {
  visualComponent: VisualComponent
}

const WIDE_DYNAMIC_SYMBOLS = ['crescendo', 'decrescendo', 'diminuendo', 'cresc.', 'decresc.', 'dim.'] as const

const getSymbolText = (symbolType: string | undefined, renderAsSymbol: boolean): string => {
  if (!symbolType || !renderAsSymbol) return ''
  return (
    GRADE_ONE_DYNAMIC_SYMBOLS[symbolType as keyof typeof GRADE_ONE_DYNAMIC_SYMBOLS] ||
    GRADE_ONE_ARTICULATION_SIGNS[symbolType as keyof typeof GRADE_ONE_ARTICULATION_SIGNS] ||
    GRADE_ONE_ACCIDENTAL_SIGNS[symbolType as keyof typeof GRADE_ONE_ACCIDENTAL_SIGNS] ||
    ''
  )
}

const isTextTerm = (symbolType: string | undefined, renderAsSymbol: boolean): boolean => {
  if (!symbolType || !renderAsSymbol) return false
  return (
    !(symbolType in GRADE_ONE_DYNAMIC_SYMBOLS) &&
    !(symbolType in GRADE_ONE_ARTICULATION_SIGNS) &&
    !(symbolType in GRADE_ONE_ACCIDENTAL_SIGNS)
  )
}

const getDisplayText = (symbolType: string | undefined): string => {
  return symbolType ? (TERM_DISPLAY_NAMES[symbolType as keyof typeof TERM_DISPLAY_NAMES] || symbolType) : ''
}

const isWideDynamic = (symbolType: string | undefined): boolean => {
  return Boolean(symbolType && WIDE_DYNAMIC_SYMBOLS.includes(symbolType as (typeof WIDE_DYNAMIC_SYMBOLS)[number]))
}

const formatMusicStaffElements = (
  elements: MusicElementData[] | undefined,
  isChord: boolean | undefined
): MusicElementData[][] => {
  if (!elements) return []
  return isChord ? [elements] : elements.map((el) => [el])
}

export const VisualExplanation = ({ visualComponent }: VisualExplanationProps) => {
  const hasMusicStaff =
    Boolean(visualComponent.elements?.length) && (visualComponent.clef || visualComponent.timeSignature)

  if (visualComponent.type === 'timeSignature' && visualComponent.timeSignatureValue) {
    return (
      <ExplanationCard>
        {renderTimeSignature(visualComponent.timeSignatureValue)}
      </ExplanationCard>
    )
  }

  if (hasMusicStaff) {
    const timeSignatureString = visualComponent.timeSignature
      ? typeof visualComponent.timeSignature === 'string'
        ? visualComponent.timeSignature
        : formatAsNotation(visualComponent.timeSignature)
      : undefined
    return (
      <MusicStaff
        size={visualComponent.size}
        clef={visualComponent.clef}
        timeSignature={
          timeSignatureString
            ? parseTimeSignatureFromLibrary(timeSignatureString)
            : undefined
        }
        keyName={visualComponent.keyName}
        elements={formatMusicStaffElements(
          visualComponent.elements,
          visualComponent.isChord
        )}
        showStaff={visualComponent.showStaff}
      />
    )
  }

  if (visualComponent.type === 'noteValue' && visualComponent.noteType) {
    return (
      <ExplanationCard>
        {renderNoteComponent(visualComponent.noteType)}
      </ExplanationCard>
    )
  }

  if (visualComponent.type === 'termAndSign' && visualComponent.symbolType) {
    const renderAsSymbol = visualComponent.renderAsSymbol !== false
    const symbolType = visualComponent.symbolType
    const textTerm = isTextTerm(symbolType, renderAsSymbol)
    const symbolText = getSymbolText(symbolType, renderAsSymbol)
    const displayText = getDisplayText(symbolType)
    const wideDynamic = isWideDynamic(symbolType)

    const cardText = (textTerm ? displayText : symbolText) || symbolType
    const useTextTermStyle = textTerm || cardText === symbolType
    return (
      <ExplanationCard>
        <ExplanationSymbolContainer isTextTerm={useTextTermStyle}>
          <ExplanationSymbolText
            isTextTerm={useTextTermStyle}
            isWideDynamic={wideDynamic}
          >
            {cardText}
          </ExplanationSymbolText>
        </ExplanationSymbolContainer>
      </ExplanationCard>
    )
  }

  return null
}
