import { darkTheme, lightTheme } from '@/config/theme/theme'
import { useDevice } from '@/hooks'
import { useThemeMode } from '@/hooks/useThemeModeContext'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { type ReactNode, useMemo } from 'react'

import { ThemeTransitionOverlay } from './ThemeTransitionOverlay'

interface AppThemeProviderProps {
  children: ReactNode
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const { isDark } = useThemeMode()
  const deviceInfo = useDevice()

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
