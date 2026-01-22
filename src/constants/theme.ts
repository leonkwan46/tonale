export const THEME = {
  DARK: 'dark',
  LIGHT: 'light'
} as const

export type ThemeMode = typeof THEME[keyof typeof THEME]
