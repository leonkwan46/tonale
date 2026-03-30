import { DisplayCardContainer } from './DisplayCard.styles'

interface DisplayCardProps {
  children: React.ReactNode
  minHeight?: number
}

export const DisplayCard = ({ 
  children,
  minHeight = 200
}: DisplayCardProps) => {
  return (
    <DisplayCardContainer minHeight={minHeight}>
      {children}
    </DisplayCardContainer>
  )
}
