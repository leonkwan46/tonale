import { GridSelection } from '@/compLib/GridSelection'
import { getGenderDisplayLabel } from '@/utils/avatarAssets'
import { GENDER, type UserGender } from '@types'
import * as React from 'react'
import { renderGenderIcon } from '../OnboardingIcons'
import { SectionContainer, SectionSubtitle, SectionTitle, TitleGroup } from './GenderSelection.styles'

const GENDER_OPTIONS: UserGender[] = [
  GENDER.MALE,
  GENDER.FEMALE,
  GENDER.NEUTRAL
]

interface GenderSelectionProps {
  selectedGender: UserGender | null;
  onSelect: (gender: UserGender) => void;
}

const GenderSelectionComponent = ({
  selectedGender,
  onSelect
}: GenderSelectionProps) => {
  return (
    <SectionContainer>
      <TitleGroup>
        <SectionTitle size="md" weight="semibold">
          Gender
        </SectionTitle>
        <SectionSubtitle size="sm">
          Pick how your avatar looks
        </SectionSubtitle>
      </TitleGroup>
      <GridSelection
        options={GENDER_OPTIONS}
        selectedOption={selectedGender}
        onSelect={onSelect}
        getDisplayLabel={(value) => getGenderDisplayLabel(value as UserGender)}
        renderIcon={(option, isSelected) =>
          renderGenderIcon(option as UserGender)
        }
        testID="gender-selection"
      />
    </SectionContainer>
  )
}

export const GenderSelection = React.memo(GenderSelectionComponent)
