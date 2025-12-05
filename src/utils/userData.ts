import { LAST_LESSON_ACCESS_KEY, STREAK_LOCAL_KEY } from '@/constants/cache'
import { clearProgressCache } from '@/utils/progress'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const clearUserDataOnSwitch = async (): Promise<void> => {
  await clearProgressCache()
  await AsyncStorage.removeItem(LAST_LESSON_ACCESS_KEY)
  await AsyncStorage.removeItem(STREAK_LOCAL_KEY)
}

export const clearUserDataStorage = async (): Promise<void> => {
  try {
    await clearProgressCache()
    await AsyncStorage.removeItem(LAST_LESSON_ACCESS_KEY)
    await AsyncStorage.removeItem(STREAK_LOCAL_KEY)
  } catch (error) {
    console.error('Failed to clear user data storage:', error)
  }
}

