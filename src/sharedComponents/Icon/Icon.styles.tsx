import type { IconSizeVariant } from '@/config/theme/theme'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'

type IconColorVariant = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'text' | 'icon'

export interface StyledIconProps {
  sizeVariant?: IconSizeVariant
  colorVariant?: IconColorVariant
  color?: string
}

export const StyledIcon = styled(Ionicons)<StyledIconProps>(({ theme, colorVariant, color }) => {
  const iconColor = color || (colorVariant ? theme.colors[colorVariant] : theme.colors.icon)
  
  return {
    color: iconColor
  }
})
