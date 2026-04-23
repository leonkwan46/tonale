import { THEME } from '@/constants/theme'
import { appPreferences } from '@/storage'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useColorScheme } from 'react-native'

export interface ThemeModeContextType {
  isDark: boolean
  setIsDark: (value: boolean) => void
}

export const ThemeModeContext =
  createContext<ThemeModeContextType | undefined>(undefined)

export const ThemeModeProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const systemColorScheme = useColorScheme()
  const [isDark, setIsDarkState] = useState<boolean>(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    appPreferences
      .getThemeMode()
      .then((stored) => {
        setIsDarkState(stored !== null ? stored : systemColorScheme === THEME.DARK)
      })
      .finally(() => setLoaded(true))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- runs once on mount; systemColorScheme is only a fallback for first launch

  const setIsDark = useCallback((value: boolean) => {
    setIsDarkState(value)
    appPreferences.setThemeMode(value)
  }, [])

  const value = useMemo(() => ({ isDark, setIsDark }), [isDark, setIsDark])

  if (!loaded) return null

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  )
}

export const useThemeMode = (): ThemeModeContextType => {
  const context = useContext(ThemeModeContext)
  if (context === undefined) {
    throw new Error(
      'useThemeMode must be used within a ThemeModeProvider'
    )
  }
  return context
}
