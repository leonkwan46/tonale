import { DisplayCard } from '@/sharedComponents/DisplayCard'
import type { QuestionInterface } from '@types'
import { type FC } from 'react'
import { renderNoteComponent } from '../../visualRenderHelper'
import { QUESTION_TYPE } from '../types'

interface IndividualNotesProps {
  questionInterface: QuestionInterface
}

export const IndividualNotes: FC<IndividualNotesProps> = ({ questionInterface }) => {
  const shouldRender = questionInterface.type !== QUESTION_TYPE.TIME_SIGNATURE && 
    questionInterface.type !== QUESTION_TYPE.NOTE_VALUE && 
    questionInterface.type !== QUESTION_TYPE.TERM_AND_SIGN && 
    questionInterface.type !== QUESTION_TYPE.PLAYBACK &&
    questionInterface.elements?.length === 1 && 
    !questionInterface.clef

  if (!shouldRender || !questionInterface.elements?.[0]?.type) return null

  return (
    <DisplayCard extraHeight={false}>
      {renderNoteComponent(questionInterface.elements[0].type)}
    </DisplayCard>
  )
}
