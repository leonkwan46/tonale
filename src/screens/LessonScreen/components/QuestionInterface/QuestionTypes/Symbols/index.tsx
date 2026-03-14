import type { VisualComponent } from '@types'
import { renderTermAndSign } from '../../../../utils/visualRender'
import { VisualQuestionContainer } from '../../../VisualQuestion/VisualQuestion.styles'

interface SymbolsProps {
  visualComponent: VisualComponent
}

export const Symbols = ({ visualComponent }: SymbolsProps) => {
  if (visualComponent.type !== 'termAndSign' || !visualComponent.symbolType) {
    return null
  }

  return (
    <VisualQuestionContainer>
      {renderTermAndSign(
        visualComponent.symbolType,
        visualComponent.renderAsSymbol,
        visualComponent.enableTTS
      )}
    </VisualQuestionContainer>
  )
}
