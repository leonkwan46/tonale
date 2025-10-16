import { createAudioPlayer } from 'expo-audio'

export const playSuccessSound = async () => {
  try {
    const player = createAudioPlayer(require('../../assets/sounds/correct_answer.mp3'))
    player.volume = 0.4
    await player.play()
    
    // Clean up the player after it finishes playing
    player.addListener('playbackStatusUpdate', (status: { isLoaded?: boolean; didJustFinish?: boolean }) => {
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
    const player = createAudioPlayer(require('../../assets/sounds/incorrect_answer.mp3'))
    player.volume = 1
    await player.play()
    
    // Clean up the player after it finishes playing
    player.addListener('playbackStatusUpdate', (status: { isLoaded?: boolean; didJustFinish?: boolean }) => {
      if (status.isLoaded && status.didJustFinish) {
        player.remove()
      }
    })
  } catch (error) {
    console.warn('Could not play success sound:', error)
  }
}

export const playLessonFinishedSound = async () => {
  try {
    const player = createAudioPlayer(require('../../assets/sounds/lesson_finish.mp3'))
    player.volume = 0.3
    await player.play()
    
    // Clean up the player after it finishes playing
    player.addListener('playbackStatusUpdate', (status: { isLoaded?: boolean; didJustFinish?: boolean }) => {
      if (status.isLoaded && status.didJustFinish) {
        player.remove()
      }
    })
  } catch (error) {
    console.warn('Could not play lesson complete sound:', error)
  }
}

export const playLessonFailedSound = async () => {
  try {
    const player = createAudioPlayer(require('../../assets/sounds/lesson_fail.mp3'))
    player.volume = 1
    await player.play()
    
    // Clean up the player after it finishes playing
    player.addListener('playbackStatusUpdate', (status: { isLoaded?: boolean; didJustFinish?: boolean }) => {
      if (status.isLoaded && status.didJustFinish) {
        player.remove()
      }
    })
  } catch (error) {
    console.warn('Could not play lesson failed sound:', error)
  }
}
