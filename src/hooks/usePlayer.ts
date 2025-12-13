// Read more: https://github.com/gleitz/midi-js-soundfonts?tab=readme-ov-file

import { addSafePlaybackListener, safeRemovePlayer, setupAutoCleanup } from '@/utils/audioPlayerUtils'
import { AudioPlayer, createAudioPlayer } from 'expo-audio'
import { useEffect, useRef, useState } from 'react'

const SOUNDFONT_BASE_URL = 'https://gleitz.github.io/midi-js-soundfonts/FatBoy'
const DEFAULT_INSTRUMENT = 'acoustic_grand_piano'

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

const createSound = async (
  note: string,
  instrument: string,
  volume: number = 1.0
): Promise<AudioPlayer | null> => {
  const url = getNoteUrl(note, instrument)
  try {
    const player = createAudioPlayer({ uri: url })
    player.volume = volume
    return player
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
  const activeSoundsRef = useRef<Set<AudioPlayer>>(new Set())
  const cancelPromiseRef = useRef<Promise<void> | null>(null)
  const isPlayingRef = useRef(false)

  const setupUnloadOnFinish = (player: AudioPlayer): void => {
    // Set up automatic cleanup when player finishes
    setupAutoCleanup(player)
    
    // Also track in our set for manual cleanup scenarios using safe listener
    addSafePlaybackListener(player, (status) => {
      if (status.isLoaded && status.didJustFinish) {
        activeSoundsRef.current.delete(player)
      }
    })
  }

  const cancelAllSounds = async (): Promise<void> => {
    isPlayingRef.current = false
    setIsPlaying(false)
    const soundsToCancel = Array.from(activeSoundsRef.current)
    activeSoundsRef.current.clear()
    
    // Use safe removal to prevent double-removal crashes
    soundsToCancel.forEach((player) => {
      safeRemovePlayer(player)
    })
  }

  const playChord = async (
    notes: Melody[],
    instrument: string
  ): Promise<void> => {
    if (!isPlayingRef.current) return

    // Preload all sounds first
    const sounds = await Promise.all(
      notes.map((item) => createSound(item.note, instrument, 1.0))
    )

    const validSounds = sounds.filter((sound) => sound !== null) as AudioPlayer[]

    if (validSounds.length === 0) {
      console.warn('[MIDI Player] No sounds loaded successfully')
      return
    }

    // Wait for all players to be ready by checking their status
    await Promise.all(
      validSounds.map(async (player) => {
        return new Promise<void>((resolve) => {
          let attempts = 0
          const maxAttempts = 100 // 1 second max wait
          const checkLoaded = () => {
            attempts++
            if (player.isLoaded || attempts >= maxAttempts) {
              resolve()
            } else {
              setTimeout(checkLoaded, 10)
            }
          }
          checkLoaded()
        })
      })
    )

    validSounds.forEach((player) => {
      activeSoundsRef.current.add(player)
      setupUnloadOnFinish(player)
    })

    // Play all notes simultaneously - use a small delay to ensure all players are ready
    await new Promise<void>((resolve) => {
      const executePlay = () => {
        // Play all notes at the exact same time
        validSounds.forEach((player) => {
        if (!isPlayingRef.current) {
            activeSoundsRef.current.delete(player)
          return
        }
        try {
            player.play()
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : String(error)
          console.error('[MIDI Player] Failed to play note:', errorMessage)
            activeSoundsRef.current.delete(player)
        }
      })
        resolve()
      }

      // Small delay to ensure all are ready, then execute
      setTimeout(executePlay, 5)
    })
  }

  const playMelody = async (
    notes: Melody[],
    instrument: string,
    beatDuration: number
  ): Promise<void> => {
    if (!isPlayingRef.current) return

    // Preload all sounds first for precise timing
    const players = await Promise.all(
      notes.map((item) => createSound(item.note, instrument, 1.0))
    )

    const validPlayers = players.filter((player) => player !== null) as AudioPlayer[]

    if (validPlayers.length === 0) {
      console.warn('[MIDI Player] No sounds loaded successfully')
      return
    }

    // Wait for all players to be ready
    await Promise.all(
      validPlayers.map(async (player) => {
        return new Promise<void>((resolve) => {
          let attempts = 0
          const maxAttempts = 100 // 1 second max wait
          const checkLoaded = () => {
            attempts++
            if (player.isLoaded || attempts >= maxAttempts) {
              resolve()
            } else {
              setTimeout(checkLoaded, 10)
            }
          }
          checkLoaded()
        })
      })
    )

    // Register all players
    validPlayers.forEach((player) => {
      activeSoundsRef.current.add(player)
      setupUnloadOnFinish(player)
    })

    // Calculate precise start times for each note
    const scheduledTimes: number[] = []
    let cumulativeTime = 0

    notes.forEach(({ duration = 0.5 }) => {
      scheduledTimes.push(cumulativeTime)
      cumulativeTime += duration * beatDuration
    })

    // Schedule all notes with precise timing using a single timer loop
    const startTime = Date.now()
    const scheduleInterval = 5 // Check every 5ms for precision

    await new Promise<void>((resolve) => {
      const scheduleNotes = () => {
        if (!isPlayingRef.current) {
          resolve()
          return
        }

        const elapsed = Date.now() - startTime

        validPlayers.forEach((player, index) => {
          const scheduledTime = scheduledTimes[index]
          const timeDiff = elapsed - scheduledTime

          // Play note if it's time (within 10ms tolerance for precision)
          if (timeDiff >= -10 && timeDiff <= scheduleInterval && !player.playing) {
            try {
              if (isPlayingRef.current) {
                player.play()
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error)
              console.error('[MIDI Player] Failed to play melody note:', errorMessage)
              activeSoundsRef.current.delete(player)
            }
          }
        })

        // Continue scheduling until all notes have been played
        const lastNoteTime = scheduledTimes[scheduledTimes.length - 1] + (notes[notes.length - 1].duration || 0.5) * beatDuration
        if (elapsed < lastNoteTime + 100) {
          setTimeout(scheduleNotes, scheduleInterval)
        } else {
          resolve()
    }
      }

      scheduleNotes()
    })
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
      // Clean up synchronously to ensure it completes before unmount/refresh
      // This is critical during refresh when Expo's SharedObjectRegistry cleanup can crash
      isPlayingRef.current = false
      setIsPlaying(false)
      const soundsToCancel = Array.from(activeSoundsRef.current)
      activeSoundsRef.current.clear()
      
      // Clean up all players synchronously
      soundsToCancel.forEach((player) => {
        safeRemovePlayer(player)
      })
    }
  }, [])

  return { play, stop, isPlaying }
}
