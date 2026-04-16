export const palette = {
  base: {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent'
  },

  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b'
  },

  blueGray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5f5',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  },

  blue: {
    400: '#4dabf7',
    500: '#339af0',
    600: '#0a7ea4',
    700: '#156382',
    900: '#0a3a4a'
  },

  green: {
    400: '#69db7c',
    500: '#51cf66',
    600: '#4CAF50',
    700: '#2a8a3a',
    800: '#2E7D32'
  },

  red: {
    400: '#ff8787',
    500: '#ff6b6b'
  },

  coral: {
    400: '#F58970',
    600: '#DE6B54'
  },

  yellow: {
    300: '#ffe066',
    400: '#ffd43b'
  },

  orange: {
    400: '#FF8C42',
    500: '#FF6B35',
    700: '#CC562A'
  },

  gold: {
    400: '#FFD700',
    500: '#FFA500',
    600: '#DAA520',
    700: '#B8860B'
  },

  accent: {
    crimson: {
      500: '#FF4500',
      900: '#8B0000'
    },
    salmon: {
      300: '#FFA07A'
    },
    sky: {
      50: '#f8fcff',
      100: '#f0f8ff',
      200: '#e6f3ff',
      300: '#cce6ff'
    }
  },

  gradients: {
    homeDark: ['#2E3237', '#1E252B', '#1A1E22', '#331009'] as const,
    homeLight: ['#EEEEEE', '#A3C3CA', '#68A9B7', '#BF3713'] as const,
    finalTest: ['#ff6b6b', '#FF4500', '#ffd43b'] as const
  },

  effects: {
    modalMask: 'rgba(0, 0, 0, 0.7)',
    rippleWater: 'rgba(80, 160, 255, 1)',
    rippleCircleBorder: 'rgba(180, 220, 255, 0.9)'
  }
} as const
