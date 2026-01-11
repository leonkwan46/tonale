import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@emotion/react'
import { useDevice } from '@/hooks'
import { scale } from 'react-native-size-matters'

import { Container, DescriptionText, IconContainer } from './ScreenIntroHeader.styles'

interface ScreenIntroHeaderProps {
  icon: keyof typeof Ionicons.glyphMap
  description: string
}

export function ScreenIntroHeader({ icon, description }: ScreenIntroHeaderProps) {
  const { isTablet } = useDevice()
  const theme = useTheme()

  return (
    <Container isTablet={isTablet}>
      <IconContainer isTablet={isTablet}>
        <Ionicons name={icon} size={isTablet ? scale(48) : scale(64)} color={theme.colors.primary} />
      </IconContainer>
      <DescriptionText isTablet={isTablet}>{description}</DescriptionText>
    </Container>
  )
}
