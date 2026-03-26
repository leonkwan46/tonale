export const typography = {
  xs: 10,
  sm: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 40,
  '5xl': 52
} as const

export const fontWeight = {
  semibold: '600' as const,
  bold: '700' as const
} as const

const normalizeFontWeight = (weight?: string | number): string => {
  if (!weight) return '400'

  const weightStr = String(weight)

  if (weightStr === 'normal') return '400'
  if (weightStr === 'bold') return '700'
  if (weightStr === 'semibold') return '600'

  return weightStr
}

const FONT_WEIGHT_MAP: Record<
  '400' | '600' | '700',
  { regular: string; italic: string }
> = {
  '400': { regular: 'SourGummy-Regular', italic: 'SourGummy-Italic' },
  '600': { regular: 'SourGummy-SemiBold', italic: 'SourGummy-SemiBoldItalic' },
  '700': { regular: 'SourGummy-Bold', italic: 'SourGummy-BoldItalic' }
}

export const getSourGummyFontFamily = (
  weight?: string | number,
  italic?: boolean
): string => {
  const normalizedWeight = normalizeFontWeight(weight)
  const fontVariant =
    FONT_WEIGHT_MAP[normalizedWeight as keyof typeof FONT_WEIGHT_MAP] ??
    FONT_WEIGHT_MAP['400']
  return italic ? fontVariant.italic : fontVariant.regular
}
