import type { AppTheme } from '@/config/theme/theme'

const hexToRgba = (hex: string, alpha: number): string => {
  if (!hex.startsWith('#')) return hex
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const getFlameColor = (day: number, currentDay: number, theme: AppTheme): string => {
  if (day <= 0) {
    return hexToRgba(theme.colors.flame.empty, 0.2)
  }
  if (day <= currentDay) {
    return theme.colors.flame.active
  }
  return hexToRgba(theme.colors.flame.upcoming, 0.4)
}
