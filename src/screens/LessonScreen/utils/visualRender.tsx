import { GRADE_ONE_ACCIDENTAL_SIGNS, GRADE_ONE_ARTICULATION_SIGNS, GRADE_ONE_DYNAMIC_SYMBOLS, TERM_DISPLAY_NAMES } from '@/config/gradeSyllabus'
import { formatAsNotation } from '@/subjects/theory/exercises/utils/timeSignature'
import { canPronounceTerm } from '@/utils/pronounce'
import {
  CommonTime,
  Crotchet,
  CrotchetRest,
  CutTime,
  TimeSignature as LibraryTimeSignature,
  Minim,
  MinimRest,
  MusicStaff,
  NoteType,
  parseTimeSignature,
  Quaver,
  QuaverRest,
  Semibreve,
  SemibreveRest,
  Semiquaver,
  SemiquaverRest,
  Tuplets,
  type ClefType,
  type KeyName,
  type MusicElementData,
  type TimeSignatureType
} from '@leonkwan46/music-notation'
import type { StageNumber, VisualComponent, VisualComponentSize } from '@types'
import { SMuFLCard } from '../components/SMuFLCard'
import { TTSButton } from '../components/VisualQuestion/TTSButton'
import { SMuFLSymbolText } from '../components/VisualQuestion/VisualQuestion.styles'

const MUSIC_STAFF_HEIGHTS: Record<StageNumber, number> = {
  0: 250,
  1: 250,
  2: 270,
  3: 300,
  4: 300,
  5: 300,
  6: 300
}

const WIDE_DYNAMIC_SYMBOLS = ['crescendo', 'decrescendo', 'diminuendo', 'cresc.', 'decresc.', 'dim.'] as const

export const renderTriplet = (noteType: NoteType, numberOfNotes: number) => {
  const elements: MusicElementData[][] = []

  for (let i = 0; i < numberOfNotes; i++) {
    elements.push([{ type: noteType, pitch: 'F4' }])
  }

  return (
    <Tuplets
      noteType={noteType}
      numberOfNotes={numberOfNotes}
      elements={elements}
    />
  )
}

export const renderNoteComponent = (noteType: VisualComponent['noteType']) => {
  if (!noteType || typeof noteType !== 'object' || !noteType.type) {
    throw new Error(`Invalid noteType: ${JSON.stringify(noteType)}`)
  }

  const { type, dots = 0 } = noteType
  switch (type) {
    case 'semibreve':
      return <Semibreve centered={true} dots={dots} />
    case 'minim':
      return <Minim stem="up" centered={true} dots={dots} />
    case 'crotchet':
      return <Crotchet stem="up" centered={true} dots={dots} />
    case 'quaver':
      return <Quaver stem="up" centered={true} dots={dots} />
    case 'semiquaver':
      return <Semiquaver stem="up" centered={true} dots={dots} />
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
      throw new Error(`Unknown note type: ${type}`)
  }
}

export const renderTimeSignature = (timeSignatureValue: string | TimeSignatureType | undefined) => {
  const value = timeSignatureValue || ''
  const timeSignatureString = typeof value === 'string' ? value : formatAsNotation(value)
  const parsedTimeSignature = parseTimeSignature(timeSignatureString)

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

export const renderTermAndSign = (
  symbolType: string,
  renderAsSymbol: boolean | undefined,
  enableTTS: boolean | undefined
) => {
  const shouldRenderAsSymbol = renderAsSymbol !== false
  const symbolText =
    !symbolType || !shouldRenderAsSymbol
      ? ''
      : GRADE_ONE_DYNAMIC_SYMBOLS[symbolType as keyof typeof GRADE_ONE_DYNAMIC_SYMBOLS] ||
        GRADE_ONE_ARTICULATION_SIGNS[symbolType as keyof typeof GRADE_ONE_ARTICULATION_SIGNS] ||
        GRADE_ONE_ACCIDENTAL_SIGNS[symbolType as keyof typeof GRADE_ONE_ACCIDENTAL_SIGNS] ||
        ''

  const isTextTermValue =
    !symbolType ? false : !shouldRenderAsSymbol ? true : !(symbolType in GRADE_ONE_DYNAMIC_SYMBOLS) && !(symbolType in GRADE_ONE_ARTICULATION_SIGNS) && !(symbolType in GRADE_ONE_ACCIDENTAL_SIGNS)

  const displayText = !symbolType ? '' : TERM_DISPLAY_NAMES[symbolType as keyof typeof TERM_DISPLAY_NAMES] || symbolType
  const isWideDynamicValue = Boolean(symbolType && WIDE_DYNAMIC_SYMBOLS.includes(symbolType as (typeof WIDE_DYNAMIC_SYMBOLS)[number]))
  const showTTSButton = Boolean(symbolType && enableTTS !== false && canPronounceTerm(symbolType))

  return (
    <SMuFLCard isTextTerm={isTextTermValue}>
      <SMuFLSymbolText isTextTerm={isTextTermValue} isWideDynamic={isWideDynamicValue}>
        {isTextTermValue ? displayText : symbolText}
      </SMuFLSymbolText>
      {showTTSButton && <TTSButton symbolType={symbolType} />}
    </SMuFLCard>
  )
}

export const calculateMusicStaffMinHeight = (
  clef: ClefType | undefined,
  elements: MusicElementData[] | undefined,
  stage: StageNumber | undefined
): number => {
  if (!clef || !elements?.length || !elements.some(el => el.pitch)) return 200
  return stage !== undefined ? MUSIC_STAFF_HEIGHTS[stage] : 300
}

const parseTimeSignatureForLibrary = (value: string | TimeSignatureType) =>
  parseTimeSignature(typeof value === 'string' ? value : formatAsNotation(value))

export const renderMusicStaff = (
  size: VisualComponentSize | undefined,
  clef: ClefType | undefined,
  timeSignature: TimeSignatureType | string | undefined,
  keyName: KeyName | undefined,
  elements: MusicElementData[] | undefined,
  isChord: boolean | undefined,
  showStaff: boolean | undefined
) => (
  <MusicStaff
    size={size}
    clef={clef}
    timeSignature={
      !timeSignature
        ? undefined
        : typeof timeSignature === 'string'
          ? parseTimeSignatureForLibrary(timeSignature)
          : parseTimeSignatureForLibrary(formatAsNotation(timeSignature))
    }
    keyName={keyName}
    elements={!elements ? [] : isChord ? [elements] : elements.map((el: MusicElementData) => [el])}
    showStaff={showStaff}
  />
)
