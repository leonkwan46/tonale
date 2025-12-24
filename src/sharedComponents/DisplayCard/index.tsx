import * as React from 'react'
import { useDevice } from '../../hooks'
import { DisplayCardContainer } from './DisplayCard.styles'

interface DisplayCardProps {
  children: React.ReactNode
  minHeight?: number
}

export const DisplayCard: React.FC<DisplayCardProps> = ({ 
  children,
  minHeight = 200
}) => {
  const { isTablet } = useDevice()
  return (
    <DisplayCardContainer isTablet={isTablet} minHeight={minHeight}>
      {children}
    </DisplayCardContainer>
  )
}
