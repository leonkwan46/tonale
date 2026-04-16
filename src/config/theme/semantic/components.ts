import { palette } from '../tokens/palette'

export const lightComponentColors = {
  button: {
    blue: {
      color: palette.blue[600],
      depth: palette.blue[700],
      text: palette.base.white
    },
    red: {
      color: palette.coral[400],
      depth: palette.coral[600],
      text: palette.gray[950]
    },
    green: {
      color: palette.green[500],
      depth: palette.green[700],
      text: palette.gray[950]
    },
    yellow: {
      color: palette.yellow[400],
      depth: palette.yellow[400],
      text: palette.gray[950]
    },
    grey: {
      color: palette.gray[400],
      depth: palette.gray[700],
      text: palette.gray[950]
    },
    finalTest: {
      color: palette.yellow[400],
      depth: palette.accent.crimson[900],
      text: palette.gray[950]
    }
  },

  flame: {
    active: palette.orange[500],
    activeDepth: palette.orange[700],
    upcoming: palette.orange[400],
    empty: palette.accent.salmon[300],
    cardFill: palette.gray[50],
    cardDepth: palette.gray[100]
  },

  homeScreen: {
    gradient: {
      dark: palette.gradients.homeDark,
      light: palette.gradients.homeLight
    }
  },

  finalTest: {
    gradient: palette.gradients.finalTest
  },

  clouds: {
    sky50: palette.accent.sky[50],
    sky100: palette.accent.sky[100],
    sky200: palette.accent.sky[200],
    sky300: palette.accent.sky[300]
  },

  displayCard: {
    background: palette.base.white
  },

  playback: {
    rippleWater: palette.effects.rippleWater,
    rippleCircleBorder: palette.effects.rippleCircleBorder
  },

  input: {
    background: palette.gray[50],
    text: palette.gray[950],
    placeholder: palette.gray[500]
  },

  tabBar: {
    active: palette.blue[600],
    inactive: palette.gray[400]
  },

  modal: {
    mask: palette.effects.modalMask,
    overlayText: palette.base.white
  },

  settings: {
    sectionBackground: palette.gray[100],
    separator: palette.gray[400]
  },

  notation: {
    text: palette.base.black
  },

  achievement: {
    gold: palette.gold[400]
  },

  stage: {
    cleared: palette.green[500],
    perfect: palette.gold[400],
    perfectBorder: palette.gold[500],
    textOnCleared: palette.gray[950],
    textOnPerfect: palette.base.black
  }
}

export const darkComponentColors = {
  button: {
    blue: {
      color: palette.blue[400],
      depth: palette.blue[700],
      text: palette.gray[950]
    },
    red: {
      color: palette.coral[400],
      depth: palette.coral[600],
      text: palette.gray[950]
    },
    green: {
      color: palette.green[400],
      depth: palette.green[700],
      text: palette.gray[950]
    },
    yellow: {
      color: palette.yellow[300],
      depth: palette.yellow[300],
      text: palette.gray[950]
    },
    grey: {
      color: palette.gray[700],
      depth: palette.gray[800],
      text: palette.gray[100]
    },
    finalTest: {
      color: palette.yellow[300],
      depth: palette.accent.crimson[900],
      text: palette.gray[950]
    }
  },

  flame: {
    active: palette.orange[500],
    activeDepth: palette.orange[700],
    upcoming: palette.orange[400],
    empty: palette.accent.salmon[300],
    cardFill: palette.gray[800],
    cardDepth: palette.gray[950]
  },

  homeScreen: {
    gradient: {
      dark: palette.gradients.homeDark,
      light: palette.gradients.homeLight
    }
  },

  finalTest: {
    gradient: palette.gradients.finalTest
  },

  clouds: {
    sky50: palette.accent.sky[50],
    sky100: palette.accent.sky[100],
    sky200: palette.accent.sky[200],
    sky300: palette.accent.sky[300]
  },

  displayCard: {
    background: palette.base.white
  },

  playback: {
    rippleWater: palette.effects.rippleWater,
    rippleCircleBorder: palette.effects.rippleCircleBorder
  },

  input: {
    background: palette.gray[950],
    text: palette.gray[100],
    placeholder: palette.gray[100]
  },

  tabBar: {
    active: palette.blue[600],
    inactive: palette.gray[600]
  },

  modal: {
    mask: palette.effects.modalMask,
    overlayText: palette.base.white
  },

  settings: {
    sectionBackground: palette.blueGray[800],
    separator: palette.gray[500]
  },

  notation: {
    text: palette.base.black
  },

  achievement: {
    gold: palette.gold[700]
  },

  stage: {
    cleared: palette.green[400],
    perfect: palette.gold[700],
    perfectBorder: palette.gold[600],
    textOnCleared: palette.gray[950],
    textOnPerfect: palette.base.black
  }
}
