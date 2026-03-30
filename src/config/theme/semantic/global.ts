import { palette } from '../tokens/palette'

export type ThemeSemanticColors = {
  text: string
  background: string
  primary: string
  primaryContrast: string
  success: string
  successContrast: string
  warning: string
  warningContrast: string
  error: string
  errorContrast: string
  surface: string
  border: string
  icon: string
}

export const lightSemanticColors: ThemeSemanticColors = {
  text: palette.gray[950],
  background: palette.base.white,
  primary: palette.blue[600],
  primaryContrast: palette.base.white,
  success: palette.green[500],
  successContrast: palette.gray[950],
  warning: palette.yellow[400],
  warningContrast: palette.gray[950],
  error: palette.red[500],
  errorContrast: palette.gray[950],
  surface: palette.gray[50],
  border: palette.gray[400],
  icon: palette.gray[400]
}

export const darkSemanticColors: ThemeSemanticColors = {
  text: palette.gray[100],
  background: palette.gray[950],
  primary: palette.blue[400],
  primaryContrast: palette.gray[950],
  success: palette.green[400],
  successContrast: palette.gray[950],
  warning: palette.yellow[300],
  warningContrast: palette.gray[950],
  error: palette.red[400],
  errorContrast: palette.gray[950],
  surface: palette.gray[800],
  border: palette.gray[800],
  icon: palette.gray[600]
}
