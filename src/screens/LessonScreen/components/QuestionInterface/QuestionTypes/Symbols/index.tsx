import type { VisualComponent } from '@types'
import { renderTermAndSign } from '../../../../utils/visualRender'
import { QuestionContainer } from '../../QuestionContainer.styles'

interface SymbolsProps {
  visualComponent: VisualComponent
}

export const Symbols = ({ visualComponent }: SymbolsProps) => {
  if (visualComponent.type !== 'termAndSign' || !visualComponent.symbolType) {
    return null
  }

  return (
    <QuestionContainer>
      {renderTermAndSign(
        visualComponent.symbolType,
        visualComponent.renderAsSymbol,
        visualComponent.enableTTS
      )}
    </QuestionContainer>
  )
}
