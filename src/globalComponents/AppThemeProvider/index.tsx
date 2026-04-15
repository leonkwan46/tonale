import { darkTheme, lightTheme } from '@/config/theme/theme'
import { DEVICE } from '@/constants/device'
import { useWindowDimensions } from '@/hooks'
import { useThemeMode } from '@/hooks/useThemeModeContext'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { type ReactNode, useMemo } from 'react'

import { ThemeTransitionOverlay } from './ThemeTransitionOverlay'

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
    <EmotionThemeProvider theme={extendedTheme}>
      {children}
      <ThemeTransitionOverlay isDark={isDark} />
    </EmotionThemeProvider>
  )
}
