import { Ionicons } from '@expo/vector-icons'
import { ReactNode } from 'react'
import { scale } from 'react-native-size-matters'

import {
  IconContainer,
  Separator,
  SettingsItemContainer,
  SettingsItemLabel,
  StyledIcon,
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
  return (
    <>
      <SettingsItemContainer onPress={onPress} activeOpacity={0.7}>
        <IconContainer type={type}>
          <StyledIcon name={icon} size={scale(20)} variant={variant} />
        </IconContainer>
        <SettingsItemLabel variant={variant}>{label}</SettingsItemLabel>
        {showVerifyIcon && (
          <VerifyIconContainer>
            <StyledIcon
              name={isVerified ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={scale(16)}
              variant={isVerified ? 'verified' : 'default'}
            />
          </VerifyIconContainer>
        )}
        {rightElement ?? (variant === 'default' && <StyledIcon name="chevron-forward" size={scale(20)} variant={variant} />)}
      </SettingsItemContainer>
      {showSeparator && <Separator />}
    </>
  )
}
