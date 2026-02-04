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
    },
    flame: {
      active: '#FF6B35',
      upcoming: '#FF8C42',
      empty: '#FFA07A'
    },
    homeScreen: {
      gradient: {
        dark: ['#2E3237', '#1E252B', '#1A1E22', '#331009'],
        light: ['#EEEEEE', '#A3C3CA', '#68A9B7', '#BF3713']
      },
      buttonDepth: '#156382'
    },
    modalMask: 'rgba(0, 0, 0, 0.7)',
    finalTest: {
      gradient: ['#ff6b6b', '#FF4500', '#ffd43b'] as const,
      shadow: '#8B0000'
    },
    cardButton: {
      depth: {
        completed: '#2a8a3a',
        locked: '#0a3a4a',
        default: '#156382'
      }
    },
    clouds: {
      light1: '#f0f8ff',
      light2: '#e6f3ff',
      light3: '#eaf4ff',
      light4: '#ddeeff',
      light5: '#f5faff',
      light6: '#d5e9ff',
      light7: '#cce6ff',
      light8: '#f8fcff'
    },
    displayCard: {
      background: '#ffffff'
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
    },
    flame: {
      active: '#FF6B35',
      upcoming: '#FF8C42',
      empty: '#FFA07A'
    },
    homeScreen: {
      gradient: {
        dark: ['#2E3237', '#1E252B', '#1A1E22', '#331009'],
        light: ['#EEEEEE', '#A3C3CA', '#68A9B7', '#BF3713']
      },
      buttonDepth: '#156382'
    },
    modalMask: 'rgba(0, 0, 0, 0.7)',
    finalTest: {
      gradient: ['#ff6b6b', '#FF4500', '#ffd43b'] as const,
      shadow: '#8B0000'
    },
    cardButton: {
      depth: {
        completed: '#2a8a3a',
        locked: '#0a3a4a',
        default: '#156382'
      }
    },
    clouds: {
      light1: '#f0f8ff',
      light2: '#e6f3ff',
      light3: '#eaf4ff',
      light4: '#ddeeff',
      light5: '#f5faff',
      light6: '#d5e9ff',
      light7: '#cce6ff',
      light8: '#f8fcff'
    },
    displayCard: {
      background: '#ffffff'
    }
  }
}

export type ColorScheme = keyof typeof Colors
