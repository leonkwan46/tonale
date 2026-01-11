import type { UserGender } from '@types'

import { AvatarContainer, AvatarImage, ProfileName, ProfileSection } from './ProfileHeader.styles'

interface UserDataHeaderProps {
  name: string | null
  gender?: UserGender
}

export const ProfileHeader = ({ name, gender }: UserDataHeaderProps) => {
  const characterImageSource = gender === 'female'
    ? require('../../../../../assets/images/girl/girl_head.png')
    : require('../../../../../assets/images/boy/boy_head.png')

  return (
    <ProfileSection>
      <AvatarContainer>
        <AvatarImage source={characterImageSource} />
      </AvatarContainer>
      {name && <ProfileName>{name}</ProfileName>}
    </ProfileSection>
  )
}
