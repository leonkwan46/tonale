import { Ionicons } from '@expo/vector-icons'
import { Icon } from '@/sharedComponents/Icon'

import { Container, DescriptionText } from './ScreenIntroHeader.styles'

interface ScreenIntroHeaderProps {
  icon: keyof typeof Ionicons.glyphMap
  description: string
}

export const ScreenIntroHeader = ({ icon, description }: ScreenIntroHeaderProps) => {
  return (
    <Container>
      <Icon name={icon} sizeVariant="3xl" colorVariant="text" />
      <DescriptionText>{description}</DescriptionText>
    </Container>
  )
}
