import { DisplayCard } from '@/sharedComponents/DisplayCard'
import { NoteType, Tuplets } from '@leonkwan46/music-notation'
import type { QuestionInterface } from '@types'
import { type FC } from 'react'
import { generateTripletElements } from '../../visualRenderHelper'
import { QUESTION_TYPE } from '../types'

interface TripletProps {
  questionInterface: QuestionInterface
}

export const Triplet: FC<TripletProps> = ({ questionInterface }) => {
  if (questionInterface.type !== QUESTION_TYPE.TRIPLET || !questionInterface.tupletConfig) return null

  return (
    <DisplayCard extraHeight={false}>
      <Tuplets
        noteType={questionInterface.tupletConfig.noteType as NoteType}
        numberOfNotes={questionInterface.tupletConfig.numberOfNotes}
        elements={generateTripletElements(questionInterface.tupletConfig.noteType as NoteType, questionInterface.tupletConfig.numberOfNotes)}
      />
    </DisplayCard>
  )
}
