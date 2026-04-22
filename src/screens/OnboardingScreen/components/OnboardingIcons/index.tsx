import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { INSTRUMENT, type UserGender, type UserInstrument } from '@types'
import { scale } from 'react-native-size-matters'
import { GenderIconImage } from './OnboardingIcons.styles'
import { getAvatarHeadSource } from '@/utils/avatarAssets'

const ICON_SIZE = scale(32)

const PianoIcon = ({ color }: { color: string }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill={color}>
    <Path d="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V4C22 2.9 21.11 2 20 2M14.74 14H15V20H9V14H9.31C9.86 14 10.3 13.56 10.3 13V4H13.75V13C13.75 13.56 14.19 14 14.74 14M4 4H6.8V13C6.8 13.56 7.24 14 7.79 14H8V20H4V4M20 20H16V14H16.26C16.81 14 17.25 13.56 17.25 13V4H20V20Z" />
  </Svg>
)

const GuitarIcon = ({ color }: { color: string }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill={color}>
    <Path d="M19.59,3H22V5H20.41L16.17,9.24C15.8,8.68 15.32,8.2 14.76,7.83L19.59,3M12,8A4,4 0 0,1 16,12C16,13.82 14.77,15.42 13,15.87V16A5,5 0 0,1 8,21A5,5 0 0,1 3,16A5,5 0 0,1 8,11H8.13C8.58,9.24 10.17,8 12,8M12,10.5A1.5,1.5 0 0,0 10.5,12A1.5,1.5 0 0,0 12,13.5A1.5,1.5 0 0,0 13.5,12A1.5,1.5 0 0,0 12,10.5M6.94,14.24L6.23,14.94L9.06,17.77L9.77,17.06L6.94,14.24Z" />
  </Svg>
)

const ViolinIcon = ({ color }: { color: string }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill={color}>
    <Path d="M11,2A1,1 0 0,0 10,3V5L10,9A0.5,0.5 0 0,0 10.5,9.5H12A0.5,0.5 0 0,1 12.5,10A0.5,0.5 0 0,1 12,10.5H10.5C9.73,10.5 9,9.77 9,9V5.16C7.27,5.6 6,7.13 6,9V10.5A2.5,2.5 0 0,1 8.5,13A2.5,2.5 0 0,1 6,15.5V17C6,19.77 8.23,22 11,22H13C15.77,22 18,19.77 18,17V15.5A2.5,2.5 0 0,1 15.5,13A2.5,2.5 0 0,1 18,10.5V9C18,6.78 16.22,5 14,5V3A1,1 0 0,0 13,2H11M10.75,16.5H13.25L12.75,20H11.25L10.75,16.5Z" />
  </Svg>
)

const MusicNoteIcon = ({ color }: { color: string }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
  </Svg>
)

const MicIcon = ({ color }: { color: string }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm6.5 9H20a8 8 0 0 1-7 7.93V21h2v2H9v-2h2v-3.07A8 8 0 0 1 4 10h1.5a6.5 6.5 0 0 0 13 0z" />
  </Svg>
)

export const renderGenderIcon = (gender: UserGender): React.ReactElement => {
  const imageSource = getAvatarHeadSource(gender)
  return <GenderIconImage source={imageSource} />
}

export const renderInstrumentIcon = (instrument: UserInstrument, color: string): React.ReactElement => {
  if (instrument === INSTRUMENT.VOCAL) return <MicIcon color={color} />
  if (instrument === INSTRUMENT.PIANO) return <PianoIcon color={color} />
  if (instrument === INSTRUMENT.GUITAR) return <GuitarIcon color={color} />
  if (instrument === INSTRUMENT.VIOLIN) return <ViolinIcon color={color} />
  return <MusicNoteIcon color={color} />
}
