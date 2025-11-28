import { useEffect, useState } from 'react'
import { getPianoAudioManager } from '../utils/PianoAudioManager'

/**
 * React hook wrapper for PianoAudioManager singleton
 * Follows best practices by delegating to singleton class
 * 
 * Note: This requires a development build (not Expo Go) as react-native-audio-api
 * contains native code. Audio will gracefully degrade if the module is not available.
 */
export function usePianoAudio() {
  const [isReady, setIsReady] = useState(false)
  const manager = getPianoAudioManager()

  useEffect(() => {
    let isMounted = true

    const initialize = async () => {
      try {
        await manager.initialize()
        await manager.resume()
        if (isMounted) {
          const ready = manager.isReady()
          setIsReady(ready)
        }
      } catch (error) {
        console.warn('❌ Piano audio initialization failed:', error)
        console.warn('💡 Use development build (npx expo run:ios/android) for audio features')
      }
    }

    initialize()

    return () => {
      isMounted = false
    }
  }, [manager])

  return {
    playNote: (noteName: string) => {
      try {
        return manager.playNote(noteName)
      } catch (error) {
        // Gracefully handle if audio is not available
        console.error('Error playing note:', error)
        return null
      }
    },
    stopNote: (noteName: string) => {
      try {
        manager.stopNote(noteName)
      } catch (error) {
        // Gracefully handle if audio is not available
      }
    },
    isReady,
  }
}
