import { GENDER, type UserGender } from '@types'
import { getAvatarHeadSource } from '@/utils/avatarAssets'

import { AvatarContainer, AvatarImage, ProfileName, ProfileSection } from './ProfileHeader.styles'

interface UserDataHeaderProps {
  name: string | null
  gender?: UserGender
}

export const ProfileHeader = ({ name, gender }: UserDataHeaderProps) => {
  const characterImageSource = getAvatarHeadSource(gender || GENDER.MALE)

  return (
    <ProfileSection>
      <AvatarContainer>
        <AvatarImage source={characterImageSource} />
      </AvatarContainer>
      {name && (
        <ProfileName size="xl" weight="bold" align="center">
          {name}
        </ProfileName>
      )}
    </ProfileSection>
  )
}
