import { useDevice } from '../../hooks'
import { DisplayCardContainer } from './DisplayCard.styles'

interface DisplayCardProps {
  children: React.ReactNode
  minHeight?: number
}

export const DisplayCard = ({ 
  children,
  minHeight = 200
}: DisplayCardProps) => {
  const { isTablet } = useDevice()
  return (
    <DisplayCardContainer isTablet={isTablet} minHeight={minHeight}>
      {children}
    </DisplayCardContainer>
  )
}
