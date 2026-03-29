import * as React from 'react'
import { HeaderContainer, Subtitle, Title } from './OnboardingHeader.styles'

const OnboardingHeaderComponent = () => {
  return (
    <HeaderContainer>
      <Title size="xl" weight="bold" align="center">
        Welcome to Tonalè!
      </Title>
      <Subtitle size="md" align="center" muted>
        Let&apos;s set things up for you!
      </Subtitle>
    </HeaderContainer>
  )
}

export const OnboardingHeader = React.memo(OnboardingHeaderComponent)

