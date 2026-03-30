import { AppLogo } from '../AppLogo'
import {
  HeaderContainer,
  Subtitle,
  Title,
  TitlesContainer
} from './Header.styles'

interface HeaderProps {
  authState: { mode: string }
}

export const Header = ({
  authState
}: HeaderProps) => {
  return (
  <HeaderContainer>
    <AppLogo />
    <TitlesContainer>
      <Title size="xl" weight="bold" align="center">
        Tonalè
      </Title>
      <Subtitle size="md" muted align="center">
        {authState.mode === 'login'
          ? 'Welcome back! Let\'s continue learning'
          : 'Start your musical journey today'}
      </Subtitle>
    </TitlesContainer>
  </HeaderContainer>
  )
}
