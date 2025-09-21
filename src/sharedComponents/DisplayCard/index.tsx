import React from 'react'
import { useDevice } from '../../hooks'
import { DisplayCardContainer } from './DisplayCard.styles'

interface DisplayCardProps {
  children: React.ReactNode
  extraHeight?: boolean
}

export const DisplayCard: React.FC<DisplayCardProps> = ({ 
  children,
  extraHeight = false
}) => {
  const { isTablet } = useDevice()
  return (
    <DisplayCardContainer isTablet={isTablet} extraHeight={extraHeight}>
      {children}
    </DisplayCardContainer>
  )
}
