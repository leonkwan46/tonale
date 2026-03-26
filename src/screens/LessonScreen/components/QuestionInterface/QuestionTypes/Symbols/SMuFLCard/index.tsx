import type { ReactNode } from 'react'
import { SMuFLCardContainer, SMuFLSymbolText } from './SMuFLCard.styles'

interface SMuFLCardProps {
  text: string
  isTextTerm?: boolean
  isWideDynamic?: boolean
  children?: ReactNode
}

export const SMuFLCard = ({ text, isTextTerm, isWideDynamic, children }: SMuFLCardProps) => {
  return (
    <SMuFLCardContainer isTextTerm={isTextTerm}>
      <SMuFLSymbolText isTextTerm={isTextTerm} isWideDynamic={isWideDynamic}>
        {text}
      </SMuFLSymbolText>
      {children}
    </SMuFLCardContainer>
  )
}
