import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { INSTRUMENT, type UserGender, type UserInstrument } from '@types'
import { scale } from 'react-native-size-matters'
import { GenderIconImage } from './OnboardingIcons.styles'
import { getAvatarHeadSource } from '@/utils/avatarAssets'

const PianoIcon = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M2 3v18h20V3H2zm2 2h3v5H7V8H5V5zm5 0h3v10h-2v-3h-1V5zm5 0h5v14h-5V5zm1 2v3h3V7h-3z" />
  </Svg>
)

const GuitarIcon = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M20.71 5.63l-2.34-2.34a1 1 0 0 0-1.41 0l-3.12 3.12-1.41-1.42-1.42 1.42 1.41 1.41-6.6 6.6A2 2 0 0 0 5 15.88V19a1 1 0 0 0 1 1h3.12a2 2 0 0 0 1.41-.59l6.6-6.6 1.41 1.42 1.42-1.42-1.42-1.41 3.17-3.17a1 1 0 0 0 0-1.6zM9.12 18H7v-2.12l6.06-6.06 2.12 2.12L9.12 18z" />
  </Svg>
)

const ViolinIcon = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M20.5 3.5a1 1 0 0 0-1.41 0L17 5.59l-.59-.6a1 1 0 0 0-1.41 1.42l.59.59-1.09 1.09A5 5 0 0 0 8 14.24l-4.8 4.8a1 1 0 1 0 1.41 1.41l4.8-4.8A5 5 0 0 0 15.32 9l1.09-1.09.59.59a1 1 0 0 0 1.41-1.41l-.59-.59 2.09-2.09a1 1 0 0 0 0-1.41zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </Svg>
)

const MusicNoteIcon = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
  </Svg>
)

const MicIcon = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm6.5 9H20a8 8 0 0 1-7 7.93V21h2v2H9v-2h2v-3.07A8 8 0 0 1 4 10h1.5a6.5 6.5 0 0 0 13 0z" />
  </Svg>
)

export const getInstrumentIconName = (instrument: UserInstrument): string => {
  const iconMap: Record<UserInstrument, string> = {
    [INSTRUMENT.PIANO]: 'piano',
    [INSTRUMENT.GUITAR]: 'guitar-electric',
    [INSTRUMENT.VIOLIN]: 'violin',
    [INSTRUMENT.VOCAL]: 'music-note',
    [INSTRUMENT.OTHER]: 'music-note'
  }
  return iconMap[instrument] || 'music-note'
}

export const renderGenderIcon = (gender: UserGender): React.ReactElement => {
  const imageSource = getAvatarHeadSource(gender)
  return <GenderIconImage source={imageSource} />
}

export const renderInstrumentIcon = (instrument: UserInstrument, color: string): React.ReactElement => {
  const size = scale(32)
  if (instrument === INSTRUMENT.VOCAL) return <MicIcon size={size} color={color} />
  if (instrument === INSTRUMENT.PIANO) return <PianoIcon size={size} color={color} />
  if (instrument === INSTRUMENT.GUITAR) return <GuitarIcon size={size} color={color} />
  if (instrument === INSTRUMENT.VIOLIN) return <ViolinIcon size={size} color={color} />
  return <MusicNoteIcon size={size} color={color} />
}
