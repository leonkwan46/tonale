import {
  darkComponentColors,
  darkSemanticColors,
  lightComponentColors,
  lightSemanticColors,
  type ThemeSemanticColors
} from './semantic'
import {
  borderRadius,
  cardButtonSize,
  iconSizes,
  shadows,
  spacing
} from './tokens/dimensions'
import { fontWeight, typography } from './tokens/typography'

export type IconColorVariant =
  | 'primary'
  | 'primaryContrast'
  | 'success'
  | 'successContrast'
  | 'warning'
  | 'warningContrast'
  | 'error'
  | 'errorContrast'
  | 'text'
  | 'icon'

export type { ThemeSemanticColors } from './semantic'
export type {
  BorderRadiusVariant,
  IconSizeVariant,
  ShadowVariant
} from './tokens/dimensions'

const dimensionExports = {
  spacing,
  typography,
  fontWeight,
  borderRadius,
  shadows
}

const createAppTheme = (
  colors: ThemeSemanticColors,
  components:
    | typeof lightComponentColors
    | typeof darkComponentColors
) => ({
  colors,
  components,
  dimensions: {
    iconSizes,
    cardButtonSize
  },
  ...dimensionExports
})

export const lightTheme = createAppTheme(lightSemanticColors, lightComponentColors)

export const darkTheme = createAppTheme(darkSemanticColors, darkComponentColors)

export type AppTheme = typeof lightTheme | typeof darkTheme
