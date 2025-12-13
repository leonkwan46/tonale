import { AudioPlayer } from 'expo-audio'

const removedPlayers = new WeakSet<AudioPlayer>()
const removingPlayers = new WeakSet<AudioPlayer>()
const playerListeners = new WeakMap<AudioPlayer, (() => void)[]>()

/**
 * Safely removes an audio player. Idempotent.
 * Note: We don't call player.remove() to avoid crashes with Expo's
 * SharedObjectRegistry during refresh. We pause and remove listeners,
 * letting Expo handle the actual removal.
 */
export const safeRemovePlayer = (player: AudioPlayer | null | undefined): void => {
  if (!player) return
  if (removedPlayers.has(player)) return
  if (removingPlayers.has(player)) return

  removingPlayers.add(player)

  try {
    const listeners = playerListeners.get(player)
    if (listeners) {
      listeners.forEach(removeListener => {
        try {
          removeListener()
        } catch (error) {
          console.warn('[Audio] Error removing listener:', error instanceof Error ? error.message : String(error))
        }
      })
      playerListeners.delete(player)
    }

    try {
      player.pause()
    } catch (error) {
      console.warn('[Audio] Error pausing player:', error instanceof Error ? error.message : String(error))
    }

    removedPlayers.add(player)
  } catch (error: unknown) {
    removedPlayers.add(player)
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.warn('[Audio] Error removing player:', errorMessage)
  }
}

export const addSafePlaybackListener = (
  player: AudioPlayer,
  callback: (status: { isLoaded?: boolean; didJustFinish?: boolean }) => void
): (() => void) => {
  try {
    const subscription = player.addListener('playbackStatusUpdate', callback)
    const existingListeners = playerListeners.get(player) || []
    const removeFn = () => {
      try {
        if (subscription && typeof subscription.remove === 'function') {
          subscription.remove()
        }
      } catch (error) {
        console.warn('[Audio] Error removing subscription:', error instanceof Error ? error.message : String(error))
      }
    }
    existingListeners.push(removeFn)
    playerListeners.set(player, existingListeners)
    return removeFn
  } catch {
    return () => {}
  }
}

export const setupAutoCleanup = (player: AudioPlayer): (() => void) => {
  let cleanupCalled = false
  let listenerCleanup: (() => void) | null = null
  const cleanupFlagRef = { called: false }

  try {
    listenerCleanup = addSafePlaybackListener(player, (status) => {
      if (status.isLoaded && status.didJustFinish && !cleanupCalled && !cleanupFlagRef.called) {
        cleanupFlagRef.called = true
        cleanupCalled = true
        safeRemovePlayer(player)
      }
    })
  } catch {
    cleanupCalled = true
  }

  return () => {
    if (!cleanupCalled && !cleanupFlagRef.called) {
      cleanupCalled = true
      cleanupFlagRef.called = true
      try {
        if (listenerCleanup) {
          listenerCleanup()
        }
      } catch (error) {
        console.warn('[Audio] Error during cleanup:', error instanceof Error ? error.message : String(error))
      }
    }
  }
}
