import { Ionicons } from '@expo/vector-icons'
import { useDevice } from '@/hooks'
import { scale } from 'react-native-size-matters'

import { Container, DescriptionText, HeaderIcon, IconContainer } from './ScreenIntroHeader.styles'

interface ScreenIntroHeaderProps {
  icon: keyof typeof Ionicons.glyphMap
  description: string
}

export const ScreenIntroHeader = ({ icon, description }: ScreenIntroHeaderProps) => {
  const { isTablet } = useDevice()

  return (
    <Container isTablet={isTablet}>
      <IconContainer isTablet={isTablet}>
        <HeaderIcon name={icon} size={isTablet ? scale(48) : scale(64)} />
      </IconContainer>
      <DescriptionText isTablet={isTablet}>{description}</DescriptionText>
    </Container>
  )
}
