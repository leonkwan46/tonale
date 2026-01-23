import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { Colors } from './Colors'

// Shared constants that are theme-independent
export const sharedConstants = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48
  },
  typography: {
    xs: 10,
    sm: 12,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 32,
    '4xl': 40,
    '5xl': 52,
    fontFamily: 'SourGummy-Regular'
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const
  },
  components: {
    cardButton: {
      size: 100 // Base size for CardButton (used with scale())
    },
    iconSizes: {
      // Icon size mapping: [phone, tablet]
      xs: [14, 16],
      sm: [16, 20],
      md: [18, 20],
      lg: [20, 24],
      xl: [36, 40],
      '2xl': [48, 64]
    }
  }
}

// Icon size variant type
export type IconSizeVariant = keyof typeof sharedConstants.components.iconSizes

// Icon color variant type
export type IconColorVariant = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'text' | 'icon'

// Unified theme that extends your existing Colors
export const lightTheme = {
  colors: {
    // Core colors from your existing Colors constant
    text: Colors.light.text,
    background: Colors.light.background,
    primary: Colors.light.primary,
    secondary: Colors.light.secondary,
    accent: Colors.light.accent,
    success: Colors.light.success,
    warning: Colors.light.warning,
    error: Colors.light.error,
    surface: Colors.light.surface,
    border: Colors.light.border,
    
    // Navigation specific colors
    tint: Colors.light.tint,
    icon: Colors.light.icon,
    tabIconDefault: Colors.light.tabIconDefault,
    tabIconSelected: Colors.light.tabIconSelected,
    
    // Additional theme colors
    gold: '#FFD700',
    inputBackground: '#f8f9fa',
    lockedNode: '#999',
    
    // Button3D depth colors (color-based naming)
    choiceButtonDepth: {
      blue: '#156382',
      red: Colors.light.revisionCard.buttonDepth,
      green: '#2a8a3a',
      yellow: '#ffd43b',
      grey: '#666666'
    },
    
    // Button3D background colors (color-based naming)
    choiceButton: {
      blue: Colors.light.primary,
      red: Colors.light.revisionCard.buttonBackground,
      green: Colors.light.success,
      yellow: Colors.light.warning,
      grey: '#999'
    },
    
    // RevisionCard colors
    revisionCard: Colors.light.revisionCard,
    
    // Flame colors for StrikeBar
    flame: Colors.light.flame,
    
    // HomeScreen specific colors
    homeScreen: Colors.light.homeScreen,
    
    // Modal mask color (backdrop/overlay behind modal)
    modalMask: Colors.light.modalMask,
    
    // FinalTest specific colors
    finalTest: Colors.light.finalTest,
    
    // CardButton depth colors
    cardButton: Colors.light.cardButton,
    
    // Cloud colors for TopCloudsCover
    clouds: Colors.light.clouds
    
  },
  // Use shared constants for consistent dimensions across themes
  ...sharedConstants
}

export const darkTheme = {
  colors: {
    // Core colors from your existing Colors constant
    text: Colors.dark.text,
    background: Colors.dark.background,
    primary: Colors.dark.primary,
    secondary: Colors.dark.secondary,
    accent: Colors.dark.accent,
    success: Colors.dark.success,
    warning: Colors.dark.warning,
    error: Colors.dark.error,
    surface: Colors.dark.surface,
    border: Colors.dark.border,
    
    // Navigation specific colors
    tint: Colors.dark.tint,
    icon: Colors.dark.icon,
    tabIconDefault: Colors.dark.tabIconDefault,
    tabIconSelected: Colors.dark.tabIconSelected,
    
    // Additional theme colors
    gold: '#FFD700',
    inputBackground: '#1a1a1a',
    lockedNode: '#444',
    
    // Button3D depth colors (color-based naming)
    choiceButtonDepth: {
      blue: '#156382',
      red: Colors.dark.revisionCard.buttonDepth,
      green: '#2a8a3a',
      yellow: '#ffe066',
      grey: '#333333'
    },
    
    // Button3D background colors (color-based naming)
    choiceButton: {
      blue: Colors.dark.primary,
      red: Colors.dark.revisionCard.buttonBackground,
      green: Colors.dark.success,
      yellow: Colors.dark.warning,
      grey: '#444'
    },
    
    // RevisionCard colors
    revisionCard: Colors.dark.revisionCard,
    
    // Flame colors for StrikeBar
    flame: Colors.dark.flame,
    
    // HomeScreen specific colors
    homeScreen: Colors.dark.homeScreen,
    
    // Modal mask color (backdrop/overlay behind modal)
    modalMask: Colors.dark.modalMask,
    
    // FinalTest specific colors
    finalTest: Colors.dark.finalTest,
    
    // CardButton depth colors
    cardButton: Colors.dark.cardButton,
    
    // Cloud colors for TopCloudsCover
    clouds: Colors.dark.clouds
    
  },
  // Use shared constants for consistent dimensions across themes
  ...sharedConstants
}

export type AppTheme = typeof lightTheme

// Export component dimensions separately for direct access
export const componentDimensions = sharedConstants.components

// Create unified navigation themes that use our color system
export const navigationLightTheme = {
  dark: false,
  colors: {
    primary: lightTheme.colors.primary,
    background: lightTheme.colors.background,
    card: lightTheme.colors.surface,
    text: lightTheme.colors.text,
    border: lightTheme.colors.border,
    notification: lightTheme.colors.accent
  },
  fonts: {
    regular: {
      fontFamily: getSourGummyFontFamily('400'),
      fontWeight: '400' as const
    },
    medium: {
      fontFamily: getSourGummyFontFamily('500'),
      fontWeight: '500' as const
    },
    bold: {
      fontFamily: getSourGummyFontFamily('700'),
      fontWeight: 'bold' as const
    },
    heavy: {
      fontFamily: getSourGummyFontFamily('700'),
      fontWeight: '700' as const
    }
  }
}

export const navigationDarkTheme = {
  dark: true,
  colors: {
    primary: darkTheme.colors.primary,
    background: darkTheme.colors.background,
    card: darkTheme.colors.surface,
    text: darkTheme.colors.text,
    border: darkTheme.colors.border,
    notification: darkTheme.colors.accent
  },
  fonts: navigationLightTheme.fonts
}
