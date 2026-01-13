import React from 'react'
import { SMuFLCardContainer } from './SMuFLCard.styles'

interface SMuFLCardProps {
  children: React.ReactNode
  isTablet: boolean
  isTextTerm?: boolean
}

export const SMuFLCard = ({ children, isTablet, isTextTerm }: SMuFLCardProps) => {
  return (
    <SMuFLCardContainer isTablet={isTablet} isTextTerm={isTextTerm}>
        {children}
    </SMuFLCardContainer>
  )
}
