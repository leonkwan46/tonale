import { AppLogo } from '../AppLogo'
import {
  HeaderContainer,
  Subtitle,
  Title,
  TitlesContainer
} from './Header.styles'

interface HeaderProps {
  authState: { mode: string }
  isTablet: boolean
}

export const Header = ({
  authState,
  isTablet
}: HeaderProps) => {
  return (
  <HeaderContainer isTablet={isTablet}>
    <AppLogo isTablet={isTablet} />
    <TitlesContainer>
      <Title isTablet={isTablet}>
        Tonalè
      </Title>
      <Subtitle isTablet={isTablet}>
        {authState.mode === 'login' 
          ? 'Welcome back to your musical journey'
          : 'Begin your musical journey today'}
      </Subtitle>
    </TitlesContainer>
  </HeaderContainer>
  )
}
