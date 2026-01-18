import { Ionicons } from '@expo/vector-icons'
import { Icon } from '@/sharedComponents/Icon/Icon'

import { Container, DescriptionText, IconContainer } from './ScreenIntroHeader.styles'

interface ScreenIntroHeaderProps {
  icon: keyof typeof Ionicons.glyphMap
  description: string
}

export const ScreenIntroHeader = ({ icon, description }: ScreenIntroHeaderProps) => {
  return (
    <Container>
      <IconContainer>
        <Icon name={icon} sizeVariant="2xl" colorVariant="text" />
      </IconContainer>
      <DescriptionText>{description}</DescriptionText>
    </Container>
  )
}
