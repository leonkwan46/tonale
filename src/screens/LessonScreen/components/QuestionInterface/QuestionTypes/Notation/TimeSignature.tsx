import { DisplayCard } from '@/sharedComponents/DisplayCard'
import {
    CommonTime,
    CutTime,
    TimeSignature as LibraryTimeSignature,
    parseTimeSignature
} from '@leonkwan46/music-notation'
import type { QuestionInterface } from '@types'
import { type FC } from 'react'
import { QUESTION_TYPE } from '../types'

interface TimeSignatureProps {
  questionInterface: QuestionInterface
}

export const TimeSignatureComponent: FC<TimeSignatureProps> = ({ questionInterface }) => {
  if (questionInterface.type !== QUESTION_TYPE.TIME_SIGNATURE) return null

  const timeSignature = questionInterface.timeSignatureValue || ''
  const parsedTimeSignature = parseTimeSignature(timeSignature)

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
    <DisplayCard extraHeight={false}>
      {renderTimeSignature()}
    </DisplayCard>
  )
}
