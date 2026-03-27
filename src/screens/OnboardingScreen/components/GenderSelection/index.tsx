import * as React from 'react'
import { GridSelection } from '@/compLib/GridSelection'
import { useTheme } from '@emotion/react'
import { GENDER, type UserGender } from '@types'
import { getGenderDisplayLabel } from '@/utils/avatarAssets'
import { renderGenderIcon } from '../OnboardingIcons'
import { SectionContainer, SectionTitle } from './GenderSelection.styles'

const GENDER_OPTIONS: UserGender[] = [GENDER.MALE, GENDER.FEMALE, GENDER.NEUTRAL]

interface GenderSelectionProps {
  selectedGender: UserGender | null
  onSelect: (gender: UserGender) => void
}

const GenderSelectionComponent = ({
  selectedGender,
  onSelect
}: GenderSelectionProps) => {
  const theme = useTheme()

  return (
    <SectionContainer>
      <SectionTitle>Gender</SectionTitle>
      <GridSelection
        options={GENDER_OPTIONS}
        selectedOption={selectedGender}
        onSelect={onSelect}
        getDisplayLabel={(value) => getGenderDisplayLabel(value as UserGender)}
        renderIcon={(option, isSelected) => renderGenderIcon(option as UserGender, theme)}
        testID="gender-selection"
      />
    </SectionContainer>
  )
}

export const GenderSelection = React.memo(GenderSelectionComponent)

