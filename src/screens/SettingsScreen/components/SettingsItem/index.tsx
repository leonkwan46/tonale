import { Ionicons } from '@expo/vector-icons'
import { ReactNode } from 'react'

import { Icon } from '@/compLib/Icon'
import type { IconColorVariant } from '@/config/theme/theme'

import {
  IconContainer,
  Separator,
  SettingsItemContainer,
  SettingsItemLabel,
  VerifyIconContainer
} from './SettingsItem.styles'

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  onPress?: () => void
  showSeparator?: boolean
  type?: 'filled' | 'outlined'
  variant?: 'default' | 'red'
  showVerifyIcon?: boolean
  isVerified?: boolean
  rightElement?: ReactNode
}

const variantToColor: Record<string, IconColorVariant> = {
  default: 'icon',
  red: 'error'
}

export const SettingsItem = ({
  icon,
  label,
  onPress,
  showSeparator = false,
  type = 'filled',
  variant = 'default',
  showVerifyIcon = false,
  isVerified = false,
  rightElement
}: SettingsItemProps) => {
  const iconColor = variantToColor[variant] ?? 'icon'

  return (
    <>
      <SettingsItemContainer onPress={onPress}>
        <IconContainer type={type}>
          <Icon name={icon} sizeVariant="lg" colorVariant={iconColor} />
        </IconContainer>
        <SettingsItemLabel variant={variant}>{label}</SettingsItemLabel>
        {showVerifyIcon && (
          <VerifyIconContainer>
            <Icon
              name={isVerified ? 'checkmark-circle' : 'checkmark-circle-outline'}
              sizeVariant="sm"
              colorVariant={isVerified ? 'primary' : 'icon'}
            />
          </VerifyIconContainer>
        )}
        {rightElement ?? (variant === 'default' && <Icon name="chevron-forward" sizeVariant="lg" colorVariant={iconColor} />)}
      </SettingsItemContainer>
      {showSeparator && <Separator />}
    </>
  )
}
