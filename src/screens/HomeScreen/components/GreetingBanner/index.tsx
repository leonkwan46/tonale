import { GENDER, type UserData } from '@types'
import type { User } from 'firebase/auth'
import { getAvatarHeadSource } from '@/utils/avatarAssets'
import {
  AvatarContainer,
  CharacterAvatar,
  GreetingBannerContainer,
  GreetingText
} from './GreetingBanner.styles'

interface GreetingBannerProps {
  authUser: User | null
  userData: UserData | null
  loading: boolean
}

const getUsername = (authUser: User | null, userData: UserData | null, loading: boolean): string => {
  if (loading) return '...'
  if (!authUser) return 'Guest'
  
  return userData?.name ||
         authUser.displayName || 
         authUser.email?.split('@')[0] || 
         userData?.email?.split('@')[0] || 
         'Guest'
}

export const GreetingBanner = ({ authUser, userData, loading }: GreetingBannerProps) => {
  const username = getUsername(authUser, userData, loading)
  const characterImageSource = getAvatarHeadSource(userData?.gender || GENDER.MALE)

  return (
    <GreetingBannerContainer>
      <GreetingText size="xl" weight="bold">
        Hello, {username}! 👋
      </GreetingText>
      <AvatarContainer>
        <CharacterAvatar source={characterImageSource} />
      </AvatarContainer>
    </GreetingBannerContainer>
  )
}

