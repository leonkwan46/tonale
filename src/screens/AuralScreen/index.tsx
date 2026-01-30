import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { Content, Description, Subtitle, Title } from './AuralScreen.styles'

export const AuralScreen = () => {
  return (
    <ScreenContainer>
      <Content>
        <Title>Aural Training</Title>
        <Subtitle>Develop your musical ear</Subtitle>
        <Description>
          Practise interval recognition, chord identification, and melodic dictation.
          Train your ear to recognise musical patterns and structures.
        </Description>
      </Content>
    </ScreenContainer>
  )
}

