import * as React from 'react'
import type { Theme } from '@emotion/react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo'
import { INSTRUMENT, type UserGender, type UserInstrument } from '@types'
import { Image } from 'react-native'
import { scale } from 'react-native-size-matters'

/**
 * Maps instrument type to MaterialCommunityIcons icon name
 * MaterialCommunityIcons has specific icons for each instrument
 */
export const getInstrumentIconName = (instrument: UserInstrument): string => {
  const iconMap: Record<UserInstrument, string> = {
    [INSTRUMENT.PIANO]: 'piano',
    [INSTRUMENT.GUITAR]: 'guitar-electric',
    [INSTRUMENT.VIOLIN]: 'violin',
    [INSTRUMENT.VOCAL]: 'music-note', // Not used, handled separately with Entypo
    [INSTRUMENT.OTHER]: 'music-note'
  }
  
  return iconMap[instrument] || 'music-note'
}

/**
 * Renders gender icon (head image) for GridSelection
 */
export const renderGenderIcon = (gender: UserGender, theme: Theme): React.ReactElement => {
  const imageSource = gender === 'female'
    ? require('../../../../../assets/images/girl/girl_head.png')
    : require('../../../../../assets/images/boy/boy_head.png')
  
  return (
    <Image
      source={imageSource}
      style={{
        width: scale(40),
        height: scale(40),
        resizeMode: 'contain'
      }}
    />
  )
}

/**
 * Renders instrument icon (MaterialCommunityIcons or Entypo) for GridSelection
 */
export const renderInstrumentIcon = (instrument: UserInstrument, theme: Theme): React.ReactElement => {
  // Use Entypo for vocal/singing
  if (instrument === INSTRUMENT.VOCAL) {
    return (
      <Entypo
        name="mic"
        size={scale(32)}
        color={theme.colors.text}
      />
    )
  }
  
  // Use MaterialCommunityIcons for other instruments
  const iconName = getInstrumentIconName(instrument)
  
  return (
    <MaterialCommunityIcons
      name={iconName as keyof typeof MaterialCommunityIcons.glyphMap}
      size={scale(32)}
      color={theme.colors.text}
    />
  )
}

