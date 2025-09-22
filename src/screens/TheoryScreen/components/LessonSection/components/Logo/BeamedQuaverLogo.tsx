import { useDevice } from '@/hooks'
import { useTheme } from '@emotion/react'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { Ellipse, Path, Svg } from 'react-native-svg'

interface BeamedQuaverLogoProps {
  size?: number
  color?: string
}

export const BeamedQuaverLogo: React.FC<BeamedQuaverLogoProps> = ({ 
  size = 25, 
  color 
}) => {
  const theme = useTheme()
  const { isTablet } = useDevice()
  const newSize = isTablet ? size * 0.8 : size
  
  return (
  <Svg 
    width={scale(newSize)} 
    height={scale(newSize)} 
    viewBox="0 0 20 20" 
    fill="none"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.75 3.80989C6.75 3.29386 7.14265 2.86257 7.65642 2.81428L16.6564 1.96832C17.2431 1.91318 17.75 2.37468 17.75 2.96393V5.14519C17.75 5.65923 17.3603 6.08955 16.8487 6.1403L7.84873 7.03323C7.26031 7.09161 6.75 6.62943 6.75 6.03812V3.80989Z"
      fill={color || theme.colors.text}
    />
    <Ellipse cx="14.75" cy="15" rx="3" ry="2.5" fill={color || theme.colors.text} />
    <Ellipse cx="5.75" cy="16" rx="3" ry="2.5" fill={color || theme.colors.text} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.75 5H17.75V15H15.75V5Z"
      fill={color || theme.colors.text}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.75 6H8.75V16H6.75V6Z"
      fill={color || theme.colors.text}
    />
  </Svg>
  )
}