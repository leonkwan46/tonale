import { AppTheme } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

import {
  AccountInfoContainer,
  AccountDetails,
  AccountName,
  AccountEmail
} from '../SettingsScreen.styles'

interface AccountInfoType {
  displayName: string | null
  email: string | null
}

interface AccountInfoProps {
  accountInfo: AccountInfoType
  colorScheme: 'light' | 'dark'
}

export function AccountInfo({ accountInfo, colorScheme }: AccountInfoProps) {
  return (
    <AccountInfoContainer>
      <Ionicons 
        name="person-circle-outline" 
        size={40} 
        color={AppTheme.gold} 
      />
      <AccountDetails>
        <AccountName colorScheme={colorScheme}>
          {accountInfo.displayName || 'Anonymous User'}
        </AccountName>
        <AccountEmail colorScheme={colorScheme}>
          {accountInfo.email || 'No email associated'}
        </AccountEmail>
      </AccountDetails>
    </AccountInfoContainer>
  )
}

