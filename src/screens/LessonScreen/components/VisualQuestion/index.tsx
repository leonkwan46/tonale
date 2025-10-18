import { VisualComponent } from '@/data/theoryData/types'
import { useDevice } from '@/hooks'
import { DisplayCard } from '@/sharedComponents/DisplayCard'
import { renderNoteWithSMuFL, renderRestWithSMuFL, renderTermAndSign } from '@/sharedComponents/SMuFL'
import { TimeSignature } from '@/sharedComponents/TimeSignature'
import { useTheme } from '@emotion/react'
import {
  MusicStaff,
  parseTimeSignature as parseTimeSignatureFromLibrary,
  type MusicElementData
} from '@leonkwan46/music-notation'
import * as React from 'react'
import { SMuFLCard } from '../../../../sharedComponents/SMuFLCard'
import { VisualQuestionContainer } from './VisualQuestion.styles'

interface VisualQuestionProps {
  visualComponent: VisualComponent
}

export const VisualQuestion: React.FC<VisualQuestionProps> = ({ visualComponent }: VisualQuestionProps) => {
  const { isTablet } = useDevice()
  const theme = useTheme()

  // Check if this visual needs extra height (complex music staff with pitch elements)
  const needsExtraHeight = visualComponent.clef && 
    visualComponent.elements && 
    visualComponent.elements.length > 0 &&
    visualComponent.elements.some(element => element.pitch) &&
    visualComponent.type !== 'termAndSign'

  // Check if this should render music staff (default case)
  const shouldRenderMusicStaff = visualComponent.type !== 'timeSignature' && 
    visualComponent.type !== 'noteValue' && 
    visualComponent.type !== 'termAndSign' && 
    !(visualComponent.elements?.length === 1 && !visualComponent.clef)


  return (
    <VisualQuestionContainer isTablet={isTablet} isSMuFLSymbol={visualComponent.type === 'termAndSign'} needsExtraSpacing={needsExtraHeight || false}>
      {visualComponent.type === 'timeSignature' && (
        <DisplayCard extraHeight={false}>
          <TimeSignature timeSignature={visualComponent.timeSignatureValue || ''} />
        </DisplayCard>
      )}
      
      {visualComponent.type === 'noteValue' && (() => {
        const noteType = visualComponent.noteType || ''
        const typeString = typeof noteType === 'string' ? noteType : noteType.type
        const isRest = typeString.includes('-rest')
        
        return (
          <DisplayCard extraHeight={false}>
            {isRest ? renderRestWithSMuFL(noteType) : renderNoteWithSMuFL(noteType)}
          </DisplayCard>
        )
      })()}
      
      {visualComponent.type === 'termAndSign' && visualComponent.symbolType && (
        <SMuFLCard isTablet={isTablet} isTextTerm={false}>
          {renderTermAndSign(visualComponent.symbolType, isTablet, theme)}
        </SMuFLCard>
      )}

      
      {shouldRenderMusicStaff && (
        <DisplayCard extraHeight={needsExtraHeight}>
          <MusicStaff
            size={'xs'}
            clef={visualComponent.clef}
            timeSignature={visualComponent.timeSignature ? parseTimeSignatureFromLibrary(visualComponent.timeSignature) : undefined}
            keyName={visualComponent.keyName}
            elements={(visualComponent.elements || []).map((element: MusicElementData) => [element])}
          />
        </DisplayCard>
      )}
    </VisualQuestionContainer>
  )
}

