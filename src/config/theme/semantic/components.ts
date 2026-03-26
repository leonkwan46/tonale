import { palette } from '../tokens/palette'

export const lightComponentColors = {
  button: {
    blue: {
      color: palette.blue600,
      depth: palette.blue700,
      text: palette.white
    },
    red: {
      color: palette.coral400,
      depth: palette.coral600,
      text: palette.gray975
    },
    green: {
      color: palette.green500,
      depth: palette.green700,
      text: palette.gray975
    },
    yellow: {
      color: palette.yellow400,
      depth: palette.yellow400,
      text: palette.gray975
    },
    grey: {
      color: palette.gray400,
      depth: palette.gray700,
      text: palette.gray975
    },
    finalTest: {
      color: palette.yellow400,
      depth: palette.crimson900,
      text: palette.gray975
    }
  },

  flame: {
    active: palette.orange500,
    activeDepth: palette.orange700,
    upcoming: palette.orange400,
    empty: palette.salmon300,
    cardFill: palette.gray50,
    cardDepth: palette.gray100
  },

  homeScreen: {
    gradient: {
      dark: palette.homeGradientDark,
      light: palette.homeGradientLight
    }
  },

  finalTest: {
    gradient: palette.finalTestGradient
  },

  clouds: {
    sky50: palette.sky50,
    sky100: palette.sky100,
    sky200: palette.sky200,
    sky300: palette.sky300
  },

  displayCard: {
    background: palette.white
  },

  playback: {
    rippleWater: palette.rippleWater,
    rippleCircleBorder: palette.rippleCircleBorder
  },

  input: {
    background: palette.gray50,
    border: palette.gray400,
    text: palette.gray975,
    placeholder: palette.gray500
  },

  tabBar: {
    active: palette.blue600,
    inactive: palette.gray400
  },

  modal: {
    mask: palette.modalMask,
    overlayText: palette.white
  },

  settings: {
    sectionBackground: palette.gray100
  },

  notation: {
    text: palette.black
  },

  achievement: {
    gold: palette.gold400
  },

  stage: {
    cleared: palette.green500,
    perfect: palette.gold400,
    perfectBorder: palette.gold500,
    textOnCleared: palette.gray975,
    textOnPerfect: palette.black
  }
}

export const darkComponentColors = {
  button: {
    blue: {
      color: palette.blue400,
      depth: palette.blue700,
      text: palette.gray975
    },
    red: {
      color: palette.coral400,
      depth: palette.coral600,
      text: palette.gray975
    },
    green: {
      color: palette.green400,
      depth: palette.green700,
      text: palette.gray975
    },
    yellow: {
      color: palette.yellow300,
      depth: palette.yellow300,
      text: palette.gray975
    },
    grey: {
      color: palette.gray800,
      depth: palette.gray950,
      text: palette.gray100
    },
    finalTest: {
      color: palette.yellow300,
      depth: palette.crimson900,
      text: palette.gray975
    }
  },

  flame: {
    active: palette.orange500,
    activeDepth: palette.orange700,
    upcoming: palette.orange400,
    empty: palette.salmon300,
    cardFill: palette.gray850,
    cardDepth: palette.gray950
  },

  homeScreen: {
    gradient: {
      dark: palette.homeGradientDark,
      light: palette.homeGradientLight
    }
  },

  finalTest: {
    gradient: palette.finalTestGradient
  },

  clouds: {
    sky50: palette.sky50,
    sky100: palette.sky100,
    sky200: palette.sky200,
    sky300: palette.sky300
  },

  displayCard: {
    background: palette.white
  },

  playback: {
    rippleWater: palette.rippleWater,
    rippleCircleBorder: palette.rippleCircleBorder
  },

  input: {
    background: palette.gray950,
    border: palette.gray800,
    text: palette.gray100,
    placeholder: palette.gray100
  },

  tabBar: {
    active: palette.white,
    inactive: palette.gray600
  },

  modal: {
    mask: palette.modalMask,
    overlayText: palette.white
  },

  settings: {
    sectionBackground: palette.gray850
  },

  notation: {
    text: palette.black
  },

  achievement: {
    gold: palette.gold700
  },

  stage: {
    cleared: palette.green400,
    perfect: palette.gold700,
    perfectBorder: palette.gold600,
    textOnCleared: palette.gray975,
    textOnPerfect: palette.black
  }
}
