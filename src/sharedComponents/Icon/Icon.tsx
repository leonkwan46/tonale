import type { IconSizeVariant } from '@/config/theme/theme'
import { Ionicons } from '@expo/vector-icons'
import { StyledIcon } from './Icon.styles'

type IconColorVariant = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'text' | 'icon'

interface IconProps {
  name: keyof typeof Ionicons.glyphMap
  sizeVariant?: IconSizeVariant
  colorVariant?: IconColorVariant
  color?: string
}

export const Icon = ({ name, sizeVariant = 'sm', colorVariant, color, ...props }: IconProps) => {
  return (
    <StyledIcon
      name={name}
      sizeVariant={sizeVariant}
      colorVariant={colorVariant}
      color={color}
      {...props}
    />
  )
}
