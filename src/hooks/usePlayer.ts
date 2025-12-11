// Read more: https://github.com/gleitz/midi-js-soundfonts?tab=readme-ov-file

import { Audio } from 'expo-av'
import { useEffect, useRef, useState } from 'react'

const SOUNDFONT_BASE_URL = 'https://gleitz.github.io/midi-js-soundfonts/FatBoy'
const DEFAULT_INSTRUMENT = 'acoustic_grand_piano'

let audioModeSet = false

export interface Melody {
  note: string
  duration?: number
}

export interface PlayOptions {
  instrument?: string
  tempo?: number
}

const normalizeNote = (note: string): string => {
  const sharpToFlat: Record<string, string> = {
    'C#': 'Db',
    'D#': 'Eb',
    'E#': 'F',
    'F#': 'Gb',
    'G#': 'Ab',
    'A#': 'Bb',
    'B#': 'C'
  }

  const normalizedNote = note.replace(/♯/g, '#').replace(/♭/g, 'b')
  const match = normalizedNote.match(/^([A-G])(#|♯)?(\d+)$/)
  if (!match) {
    return normalizedNote
  }

  const [, noteName, sharp, octave] = match
  if (sharp) {
    const sharpNote = `${noteName}#`
    const flatNote = sharpToFlat[sharpNote]
    if (flatNote) {
      if (flatNote === 'F' && noteName === 'E') {
        return `F${octave}`
      }
      if (flatNote === 'C' && noteName === 'B') {
        const nextOctave = parseInt(octave, 10) + 1
        return `C${nextOctave}`
      }
      return `${flatNote}${octave}`
    }
  }

  return normalizedNote
}

const getNoteUrl = (note: string, instrument: string = DEFAULT_INSTRUMENT): string => {
  const normalizedNote = normalizeNote(note)
  return `${SOUNDFONT_BASE_URL}/${instrument}-mp3/${normalizedNote}.mp3`
}

const setAudioMode = async () => {
  if (!audioModeSet) {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false
      })
      audioModeSet = true
    } catch (error) {
      console.warn('Failed to set audio mode:', error)
    }
  }
}

const createSound = async (
  note: string,
  instrument: string,
  volume: number = 1.0
): Promise<Audio.Sound | null> => {
  const url = getNoteUrl(note, instrument)
  try {
    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: false, volume }
    )
    return sound
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`[MIDI Player] Failed to load note ${note}:`, errorMessage)
    return null
  }
}

const normalizeNotes = (notes: string[] | Melody[]): Melody[] => {
  return notes.map((note) =>
    typeof note === 'string' ? { note, duration: 0.5 } : note
  )
}

const calculateBeatDuration = (tempo: number): number => {
  return (60 / tempo) * 1000
}

export const usePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const activeSoundsRef = useRef<Set<Audio.Sound>>(new Set())
  const cancelPromiseRef = useRef<Promise<void> | null>(null)
  const isPlayingRef = useRef(false)

  const setupUnloadOnFinish = (sound: Audio.Sound): void => {
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        activeSoundsRef.current.delete(sound)
        sound.unloadAsync().catch((error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : String(error)
          console.warn('[MIDI Player] Error unloading finished sound:', errorMessage)
        })
      }
    })
  }

  const cancelAllSounds = async (): Promise<void> => {
    isPlayingRef.current = false
    setIsPlaying(false)
    const soundsToCancel = Array.from(activeSoundsRef.current)
    activeSoundsRef.current.clear()
    
    await Promise.all(
      soundsToCancel.map(async (sound) => {
        try {
          const status = await sound.getStatusAsync()
          if (status.isLoaded && status.isPlaying) {
            await sound.stopAsync()
          }
          await sound.unloadAsync()
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : String(error)
          console.warn('[MIDI Player] Error during sound cleanup:', errorMessage)
        }
      })
    )
  }

  const playChord = async (
    notes: Melody[],
    instrument: string
  ): Promise<void> => {
    if (!isPlayingRef.current) return

    const sounds = await Promise.all(
      notes.map((item) => createSound(item.note, instrument, 1.0))
    )

    const validSounds = sounds.filter((sound) => sound !== null) as Audio.Sound[]

    if (validSounds.length === 0) {
      console.warn('[MIDI Player] No sounds loaded successfully')
      return
    }

    validSounds.forEach((sound) => {
      activeSoundsRef.current.add(sound)
      setupUnloadOnFinish(sound)
    })

    await Promise.all(
      validSounds.map(async (sound) => {
        if (!isPlayingRef.current) {
          activeSoundsRef.current.delete(sound)
          return
        }
        try {
          await sound.playAsync()
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : String(error)
          console.error('[MIDI Player] Failed to play note:', errorMessage)
          activeSoundsRef.current.delete(sound)
        }
      })
    )
  }

  const playMelody = async (
    notes: Melody[],
    instrument: string,
    beatDuration: number
  ): Promise<void> => {
    for (let i = 0; i < notes.length; i++) {
      if (!isPlayingRef.current) break

      const { note, duration = 0.5 } = notes[i]
      const sound = await createSound(note, instrument, 1.0)

      if (!sound) continue

      activeSoundsRef.current.add(sound)
      setupUnloadOnFinish(sound)

      try {
        if (!isPlayingRef.current) {
          activeSoundsRef.current.delete(sound)
          await sound.unloadAsync()
          break
        }

        await sound.playAsync()

        const noteDuration = duration * beatDuration
        if (i < notes.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, noteDuration))
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error(`[MIDI Player] Failed to play melody note ${note}:`, errorMessage)
        activeSoundsRef.current.delete(sound)
      }
    }
  }

  const play = async (
    notes: string[] | Melody[],
    options: PlayOptions = {
      instrument: DEFAULT_INSTRUMENT,
      tempo: 120
    }
  ): Promise<void> => {
    if (isPlayingRef.current && cancelPromiseRef.current) {
      await cancelPromiseRef.current
    }

    isPlayingRef.current = false
    setIsPlaying(false)
    cancelPromiseRef.current = cancelAllSounds()
    await cancelPromiseRef.current
    
    isPlayingRef.current = true
    setIsPlaying(true)
    
    try {
      await setAudioMode()
      
      const instrument = options.instrument || DEFAULT_INSTRUMENT
      const tempo = options.tempo || 120
      const beatDuration = calculateBeatDuration(tempo)
      const normalizedNotes = normalizeNotes(notes)
      const isChord = notes.every((item) => typeof item === 'string')

      if (!isPlayingRef.current) return

      if (isChord) {
        await playChord(normalizedNotes, instrument)
      } else {
        await playMelody(normalizedNotes, instrument, beatDuration)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error('[MIDI Player] Could not play:', errorMessage)
    } finally {
      isPlayingRef.current = false
      setIsPlaying(false)
      cancelPromiseRef.current = null
    }
  }

  const stop = async (): Promise<void> => {
    if (isPlayingRef.current && cancelPromiseRef.current) {
      await cancelPromiseRef.current
    }
    await cancelAllSounds()
  }

  useEffect(() => {
    return () => {
      cancelAllSounds().catch(() => {
        // Ignore errors during unmount cleanup
      })
    }
  }, [])

  return { play, stop, isPlaying }
}
