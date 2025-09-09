import { Colors } from './Colors'

// Shared constants that are theme-independent
export const sharedConstants = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
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
    '5xl': 52
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
    }
  }
}

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
    
    // ChoiceButton depth colors
    choiceButtonDepth: {
      default: '#156382',
      selected: '#0a5a7a',
      correct: '#2a8a3a',
      incorrect: '#b52a2a',
      neutral: '#0a3a4a'
    }
    
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
    
    // ChoiceButton depth colors
    choiceButtonDepth: {
      default: '#156382',
      selected: '#0a5a7a',
      correct: '#2a8a3a',
      incorrect: '#b52a2a',
      neutral: '#0a3a4a'
    }
    
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
      fontFamily: 'System',
      fontWeight: '400' as const
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const
    },
    bold: {
      fontFamily: 'System',
      fontWeight: 'bold' as const
    },
    heavy: {
      fontFamily: 'System',
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