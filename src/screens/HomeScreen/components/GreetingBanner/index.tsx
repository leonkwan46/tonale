import type { UserProfile } from '@types'
import type { User } from 'firebase/auth'
import * as React from 'react'
import {
  AvatarContainer,
  CharacterAvatar,
  GreetingBannerContainer,
  GreetingText
} from './GreetingBanner.styles'

interface GreetingBannerProps {
  user: User | null
  profile: UserProfile | null
  loading: boolean
}

const getUsername = (user: User | null, profile: UserProfile | null, loading: boolean): string => {
  if (loading) return '...'
  if (!user) return 'Guest'
  
  return profile?.name ||
         user.displayName || 
         user.email?.split('@')[0] || 
         profile?.email?.split('@')[0] || 
         'Guest'
}

export const GreetingBanner: React.FC<GreetingBannerProps> = ({ user, profile, loading }) => {
  const username = getUsername(user, profile, loading)
  const characterImageSource = profile?.gender === 'female'
    ? require('../../../../../assets/images/girl/girl_head.png')
    : require('../../../../../assets/images/boy/boy_head.png')

  return (
    <GreetingBannerContainer>
      <GreetingText>Hello, {username} 👋</GreetingText>
      <AvatarContainer>
        <CharacterAvatar source={characterImageSource} />
      </AvatarContainer>
    </GreetingBannerContainer>
  )
}

