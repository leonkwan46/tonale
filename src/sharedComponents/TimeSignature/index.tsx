import { formatAsNotation } from '@/theory/exercises/utils/timeSignature'
import {
  CommonTime,
  CutTime,
  TimeSignature as LibraryTimeSignature,
  parseTimeSignature,
  TimeSignatureType
} from '@leonkwan46/music-notation'
import * as React from 'react'

interface TimeSignatureProps {
  timeSignature: TimeSignatureType | string
}

export const TimeSignature: React.FC<TimeSignatureProps> = ({ 
  timeSignature
}) => {
  const timeSignatureString = typeof timeSignature === 'string' ? timeSignature : formatAsNotation(timeSignature)
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
