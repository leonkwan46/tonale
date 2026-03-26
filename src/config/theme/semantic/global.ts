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
  text: palette.gray975,
  background: palette.white,
  primary: palette.blue600,
  primaryContrast: palette.white,
  success: palette.green500,
  successContrast: palette.gray975,
  warning: palette.yellow400,
  warningContrast: palette.gray975,
  error: palette.red500,
  errorContrast: palette.gray975,
  surface: palette.gray50,
  border: palette.gray400,
  icon: palette.gray400
}

export const darkSemanticColors: ThemeSemanticColors = {
  text: palette.gray100,
  background: palette.gray950,
  primary: palette.blue400,
  primaryContrast: palette.gray975,
  success: palette.green400,
  successContrast: palette.gray975,
  warning: palette.yellow300,
  warningContrast: palette.gray975,
  error: palette.red400,
  errorContrast: palette.gray975,
  surface: palette.gray850,
  border: palette.gray800,
  icon: palette.gray600
}
