import { DisplayCard } from '@/sharedComponents/DisplayCard'
import type { QuestionInterface } from '@types'
import { type FC } from 'react'
import { renderNoteComponent } from '../../visualRenderHelper'
import { QUESTION_TYPE } from '../types'

interface NoteValueProps {
  questionInterface: QuestionInterface
}

export const NoteValue: FC<NoteValueProps> = ({ questionInterface }) => {
  if (questionInterface.type !== QUESTION_TYPE.NOTE_VALUE || !questionInterface.noteType) return null

  return (
    <DisplayCard extraHeight={false}>
      {renderNoteComponent(questionInterface.noteType)}
    </DisplayCard>
  )
}
