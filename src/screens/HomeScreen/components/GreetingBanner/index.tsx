import type { UserData } from '@types'
import type { User } from 'firebase/auth'
import * as React from 'react'
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

export const GreetingBanner: React.FC<GreetingBannerProps> = ({ authUser, userData, loading }) => {
  const username = getUsername(authUser, userData, loading)
  const characterImageSource = userData?.gender === 'female'
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

