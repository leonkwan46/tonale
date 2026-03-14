import { ReactNode } from 'react'

import { Container } from './SettingSection.styles'

interface SettingSectionProps {
  variant?: 'list' | 'form'
  children: ReactNode
}

export const SettingSection = ({ variant = 'form', children }: SettingSectionProps) => {
  return <Container variant={variant}>{children}</Container>
}
