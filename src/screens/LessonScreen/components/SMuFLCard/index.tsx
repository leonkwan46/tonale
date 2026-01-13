import React from 'react'
import { SMuFLCardContainer } from './SMuFLCard.styles'

interface SMuFLCardProps {
  children: React.ReactNode
  isTablet: boolean
  isTextTerm?: boolean
}

export const SMuFLCard: React.FC<SMuFLCardProps> = ({ children, isTablet, isTextTerm }) => {
  return (
    <SMuFLCardContainer isTablet={isTablet} isTextTerm={isTextTerm}>
        {children}
    </SMuFLCardContainer>
  )
}
