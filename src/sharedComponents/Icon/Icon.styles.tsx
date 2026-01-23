import type { IconSizeVariant, IconColorVariant } from '@/config/theme/theme'
import { sharedConstants } from '@/config/theme/theme'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'

export interface StyledIconProps {
  sizeVariant?: IconSizeVariant
  colorVariant?: IconColorVariant
  color?: string
}

export const StyledIcon = styled(Ionicons)<StyledIconProps>(({ theme, sizeVariant = 'sm', colorVariant, color }) => {
  const iconColor = color || (colorVariant ? theme.colors[colorVariant] : theme.colors.icon)
  const [phoneSize, tabletSize] = sharedConstants.components.iconSizes[sizeVariant]
  const calculatedSize = theme.device.isTablet ? scale(tabletSize) : scale(phoneSize)

  return {
    color: iconColor,
    fontSize: calculatedSize,
    lineHeight: calculatedSize
  }
})
