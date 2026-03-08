import AsyncStorage from '@react-native-async-storage/async-storage'
import { THEME } from '@/constants/theme'
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
  const [isDark, setIsDarkState] = useState<boolean>(systemColorScheme === THEME.DARK)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('dark_mode').then(stored => {
      if (stored !== null) {
        setIsDarkState(stored === 'true')
      }
      setLoaded(true)
    })
  }, [])

  const setIsDark = useCallback((value: boolean) => {
    setIsDarkState(value)
    AsyncStorage.setItem('dark_mode', String(value))
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
