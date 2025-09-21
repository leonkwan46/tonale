import { TimeSignature as LibraryTimeSignature, parseTimeSignature } from '@leonkwan46/music-notation'
import React from 'react'

interface TimeSignatureProps {
  timeSignature: string
}

export const TimeSignature: React.FC<TimeSignatureProps> = ({ 
  timeSignature
}) => {
  const parsedTimeSignature = parseTimeSignature(timeSignature)
  
  // Handle string time signatures (common, cut)
  if (typeof parsedTimeSignature === 'string') {
    return parsedTimeSignature === 'common' ? (
      <LibraryTimeSignature topNumber={4} bottomNumber={4} centered={true} />
    ) : (
      <LibraryTimeSignature topNumber={2} bottomNumber={2} centered={true} />
    )
  }
  
  // Handle numeric time signatures
  return (
    <LibraryTimeSignature 
      topNumber={parsedTimeSignature.topNumber}
      bottomNumber={parsedTimeSignature.bottomNumber}
      centered={true}
    />
  )
}
