import { AppTheme } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

import {
  SettingItemContainer,
  SettingItemIcon,
  SettingItemContent,
  SettingItemLabel
} from '../SettingsScreen.styles'

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  type: 'button'
  destructive?: boolean
  colorScheme: 'light' | 'dark'
  onPress: () => void
}

export function SettingItem({ 
  icon, 
  label, 
  destructive = false, 
  colorScheme,
  onPress 
}: SettingItemProps) {
  const iconColor = destructive ? AppTheme.error : AppTheme.textColor(colorScheme)

  return (
    <SettingItemContainer
      colorScheme={colorScheme}
      destructive={destructive}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <SettingItemIcon>
        <Ionicons name={icon} size={24} color={iconColor} />
      </SettingItemIcon>
      <SettingItemContent>
        <SettingItemLabel colorScheme={colorScheme} destructive={destructive}>
          {label}
        </SettingItemLabel>
      </SettingItemContent>
    </SettingItemContainer>
  )
}

