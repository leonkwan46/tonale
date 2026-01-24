import React from 'react'
import { SMuFLCardContainer } from './SMuFLCard.styles'

interface SMuFLCardProps {
  children: React.ReactNode
  isTextTerm?: boolean
}

export const SMuFLCard = ({ children, isTextTerm }: SMuFLCardProps) => {
  return (
    <SMuFLCardContainer isTextTerm={isTextTerm}>
        {children}
    </SMuFLCardContainer>
  )
}
