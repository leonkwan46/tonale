import { useWindowDimensions } from './useWindowDimensions'

export const BREAKPOINTS = { sm: 0, md: 600, lg: 900 } as const

export type Breakpoint = keyof typeof BREAKPOINTS

export const useBreakpoint = (): Breakpoint => {
  const { width } = useWindowDimensions()
  if (width >= BREAKPOINTS.lg) return 'lg'
  if (width >= BREAKPOINTS.md) return 'md'
  return 'sm'
}
