import {
  assertContrastInDev,
  compositeForegroundOnBackground
} from './tokens/contrast'
import { darkTheme, lightTheme, type AppTheme } from './theme'

const runSemanticContrastChecks = (
  colors: AppTheme['colors'],
  label: string
): void => {
  assertContrastInDev(
    colors.text,
    colors.background,
    4.5,
    `${label} text/background`
  )
  assertContrastInDev(
    colors.text,
    colors.surface,
    4.5,
    `${label} text/surface`
  )
  assertContrastInDev(
    compositeForegroundOnBackground(
      colors.textPlaceholder,
      colors.inputBackground
    ),
    colors.inputBackground,
    4.5,
    `${label} textPlaceholder/inputBackground`
  )
  assertContrastInDev(
    colors.primaryContrast,
    colors.primary,
    4.5,
    `${label} primaryContrast/primary`
  )
  assertContrastInDev(
    colors.errorContrast,
    colors.error,
    4.5,
    `${label} errorContrast/error`
  )
  assertContrastInDev(
    colors.accentContrast,
    colors.accent,
    4.5,
    `${label} accentContrast/accent`
  )
  assertContrastInDev(
    colors.successContrast,
    colors.success,
    4.5,
    `${label} successContrast/success`
  )
  assertContrastInDev(
    colors.warningContrast,
    colors.warning,
    4.5,
    `${label} warningContrast/warning`
  )
  assertContrastInDev(
    colors.text,
    colors.settingSection,
    4.5,
    `${label} text/settingSection`
  )
}

const assertButtonContrast = (
  mode: string,
  button: AppTheme['components']['button']
): void => {
  for (const [key, t] of Object.entries(button)) {
    assertContrastInDev(t.text, t.color, 4.5, `${mode} button.${key}`)
  }
}

export const runDevThemeContrastChecks = (
  light: AppTheme,
  dark: AppTheme
): void => {
  if (typeof __DEV__ === 'undefined' || !__DEV__) return

  runSemanticContrastChecks(light.colors, 'light')
  runSemanticContrastChecks(dark.colors, 'dark')
  assertButtonContrast('light', light.components.button)
  assertButtonContrast('dark', dark.components.button)
}

runDevThemeContrastChecks(lightTheme, darkTheme)
