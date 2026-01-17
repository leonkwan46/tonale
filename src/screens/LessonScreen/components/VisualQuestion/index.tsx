import { useDevice } from '@/hooks'
import { DisplayCard } from '@/sharedComponents/DisplayCard'
import { NoteType } from '@leonkwan46/music-notation'
import type { StageNumber, VisualComponent } from '@types'
import { VisualQuestionContainer } from './VisualQuestion.styles'
import {
  calculateMusicStaffMinHeight,
  renderMusicStaff,
  renderNoteComponent,
  renderTermAndSign,
  renderTimeSignature,
  renderTriplet
} from './visualRenderHelper'

interface VisualQuestionProps {
  visualComponent: VisualComponent
  stage?: StageNumber
}

export const VisualQuestion = ({ visualComponent, stage }: VisualQuestionProps) => {
  const { isTablet } = useDevice()

  const shouldRenderIndividualNotes = visualComponent.type !== 'timeSignature' && 
    visualComponent.type !== 'noteValue' && 
    visualComponent.type !== 'termAndSign' && 
    visualComponent.type !== 'triplet' && 
    visualComponent.elements?.length === 1 && 
    !visualComponent.clef

  const shouldRenderMusicStaff = visualComponent.type !== 'timeSignature' && 
    visualComponent.type !== 'noteValue' && 
    visualComponent.type !== 'termAndSign' && 
    visualComponent.type !== 'triplet' && 
    !shouldRenderIndividualNotes

  return (
    <VisualQuestionContainer isTablet={isTablet}>
      {visualComponent.type === 'timeSignature' && visualComponent.timeSignatureValue && (
        <DisplayCard>
          {renderTimeSignature(visualComponent.timeSignatureValue)}
        </DisplayCard>
      )}
      
      {visualComponent.type === 'noteValue' && visualComponent.noteType && (
        <DisplayCard>
          {renderNoteComponent(visualComponent.noteType)}
        </DisplayCard>
      )}
      
      {visualComponent.type === 'triplet' && visualComponent.tupletConfig && (
        <DisplayCard>
          {renderTriplet(
            visualComponent.tupletConfig.noteType as NoteType,
            visualComponent.tupletConfig.numberOfNotes
          )}
        </DisplayCard>
      )}
      
      {visualComponent.type === 'termAndSign' && visualComponent.symbolType && 
        renderTermAndSign(
          visualComponent.symbolType,
          visualComponent.renderAsSymbol,
          visualComponent.enableTTS,
          isTablet
        )
      }
      
      {shouldRenderIndividualNotes && visualComponent.elements?.[0]?.type && (
        <DisplayCard>
          {renderNoteComponent({ type: visualComponent.elements[0].type })}
        </DisplayCard>
      )}
      
      {shouldRenderMusicStaff && (
        <DisplayCard minHeight={calculateMusicStaffMinHeight(
          visualComponent.clef,
          visualComponent.elements,
          stage
        )}>
          {renderMusicStaff(
            visualComponent.size,
            visualComponent.clef,
            visualComponent.timeSignature,
            visualComponent.keyName,
            visualComponent.elements,
            visualComponent.isChord,
            visualComponent.showStaff
          )}
        </DisplayCard>
      )}
    </VisualQuestionContainer>
  )
}

