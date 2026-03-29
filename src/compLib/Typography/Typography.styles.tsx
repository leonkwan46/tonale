import type { IconColorVariant } from '@/config/theme/theme'
import styled from '@emotion/native'
import type { Theme } from '@emotion/react'
import { Text } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { createTypographyShouldForwardProp } from '@/utils/styledProps'

export type TypographySize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type TypographyWeight = 'regular' | 'semibold' | 'bold';

export type TypographyColorVariant = IconColorVariant;

export const TYPOGRAPHY_SIZE_MAP: Record<
  TypographySize,
  { phone: number; tablet: number }
> = {
  xxs: { phone: 10, tablet: 10 },
  xs: { phone: 12, tablet: 10 },
  sm: { phone: 14, tablet: 12 },
  md: { phone: 16, tablet: 14 },
  lg: { phone: 20, tablet: 16 },
  xl: { phone: 28, tablet: 24 },
  xxl: { phone: 40, tablet: 32 }
}

const TYPOGRAPHY_EMOTION_ONLY_PROPS = [
  'size',
  'weight',
  'colorVariant',
  'color',
  'italic',
  'align',
  'muted'
] as const

export const getScaledTypographyFontSize = (
  theme: { device: { isTablet: boolean } },
  size: TypographySize
): number => {
  const { phone, tablet } = TYPOGRAPHY_SIZE_MAP[size]
  return scale(theme.device.isTablet ? tablet : phone)
}

export const getInputTypographyStyle = (
  theme: Theme,
  options?: { multiline?: boolean }
): {
  fontSize: number;
  fontFamily: string;
  lineHeight?: number;
} => {
  const fontSize = getScaledTypographyFontSize(theme, 'md')
  const lineHeight = options?.multiline
    ? theme.device.isTablet
      ? scale(20)
      : scale(22)
    : undefined
  return {
    fontSize,
    fontFamily: getSourGummyFontFamily(),
    ...(lineHeight !== undefined ? { lineHeight } : {})
  }
}

type StyledTypographyProps = {
  size?: TypographySize;
  weight?: TypographyWeight;
  colorVariant?: TypographyColorVariant;
  color?: string;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  muted?: boolean;
};

function resolveFontWeightArg(
  theme: Theme,
  weight: TypographyWeight
): string | undefined {
  if (weight === 'regular') return undefined
  if (weight === 'semibold') return theme.fontWeight.semibold
  return theme.fontWeight.bold
}

function buildTypographyStyle(
  theme: Theme,
  {
    size,
    weight,
    colorVariant,
    color,
    italic,
    align,
    muted
  }: {
    size: TypographySize;
    weight: TypographyWeight;
    colorVariant: TypographyColorVariant;
    color?: string;
    italic: boolean;
    align?: 'left' | 'center' | 'right';
    muted: boolean;
  }
) {
  const isTablet = theme.device.isTablet
  const { phone, tablet } = TYPOGRAPHY_SIZE_MAP[size]
  const fontSize = scale(isTablet ? tablet : phone)
  const weightArg = resolveFontWeightArg(theme, weight)
  const textColor = color ?? theme.colors[colorVariant]

  return {
    fontSize,
    color: textColor,
    fontFamily: getSourGummyFontFamily(weightArg, italic),
    ...(align ? { textAlign: align } : {}),
    ...(muted ? { opacity: 0.7 } : {})
  }
}

export const Typography = styled(Text, {
  shouldForwardProp: createTypographyShouldForwardProp([
    ...TYPOGRAPHY_EMOTION_ONLY_PROPS
  ])
})<StyledTypographyProps>(
  ({
    theme,
    size = 'md',
    weight = 'regular',
    colorVariant = 'text',
    color,
    italic = false,
    align,
    muted = false
  }) =>
    buildTypographyStyle(theme, {
      size,
      weight,
      colorVariant,
      color,
      italic,
      align,
      muted
    })
)
