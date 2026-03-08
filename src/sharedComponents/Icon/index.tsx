import type { IconColorVariant, IconSizeVariant } from '@/config/theme/theme'
import { Ionicons } from '@expo/vector-icons'
import { StyledIcon } from './Icon.styles'

/** Curated list of icon names used in the app. Add new icons here when needed; consumers pick from this. */
export const ICON_NAMES = [
  'alert-circle',
  'arrow-forward',
  'cafe-outline',
  'chatbubble-outline',
  'checkmark-circle',
  'checkmark-circle-outline',
  'chevron-forward',
  'cloud-offline',
  'eye-off-outline',
  'eye-outline',
  'lock-closed-outline',
  'log-out-outline',
  'mail-outline',
  'musical-notes',
  'musical-notes-outline',
  'people-outline',
  'person-add',
  'person-outline',
  'sync',
  'trash-outline',
  'volume-high'
] as const

export type IconName = keyof typeof Ionicons.glyphMap

/** Semantic shortcuts for icons used in the app. Add keys when using Icon with a new icon. */
export const ICONS: Record<string, (typeof ICON_NAMES)[number]> = {
  offline: 'cloud-offline',
  success: 'checkmark-circle',
  sync: 'sync'
}

interface IconProps {
  name: IconName
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
