import { useTheme } from '@emotion/react'
import { Ionicons } from '@expo/vector-icons'
import type { IconSizeVariant } from '@/config/theme/theme'
import { sharedConstants } from '@/config/theme/theme'
import { scale } from 'react-native-size-matters'
import { PersonIconStyled } from './GuestLogin.styles'

interface PersonIconProps {
  name: keyof typeof Ionicons.glyphMap
  sizeVariant?: IconSizeVariant
}

export const PersonIcon = ({ name, sizeVariant = 'sm', ...props }: PersonIconProps) => {
  const theme = useTheme()
  const [phoneSize, tabletSize] = sharedConstants.components.iconSizes[sizeVariant]
  const size = theme.device.isTablet ? scale(tabletSize) : scale(phoneSize)
  
  return <PersonIconStyled name={name} size={size} {...props} />
}
