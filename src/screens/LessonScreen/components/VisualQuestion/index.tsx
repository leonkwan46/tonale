import { VisualComponent } from '@/data/theoryData/types'
import { useDevice } from '@/hooks'
import {
  CLEFS,
  MusicStaff,
  parseTimeSignature as parseTimeSignatureFromLibrary
} from '@leonkwan46/music-notation'
import React from 'react'
import { VisualQuestionContainer } from './VisualQuestion.styles'

interface VisualQuestionProps {
  visualComponent: VisualComponent
}

export const VisualQuestion: React.FC<VisualQuestionProps> = ({ visualComponent }) => {
  const { isTablet } = useDevice()
  if (!visualComponent) {
    return null
  }

  return (
    <VisualQuestionContainer isTablet={isTablet}>
      <MusicStaff
        size='sml'
        clef={visualComponent.clef || CLEFS.TREBLE}
        timeSignature={visualComponent.timeSignature ? parseTimeSignatureFromLibrary(visualComponent.timeSignature) : undefined}
        keyName={visualComponent.keyName}
        elements={(visualComponent.elements || []).map(element => [element])}
      />
    </VisualQuestionContainer>
  )
}
