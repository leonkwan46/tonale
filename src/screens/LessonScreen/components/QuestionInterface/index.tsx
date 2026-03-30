import type { Question, QuestionInterface as QuestionInterfaceKind } from '@types'
import { type FC } from 'react'
import { Notation } from './QuestionTypes/Notation'
import { Playback } from './QuestionTypes/Playback'
import { Symbols } from './QuestionTypes/Symbols'
import { QUESTION_TYPE } from './QuestionTypes/types'

interface QuestionInterfaceProps {
  question: Question
  enableMetronome?: boolean
}

/** Same rule as curriculum (e.g. musicalTerm generator): termAndSign → symbols, else → notation. */
const inferInterfaceFromVisual = (
  visual: NonNullable<Question['visualComponent']>
): QuestionInterfaceKind =>
  visual.type === 'termAndSign'
    ? { type: QUESTION_TYPE.SYMBOLS }
    : { type: QUESTION_TYPE.NOTATION }

const getEffectiveInterface = (question: Question): QuestionInterfaceKind | null => {
  const { questionInterface, visualComponent } = question
  return questionInterface ?? (visualComponent ? inferInterfaceFromVisual(visualComponent) : null)
}

export const QuestionInterface: FC<QuestionInterfaceProps> = ({
  question,
  enableMetronome = false
}) => {
  const effective = getEffectiveInterface(question)
  if (!effective) return null

  const { visualComponent, stage } = question

  switch (effective.type) {
    case QUESTION_TYPE.PLAYBACK:
      return (
        <Playback
          questionInterface={effective}
          enableMetronome={enableMetronome}
        />
      )
    case QUESTION_TYPE.NOTATION:
      return visualComponent ? <Notation visualComponent={visualComponent} stage={stage} /> : null
    case QUESTION_TYPE.SYMBOLS:
      return visualComponent ? <Symbols visualComponent={visualComponent} /> : null
    default:
      return null
  }
}
