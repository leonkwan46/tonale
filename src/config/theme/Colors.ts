/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#fff'

export const Colors = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#0a7ea4',
    secondary: '#687076',
    accent: '#ff6b6b',
    success: '#51cf66',
    warning: '#ffd43b',
    error: '#ff6b6b',
    surface: '#f8f9fa',
    border: '#868e96',
    card: '#adb5bd',
    textSecondary: '#687076',
    stageCleared: '#4CAF50',
    stagePerfect: '#FFD700',
    stagePerfectBorder: '#FFA500',
    revisionCard: {
      border: '#FF6E52',
      iconBackground: '#F58970',
      shadow: '#DE6B54',
      buttonBackground: '#F58970',
      buttonDepth: '#DE6B54',
      successShadow: '#2a8a3a',
      iconText: '#000'
    }
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#4dabf7',
    secondary: '#9BA1A6',
    accent: '#ff8787',
    success: '#69db7c',
    warning: '#ffe066',
    error: '#ff8787',
    surface: '#1f2937',
    border: '#374151',
    card: '#1f2937',
    textSecondary: '#9BA1A6',
    stageCleared: '#2E7D32',
    stagePerfect: '#B8860B',
    stagePerfectBorder: '#DAA520',
    revisionCard: {
      border: '#FF6E52',
      iconBackground: '#F58970',
      shadow: '#DE6B54',
      buttonBackground: '#F58970',
      buttonDepth: '#DE6B54',
      successShadow: '#2a8a3a',
      iconText: '#ECEDEE'
    }
  }
}

export type ColorScheme = keyof typeof Colors
