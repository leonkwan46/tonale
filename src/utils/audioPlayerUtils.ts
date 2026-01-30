import type { AudioPlayer } from 'expo-audio'

/**
 * Sets up automatic cleanup for an audio player when playback finishes.
 * The player will automatically be removed when playback completes.
 *
 * @param player - The AudioPlayer instance to set up cleanup for
 */
export const setupAutoCleanup = (player: AudioPlayer): void => {
  player.addListener('playbackStatusUpdate', (status) => {
    if (status.isLoaded && status.didJustFinish) {
      try {
        player.remove()
      } catch (error) {
        console.warn('Error removing finished player:', error)
      }
    }
  })
}
