import { createAudioPlayer } from 'expo-audio'

export const playSuccessSound = async () => {
  try {
    const player = createAudioPlayer(require('../../assets/sounds/success.mp3'))
    player.volume = 0.5
    await player.play()
    
    // Clean up the player after it finishes playing
    player.addListener('playbackStatusUpdate', (status: any) => {
      if (status.isLoaded && status.didJustFinish) {
        player.remove()
      }
    })
  } catch (error) {
    console.warn('Could not play success sound:', error)
  }
}

export const playErrorSound = async () => {
  try {
    // For now, use haptic feedback for error since we only have success sound
    const { notificationAsync, NotificationFeedbackType } = await import('expo-haptics')
    await notificationAsync(NotificationFeedbackType.Error)
  } catch (error) {
    console.warn('Could not play error feedback:', error)
  }
}
