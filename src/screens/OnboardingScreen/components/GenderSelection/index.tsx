import * as React from 'react'
import { GridSelection } from '@/sharedComponents/GridSelection'
import { useTheme } from '@emotion/react'
import type { UserGender } from '@types'
import { renderGenderIcon } from '../OnboardingIcons'
import { SectionContainer, SectionTitle } from './GenderSelection.styles'

const GENDER_OPTIONS: UserGender[] = ['male', 'female']

const getDisplayLabel = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

interface GenderSelectionProps {
  selectedGender: UserGender | null
  onSelect: (gender: UserGender) => void
  isTablet: boolean
}

const GenderSelectionComponent = ({
  selectedGender,
  onSelect,
  isTablet
}: GenderSelectionProps) => {
  const theme = useTheme()

  return (
    <SectionContainer isTablet={isTablet}>
      <SectionTitle isTablet={isTablet}>Gender</SectionTitle>
      <GridSelection
        options={GENDER_OPTIONS}
        selectedOption={selectedGender}
        onSelect={onSelect}
        getDisplayLabel={getDisplayLabel}
        renderIcon={(option, isSelected) => renderGenderIcon(option as UserGender, theme)}
        testID="gender-selection"
      />
    </SectionContainer>
  )
}

export const GenderSelection = React.memo(GenderSelectionComponent)

