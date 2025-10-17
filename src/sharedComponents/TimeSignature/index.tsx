import {
  CommonTime,
  CutTime,
  TimeSignature as LibraryTimeSignature,
  parseTimeSignature
} from '@leonkwan46/music-notation'
import * as React from 'react'

interface TimeSignatureProps {
  timeSignature: string
}

export const TimeSignature: React.FC<TimeSignatureProps> = ({ 
  timeSignature
}) => {
  const parsedTimeSignature = parseTimeSignature(timeSignature)
  
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
