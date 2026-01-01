import * as React from 'react'
import { HeaderContainer, Subtitle, Title } from './OnboardingHeader.styles'

interface OnboardingHeaderProps {
  isTablet: boolean
}

const OnboardingHeaderComponent: React.FC<OnboardingHeaderProps> = ({ isTablet }) => {
  return (
    <HeaderContainer isTablet={isTablet}>
      <Title isTablet={isTablet}>Welcome to Tonalè!</Title>
      <Subtitle isTablet={isTablet}>Tell us a bit about yourself to get started</Subtitle>
    </HeaderContainer>
  )
}

export const OnboardingHeader = React.memo(OnboardingHeaderComponent)

