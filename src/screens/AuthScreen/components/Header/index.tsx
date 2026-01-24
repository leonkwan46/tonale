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
      <Title>
        Tonalè
      </Title>
      <Subtitle>
        {authState.mode === 'login' 
          ? 'Welcome back to your musical journey'
          : 'Begin your musical journey today'}
      </Subtitle>
    </TitlesContainer>
  </HeaderContainer>
  )
}
