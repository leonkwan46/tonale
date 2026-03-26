import { palette } from '../tokens/palette'

export type ThemeSemanticColors = {
  text: string
  textPlaceholder: string
  background: string
  primary: string
  primaryContrast: string
  accent: string
  accentContrast: string
  success: string
  successContrast: string
  warning: string
  warningContrast: string
  error: string
  errorContrast: string
  surface: string
  border: string
  settingSection: string
  cardText: string
  tint: string
  icon: string
  tabIconDefault: string
  tabIconSelected: string
  gold: string
  inputBackground: string
  modalMask: string
  overlayText: string
  stageCleared: string
  stagePerfect: string
  stagePerfectBorder: string
}

export const lightSemanticColors: ThemeSemanticColors = {
  text: palette.gray975,
  textPlaceholder: palette.gray500,
  background: palette.white,
  primary: palette.blue600,
  primaryContrast: palette.white,
  accent: palette.red500,
  accentContrast: palette.gray975,
  success: palette.green500,
  successContrast: palette.gray975,
  warning: palette.yellow400,
  warningContrast: palette.gray975,
  error: palette.red500,
  errorContrast: palette.gray975,
  surface: palette.gray50,
  border: palette.gray400,
  settingSection: palette.gray100,
  cardText: palette.black,
  tint: palette.blue600,
  icon: palette.gray400,
  tabIconDefault: palette.gray400,
  tabIconSelected: palette.blue600,
  gold: palette.gold400,
  inputBackground: palette.gray50,
  modalMask: palette.modalMask,
  overlayText: palette.white,
  stageCleared: palette.green600,
  stagePerfect: palette.gold400,
  stagePerfectBorder: palette.gold500
}

export const darkSemanticColors: ThemeSemanticColors = {
  text: palette.gray100,
  textPlaceholder: palette.gray100,
  background: palette.gray950,
  primary: palette.blue400,
  primaryContrast: palette.gray975,
  accent: palette.red400,
  accentContrast: palette.gray975,
  success: palette.green400,
  successContrast: palette.gray975,
  warning: palette.yellow300,
  warningContrast: palette.gray975,
  error: palette.red400,
  errorContrast: palette.gray975,
  surface: palette.gray850,
  border: palette.gray800,
  settingSection: palette.gray850,
  cardText: palette.black,
  tint: palette.white,
  icon: palette.gray600,
  tabIconDefault: palette.gray600,
  tabIconSelected: palette.white,
  gold: palette.gold700,
  inputBackground: palette.gray950,
  modalMask: palette.modalMask,
  overlayText: palette.white,
  stageCleared: palette.green800,
  stagePerfect: palette.gold700,
  stagePerfectBorder: palette.gold600
}
