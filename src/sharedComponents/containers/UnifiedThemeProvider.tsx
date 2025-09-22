import { darkTheme, lightTheme, navigationDarkTheme, navigationLightTheme } from '@/constants/theme'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { ThemeProvider } from '@react-navigation/native'
import React from 'react'
import { useColorScheme } from 'react-native'

interface UnifiedThemeProviderProps {
  children: React.ReactNode
}

export function UnifiedThemeProvider({ children }: UnifiedThemeProviderProps) {
  const colorScheme = useColorScheme()
  
  const isDark = colorScheme === 'dark'
  
  return (
    <ThemeProvider value={isDark ? navigationDarkTheme : navigationLightTheme}>
      <EmotionThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </EmotionThemeProvider>
    </ThemeProvider>
  )
}
