import { darkTheme, lightTheme, navigationDarkTheme, navigationLightTheme } from '@/config/theme/theme'
import { useWindowDimensions } from '@/hooks'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { ThemeProvider } from '@react-navigation/native'
import * as React from 'react'
import { useMemo } from 'react'
import { useColorScheme } from 'react-native'

interface UnifiedThemeProviderProps {
  children: React.ReactNode
}

export const UnifiedThemeProvider = ({ children }: UnifiedThemeProviderProps) => {
  const colorScheme = useColorScheme()
  const { width, height } = useWindowDimensions()
  
  const isDark = colorScheme === 'dark'
  
  const deviceInfo = useMemo(() => {
    const isTablet = width >= 768
    
    return {
      isTablet,
      isPhone: !isTablet,
      width,
      height,
      deviceType: isTablet ? 'tablet' as const : 'phone' as const
    }
  }, [width, height])
  
  const extendedTheme = useMemo(() => ({
    ...(isDark ? darkTheme : lightTheme),
    device: deviceInfo
  }), [isDark, deviceInfo])
  
  return (
    <ThemeProvider value={isDark ? navigationDarkTheme : navigationLightTheme}>
      <EmotionThemeProvider theme={extendedTheme}>
        {children}
      </EmotionThemeProvider>
    </ThemeProvider>
  )
}
