import { useTheme } from '@emotion/react'
import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { scale } from 'react-native-size-matters'
import {
  LogoContainer,
  LogoInner,
  LogoOuter
} from './AppLogo.styles'

interface AppLogoProps {
  isTablet: boolean
}

export const AppLogo: React.FC<AppLogoProps> = ({
  isTablet
}) => {
  const theme = useTheme()
  
  return (
    <LogoContainer>
      <LogoOuter isTablet={isTablet}>
        <LogoInner isTablet={isTablet}>
          <Ionicons 
            name="musical-notes" 
            size={isTablet ? scale(25) : scale(40)} 
            color={theme.colors.text}
            style={{ opacity: 0.9 }}
          />
        </LogoInner>
      </LogoOuter>
    </LogoContainer>
  )
}

