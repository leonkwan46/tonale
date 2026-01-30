import type ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import type { Persistence } from 'firebase/auth'

declare module 'firebase/auth' {
  /**
   * Returns a persistence implementation for React Native using AsyncStorage.
   * This function exists at runtime but is not included in TypeScript definitions.
   */
  export function getReactNativePersistence(
    storage: typeof ReactNativeAsyncStorage
  ): Persistence
}
