import { DisplayCard } from '@/sharedComponents/DisplayCard'
import { MusicStaff, parseTimeSignature as parseTimeSignatureFromLibrary, type MusicElementData } from '@leonkwan46/music-notation'
import type { QuestionInterface } from '@types'
import { type FC } from 'react'

interface MusicStaffProps {
  questionInterface: QuestionInterface
  shouldRender: boolean
  needsExtraHeight: boolean
}

export const MusicStaffComponent: FC<MusicStaffProps> = ({ questionInterface, shouldRender, needsExtraHeight }) => {
  if (!shouldRender) return null

  return (
    <DisplayCard extraHeight={needsExtraHeight}>
      <MusicStaff
        size={questionInterface.size}
        clef={questionInterface.clef}
        timeSignature={questionInterface.timeSignature ? parseTimeSignatureFromLibrary(questionInterface.timeSignature) : undefined}
        keyName={questionInterface.keyName}
        elements={questionInterface.isChord 
          ? [questionInterface.elements || []] 
          : (questionInterface.elements || []).map((element: MusicElementData) => [element])}
        showStaff={questionInterface.showStaff}
      />
    </DisplayCard>
  )
}
