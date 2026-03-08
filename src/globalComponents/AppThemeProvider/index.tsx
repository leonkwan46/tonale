import { darkTheme, lightTheme, navigationDarkTheme, navigationLightTheme } from '@/config/theme/theme'
import { DEVICE } from '@/constants/device'
import { useWindowDimensions } from '@/hooks'
import { useThemeMode } from '@/hooks/useThemeModeContext'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { ThemeProvider } from '@react-navigation/native'
import { type ReactNode, useMemo } from 'react'

interface AppThemeProviderProps {
  children: ReactNode
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const { isDark } = useThemeMode()
  const { width, height } = useWindowDimensions()

  const deviceInfo = useMemo(() => {
    const isTablet = width >= 768

    return {
      isTablet,
      isPhone: !isTablet,
      width,
      height,
      deviceType: isTablet ? DEVICE.TABLET : DEVICE.PHONE
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
