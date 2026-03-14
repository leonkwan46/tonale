import type { StageNumber, VisualComponent } from '@types'
import { Notation } from '../QuestionInterface/QuestionTypes/Notation'
import { Symbols } from '../QuestionInterface/QuestionTypes/Symbols'

interface VisualQuestionProps {
  visualComponent: VisualComponent
  stage?: StageNumber
}

export function VisualQuestion({ visualComponent, stage }: VisualQuestionProps) {
  if (visualComponent.type === 'termAndSign' && visualComponent.symbolType) {
    return <Symbols visualComponent={visualComponent} />
  }
  return <Notation visualComponent={visualComponent} stage={stage} />
}
