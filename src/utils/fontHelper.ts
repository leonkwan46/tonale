const normalizeFontWeight = (weight?: string | number): string => {
  if (!weight) return '400'
  
  const weightStr = String(weight)
  
  if (weightStr === 'normal') return '400'
  if (weightStr === 'bold') return '700'
  if (weightStr === 'medium') return '500'
  if (weightStr === 'semibold') return '600'
  
  return weightStr
}

const FONT_WEIGHT_MAP: Record<string, { regular: string; italic: string }> = {
  '100': { regular: 'SourGummy-Thin', italic: 'SourGummy-ThinItalic' },
  '200': { regular: 'SourGummy-ExtraLight', italic: 'SourGummy-ExtraLightItalic' },
  '300': { regular: 'SourGummy-Light', italic: 'SourGummy-LightItalic' },
  '400': { regular: 'SourGummy-Regular', italic: 'SourGummy-Italic' },
  '500': { regular: 'SourGummy-Medium', italic: 'SourGummy-MediumItalic' },
  '600': { regular: 'SourGummy-SemiBold', italic: 'SourGummy-SemiBoldItalic' },
  '700': { regular: 'SourGummy-Bold', italic: 'SourGummy-BoldItalic' },
  '800': { regular: 'SourGummy-ExtraBold', italic: 'SourGummy-ExtraBoldItalic' },
  '900': { regular: 'SourGummy-Black', italic: 'SourGummy-BlackItalic' }
}

export const getSourGummyFontFamily = (
  weight?: string | number,
  italic?: boolean
): string => {
  const normalizedWeight = normalizeFontWeight(weight)
  const fontVariant = FONT_WEIGHT_MAP[normalizedWeight] || FONT_WEIGHT_MAP['400']
  return italic ? fontVariant.italic : fontVariant.regular
}

