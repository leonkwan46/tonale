import { VisualComponent } from '@/data/theoryData/types'
import {
    CLEFS,
    createTimeSignature,
    KEY_NAMES,
    MusicStaff
} from '@leonkwan46/music-notation'
import React from 'react'
import { VisualQuestionContainer } from './VisualQuestion.styles'

interface VisualQuestionProps {
  visualComponent: VisualComponent
}

export const VisualQuestion: React.FC<VisualQuestionProps> = ({ visualComponent }) => {
  if (!visualComponent) {
    return null
  }

  return (
    <VisualQuestionContainer>
      <MusicStaff
        size='sml'
        clef={visualComponent.clef || CLEFS.TREBLE}
        timeSignature={visualComponent.timeSignature ? createTimeSignature(
          parseInt(visualComponent.timeSignature.split('/')[0]),
          parseInt(visualComponent.timeSignature.split('/')[1])
        ) : undefined}
        keyName={visualComponent.keyName ? KEY_NAMES[`${visualComponent.keyName.replace('#', '_SHARP').replace('b', '_FLAT')}_MAJOR` as keyof typeof KEY_NAMES] : undefined}
        elements={[]}
      />
    </VisualQuestionContainer>
  )
}
